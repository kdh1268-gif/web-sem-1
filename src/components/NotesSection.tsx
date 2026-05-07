'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Image from 'next/image';

const notes = [
  { title: "Top Note", name: "Bergamot & Pink Pepper", desc: "첫 만남의 강렬함과 핑크 페퍼의 스파이시한 터치가 감각을 깨웁니다.", img: "/images/note-top.jpg" },
  { title: "Heart Note", name: "Damascus Rose & Jasmine", desc: "우아함의 절정. 불가리안 로즈와 자스민의 조화가 깊은 여운을 남깁니다.", img: "/images/note-heart.jpg" },
  { title: "Base Note", name: "Oud & Vanilla Bourbon", desc: "시간이 지나도 변치 않는 묵직한 베이스가 피부에 스며듭니다.", img: "/images/note-base.jpg" }
];

export default function NotesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.note-panel');
      let currentIndex = 0;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        start: "top top",
        end: "+=3000",
        onUpdate: (self) => {
          const targetIndex = Math.round(self.progress * (sections.length - 1));
          
          if (targetIndex !== currentIndex) {
            currentIndex = targetIndex;
            
            gsap.to(sections, {
              xPercent: -100 * currentIndex,
              duration: 1.5, // 무게감 있는 전환 속도
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
      <div className="absolute top-12 left-6 md:left-12 z-10">
        <h3 className="font-sans text-xs tracking-[0.4em] uppercase text-gold-dark opacity-80">The Notes</h3>
      </div>
      
      <div ref={wrapperRef} className="flex h-full w-[300%]">
        {notes.map((note, index) => (
          <div key={index} className="note-panel flex-shrink-0 w-1/3 h-full flex flex-col md:flex-row justify-center items-center px-6 md:px-24 gap-12 md:gap-24 relative overflow-hidden">
            
            {/* Image Container with elegant frame */}
            <div className="relative w-[80vw] md:w-[40vw] max-w-[500px] aspect-[4/5] overflow-hidden group">
              <div className="absolute inset-0 border border-gold-light/30 z-20 m-4 pointer-events-none transition-all duration-700 group-hover:m-6"></div>
              <Image 
                src={note.img} 
                alt={note.name}
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 z-10"></div>
            </div>

            {/* Text Content */}
            <div className="max-w-xl text-center md:text-left flex flex-col items-center md:items-start z-20">
              <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-gold-dark mb-6 block relative">
                <span className="absolute -left-12 top-1/2 w-8 h-[1px] bg-gold-dark hidden md:block"></span>
                {note.title}
              </span>
              <h4 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 tracking-wide font-light text-foreground leading-tight">
                {note.name}
              </h4>
              <p className="font-sans text-sm md:text-base leading-relaxed text-foreground/70 mb-12">
                {note.desc}
              </p>
              <div className="w-[1px] h-16 md:h-24 bg-gold-dark opacity-40"></div>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}
