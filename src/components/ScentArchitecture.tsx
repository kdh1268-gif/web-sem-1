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
      const images = gsap.utils.toArray('.parallax-img');
      let currentIndex = 0;

      // 초기 이미지 패럴랙스 위치 설정
      gsap.set(images, {
        xPercent: (i) => i * 15
      });

      // 스크롤트리거는 단순히 스크롤 구간을 잡고, 어느 슬라이드를 보여줄지(Index)만 결정합니다.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        start: "top top",
        end: "+=3000", // 충분히 여유 있는 스크롤 구간
        onUpdate: (self) => {
          // 스크롤 진행도에 따라 보여줄 타겟 인덱스 계산 (0, 1, 2 중 하나로 딱 떨어짐)
          const targetIndex = Math.round(self.progress * (sections.length - 1));
          
          if (targetIndex !== currentIndex) {
            currentIndex = targetIndex;
            
            // 패널 슬라이드 애니메이션
            gsap.to(sections, {
              xPercent: -100 * currentIndex,
              duration: 1.5,
              ease: "power3.inOut",
              overwrite: "auto"
            });

            // 이미지 패럴랙스 애니메이션 (containerAnimation 의존성 제거로 크래시 방지)
            gsap.to(images, {
              xPercent: (i) => (i - currentIndex) * 15,
              duration: 1.5,
              ease: "power3.inOut",
              overwrite: "auto"
            });
          }
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
      
      <div ref={wrapperRef} className="flex h-full w-[300%]">
        {t.notes.map((note, index) => (
          <div key={index} className="architecture-panel flex-shrink-0 w-1/3 h-full flex flex-col md:flex-row items-center relative overflow-hidden">
            
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
