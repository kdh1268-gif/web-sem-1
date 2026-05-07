'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '@/store/useStore';
import { translations } from '@/locales/translations';

export default function BrandPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const language = useStore((state) => state.language);
  const t = translations[language].philosophy;

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray('.reveal-line');
      
      gsap.fromTo(lines, 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8, // 스피드업: 1.5 -> 0.8
          stagger: 0.1,  // 딜레이 감소: 0.2 -> 0.1
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%", // 더 일찍 시작되도록 60% -> 75%
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-transparent text-foreground relative overflow-hidden"
    >
      <div className="absolute top-12 left-6 md:left-12 z-20">
        <h3 className="font-sans text-xs tracking-[0.4em] uppercase text-gold-dark opacity-80">{t.sectionTitle}</h3>
      </div>
      
      {/* 텍스트 영역 (좌측) */}
      <div ref={textRef} className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen flex flex-col items-center justify-center p-12 md:p-24 z-10 text-center order-2 md:order-1">
        <div className="overflow-hidden mb-6">
          <h2 className="reveal-line font-serif text-3xl md:text-5xl lg:text-6xl tracking-wide font-light leading-tight">
            {t.title}
          </h2>
        </div>
        <div className="overflow-hidden mb-8">
          <p className="reveal-line font-serif text-xl md:text-3xl italic text-gold-dark/80">
            {t.subtitle}
          </p>
        </div>
        
        <div className="w-[1px] h-16 md:h-24 bg-gold-dark opacity-30 mx-auto mb-10 reveal-line"></div>
        
        <div className="overflow-hidden">
          <p 
            className="reveal-line font-sans text-sm md:text-base tracking-widest leading-relaxed opacity-70 max-w-xl mx-auto uppercase"
            dangerouslySetInnerHTML={{ __html: t.desc }}
          ></p>
        </div>
      </div>

      {/* 비디오 영역 (우측) */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative order-1 md:order-2">
        <video 
          src="/videos/sec-vi.mp4" 
          className="w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
        ></video>
        {/* 비디오 위 희미한 그라데이션 (선택사항, 텍스트 가독성이나 분위기 연출용) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fdfdfd] to-transparent opacity-0 md:opacity-20 pointer-events-none"></div>
      </div>
    </section>
  );
}
