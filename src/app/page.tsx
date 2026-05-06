'use client';
import { useEffect, useRef } from 'react';
import Preloader from '@/components/Preloader';
import ImageSequence from '@/components/ImageSequence';
import BrandPhilosophy from '@/components/BrandPhilosophy';
import ScentArchitecture from '@/components/ScentArchitecture';
import CollectionSlider from '@/components/CollectionSlider';
import BespokeExperience from '@/components/BespokeExperience';
import SensoryBoutique from '@/components/SensoryBoutique';
import Footer from '@/components/Footer';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useStore } from '@/store/useStore';
import { translations } from '@/locales/translations';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text1InnerRef = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const language = useStore((state) => state.language);
  const t = translations[language].hero;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background stays white as requested

      // Animate inner text in on load, independently of scroll (delayed to wait for Preloader)
      gsap.fromTo(text1InnerRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, delay: 2.5, ease: "power3.out" }
      );

      // Scroll Indicator Line Animation
      if (scrollLineRef.current) {
        gsap.fromTo(scrollLineRef.current,
          { scaleY: 0, transformOrigin: "top" },
          { scaleY: 1, duration: 1.5, repeat: -1, ease: "power2.inOut", yoyo: true }
        );
      }

      // Timeline for text reveals and pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=4000',
          pin: true,
          pinSpacing: false,
          scrub: 1.5,
        },
      });

      // Sequence
      tl.to({}, { duration: 0.5 }) // Hold text1 visible for a short scroll distance
        .to(text1Ref.current, { opacity: 0, y: -50, duration: 1 })
        .to(scrollIndicatorRef.current, { opacity: 0, duration: 0.5 }, "<") // Fade out scroll indicator
        
        .to(text2Ref.current, { opacity: 1, y: 0, duration: 1 })
        .to(text2Ref.current, { opacity: 0, y: -50, duration: 1 }, "+=1")
        
        .to(text3Ref.current, { opacity: 1, y: 0, duration: 1 })
        .to(text3Ref.current, { opacity: 0, y: -50, duration: 1 }, "+=1");
        
      // Ensure GSAP recalculates all trigger positions since child components 
      // (like NotesSection) might have calculated their start positions before 
      // this parent container added its 4000px pin-spacer.
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="w-full bg-transparent">
      <main id="main-scroll-container" className="relative w-full h-[calc(4000px+100vh)]">
        <Preloader />

        {/* Pinned text layer */}
        <div 
          ref={containerRef} 
          className="w-full h-screen pointer-events-none flex flex-col items-center justify-center z-20 relative top-0"
        >
          <ImageSequence />

        <div ref={text1Ref} className="absolute text-center md:text-left w-full md:w-[40%] md:left-[10%] lg:left-[15%] px-6 md:px-0 text-foreground">
          <div ref={text1InnerRef} className="opacity-0">
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-8 tracking-wide font-light">
              {t.title1}
            </h2>
            <p className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase opacity-70">
              {t.subtitle1}
            </p>
          </div>
        </div>

        <div ref={text2Ref} className="absolute opacity-0 translate-y-12 text-center md:text-left w-full md:w-[40%] md:left-[10%] lg:left-[15%] px-6 md:px-0 text-foreground">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-8 tracking-wide font-light text-gold-dark">
            {t.title2}
          </h2>
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase opacity-70">
            {t.subtitle2}
          </p>
        </div>

        <div ref={text3Ref} className="absolute opacity-0 translate-y-12 text-center md:text-left w-full md:w-[40%] md:left-[10%] lg:left-[15%] px-6 md:px-0 text-foreground flex flex-col items-center md:items-start">
          <div className="relative w-48 md:w-72 lg:w-80 h-16 md:h-24 lg:h-32 mb-10">
            <Image 
              src="/images/logo.png" 
              alt="Lunel Logo" 
              fill 
              className="object-contain object-center md:object-left"
            />
          </div>
          <div className="pointer-events-auto">
            <button className="px-8 py-3 border border-gold-dark text-gold-dark hover:bg-gold-dark hover:text-white transition-colors duration-500 font-sans tracking-[0.2em] text-xs uppercase cursor-pointer">
              {t.btn}
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} className="absolute bottom-10 left-[10%] lg:left-[15%] px-6 md:px-0 z-30 flex flex-col items-center opacity-40">
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase mb-3 text-gold-dark">Scroll</span>
          <div className="w-[1px] h-16 bg-foreground/10 overflow-hidden relative">
            <div ref={scrollLineRef} className="absolute top-0 left-0 w-full h-full bg-gold-dark"></div>
          </div>
        </div>
        </div>
      </main>

      <BrandPhilosophy />
      <ScentArchitecture />
      <CollectionSlider />
      <BespokeExperience />
      <SensoryBoutique />
      <Footer />
    </div>
  );
}
