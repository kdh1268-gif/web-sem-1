'use client';
import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { translations } from '@/locales/translations';

export default function BespokeExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const language = useStore((state) => state.language);
  const t = translations[language].bespoke;
  
  return (
    <section ref={containerRef} className="w-full min-h-[80vh] flex items-center justify-center bg-transparent text-foreground relative overflow-hidden py-32 px-6">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gold-light/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-black/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      
      <div className="max-w-3xl text-center relative z-10 flex flex-col items-center">
        <span className="font-sans text-xs tracking-[0.4em] uppercase text-gold-dark mb-6">{t.sectionTitle}</span>
        <h2 
          className="font-serif text-4xl md:text-6xl tracking-wide font-light mb-8 leading-tight"
          dangerouslySetInnerHTML={{ __html: t.title }}
        ></h2>
        
        <p className="font-sans text-sm md:text-base tracking-widest leading-relaxed opacity-70 mb-16 max-w-xl mx-auto">
          {t.desc}
        </p>
        
        {/* Magnetic Button Simulation */}
        <div className="relative group cursor-pointer inline-block">
          <div className="absolute inset-0 bg-gold-dark rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          <button className="relative px-12 py-4 border border-gold-dark bg-background text-gold-dark hover:bg-gold-dark hover:text-white transition-colors duration-500 font-sans tracking-[0.2em] text-xs uppercase z-10">
            {t.btn}
          </button>
        </div>
      </div>
      
    </section>
  );
}
