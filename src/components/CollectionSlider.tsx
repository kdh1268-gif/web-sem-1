'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { useStore } from '@/store/useStore';
import { translations } from '@/locales/translations';

const defaultImages = [
  "/images/perfume-1_rmbg.png",
  "/images/perfume-2_rmbg.png",
  "/images/perfume-3_rmbg.png"
];

export default function CollectionSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const language = useStore((state) => state.language);
  const t = translations[language].collection;

  // We can use native CSS scroll snapping for an elegant, smooth draggable carousel
  
  return (
    <section ref={containerRef} className="w-full py-32 bg-transparent text-foreground relative overflow-hidden">
      <div className="absolute top-12 left-6 md:left-12 z-10">
        <h3 className="font-sans text-xs tracking-[0.4em] uppercase text-gold-dark opacity-80">{t.sectionTitle}</h3>
      </div>
      
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl md:text-5xl tracking-wide font-light">{t.title}</h2>
        <div className="w-[1px] h-12 bg-gold-dark/30 mx-auto mt-6"></div>
      </div>
      
      {/* Scrollable Container (Desktop) / Vertical Stack (Mobile) */}
      <div 
        ref={sliderRef}
        className="w-full flex flex-col md:flex-row md:overflow-x-auto gap-16 md:gap-16 px-6 md:px-[30vw] pb-12 md:snap-x md:snap-mandatory scrollbar-hide md:cursor-grab md:active:cursor-grabbing items-center md:items-stretch"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {t.items.map((item, index) => (
          <div key={index} className="md:snap-center shrink-0 w-full md:w-[30vw] max-w-[400px] flex flex-col items-center group">
            <div className="relative w-full aspect-[4/5] md:aspect-[3/4] bg-[#fdfdfd] overflow-hidden mb-6 md:mb-8 flex items-center justify-center transition-transform duration-700 group-hover:-translate-y-4 shadow-sm group-hover:shadow-xl group-hover:shadow-gold-dark/10">
              {/* Product Image Placeholder - Replace with actual bottle images */}
              <div className="w-[75%] h-[80%] relative z-10 transition-transform duration-700 group-hover:scale-105">
                 <Image 
                   src={defaultImages[index]} 
                   alt={item.name}
                   fill
                   className="object-contain mix-blend-multiply"
                 />
              </div>
              {/* Background elegant circle that appears on hover */}
              <div className="absolute inset-0 m-auto w-32 h-32 md:w-48 md:h-48 rounded-full bg-gold-light/20 blur-3xl opacity-0 transition-all duration-700 group-hover:opacity-100 z-0"></div>
            </div>
            
            <h4 className="font-serif text-2xl md:text-3xl tracking-wider mb-2 text-foreground">{item.name}</h4>
            <p className="font-sans text-xs uppercase tracking-widest text-foreground/50 mb-6">{item.notes}</p>
            
            <button className="px-6 py-2 border border-transparent border-b-gold-dark/30 text-gold-dark hover:border-gold-dark transition-all duration-300 font-sans tracking-[0.2em] text-xs uppercase opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
              {t.btn}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
