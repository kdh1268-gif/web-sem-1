'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { useStore } from '@/store/useStore';
import { translations } from '@/locales/translations';

export default function SensoryBoutique() {
  const containerRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const language = useStore((state) => state.language);
  const t = translations[language].boutique;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(maskRef.current, {
        width: "100%",
        height: "100%",
        borderRadius: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "center center",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[150vh] w-full bg-transparent flex flex-col items-center justify-start">
      
      <div className="w-full h-screen sticky top-0 flex items-center justify-center overflow-hidden p-6 md:p-12">
        <div 
          ref={maskRef}
          className="w-[30vw] min-w-[280px] h-[60vh] rounded-full overflow-hidden flex items-center justify-center relative border border-gold-light/40 shadow-2xl"
        >
          {/* Bright, Elegant Boutique Interior Image */}
          <div className="absolute inset-0">
            <Image 
              src="/images/boutique.jpg"
              alt="Lunel Sensory Boutique"
              fill
              className="object-cover"
            />
            {/* Elegant overlay to make text pop while keeping it bright */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
          </div>
          
          <div className="relative z-10 text-center flex flex-col items-center justify-center h-full text-foreground bg-white/60 p-12 backdrop-blur-md rounded-lg">
            <span className="font-sans text-xs tracking-[0.4em] uppercase text-gold-dark mb-4">{t.sectionTitle}</span>
            <h3 className="font-serif text-4xl md:text-6xl tracking-wide font-light mb-8 leading-tight">
              {t.title}
            </h3>
            
            <button className="px-10 py-3 border border-foreground/50 text-foreground hover:bg-foreground hover:text-white transition-colors duration-500 font-sans tracking-[0.2em] text-xs uppercase cursor-pointer">
              {t.btn}
            </button>
          </div>
        </div>
      </div>
      
    </section>
  );
}
