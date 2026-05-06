'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { useStore } from '@/store/useStore';
import { translations } from '@/locales/translations';

const defaultImages = [
  "/images/note-top.jpg",
  "/images/note-heart.jpg",
  "/images/note-base.jpg"
];

export default function ScentArchitecture() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const language = useStore((state) => state.language);
  const t = translations[language].architecture;

  useEffect(() => {
    if (!sectionRef.current || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.architecture-panel');
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          id: "architecture-scroll",
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + wrapperRef.current!.offsetWidth,
        }
      });
      
      // Parallax effect for images inside panels
      sections.forEach((panel: any) => {
        const img = panel.querySelector('.parallax-img');
        if (img) {
          gsap.to(img, {
            xPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getById("architecture-scroll") || undefined, // Wait, horizontal container animation needs id
              start: "left right",
              end: "right left",
              scrub: true,
            }
          });
        }
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-background text-foreground">
      <div className="absolute top-12 left-6 md:left-12 z-20">
        <h3 className="font-sans text-xs tracking-[0.4em] uppercase text-gold-dark opacity-80">{t.sectionTitle}</h3>
      </div>
      
      <div ref={wrapperRef} className="flex h-full w-[300vw]">
        {t.notes.map((note, index) => (
          <div key={index} className="architecture-panel flex-shrink-0 w-screen h-full flex flex-col md:flex-row items-center relative">
            
            {/* Elegant large image with parallax container */}
            <div className="absolute right-0 w-full md:w-3/5 h-full overflow-hidden z-0">
              <div className="w-[120%] h-full relative -left-[10%]">
                <Image 
                  src={defaultImages[index]} 
                  alt={note.name}
                  fill
                  className="parallax-img object-cover opacity-90 mix-blend-multiply" 
                  // Using multiply to blend beautifully with white background
                />
                {/* Gradient overlay to smoothly blend image with text area */}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
              </div>
            </div>

            {/* Text Content */}
            <div className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:pl-24 md:pr-12">
              <span className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-gold-dark mb-8 block relative">
                <span className="absolute -left-16 top-1/2 w-12 h-[1px] bg-gold-dark hidden md:block"></span>
                {note.title}
              </span>
              <h4 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 tracking-wide font-light leading-[1.1] text-foreground">
                {note.name.split('&').map((part, i) => (
                  <span key={i} className="block">
                    {part.trim()} {i === 0 && <span className="text-gold-dark text-4xl">&</span>}
                  </span>
                ))}
              </h4>
              <p className="font-sans text-base md:text-lg tracking-wider leading-relaxed text-foreground/80 max-w-md">
                {note.desc}
              </p>
              
              <div className="mt-16 w-16 h-[1px] bg-gold-dark/50"></div>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}
