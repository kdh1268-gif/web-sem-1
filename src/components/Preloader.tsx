'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { useStore } from '@/store/useStore';

const FRAME_COUNT = 193;

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const setLoaded = useStore((state) => state.setLoaded);
  const isLoaded = useStore((state) => state.isLoaded);
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';
    const stopLenis = () => {
      if ((window as any).lenis) {
        (window as any).lenis.stop();
      } else {
        setTimeout(stopLenis, 50);
      }
    };
    stopLenis();

    let loadedCount = 0;
    
    const PRELOAD_COUNT = 15; // 초기 로딩 속도 향상을 위해 처음 15장만 선탑재
    
    const incrementLoad = () => {
      loadedCount++;
      setProgress((loadedCount / PRELOAD_COUNT) * 100);
    };

    for (let i = 1; i <= PRELOAD_COUNT; i++) {
      const img = new window.Image();
      img.src = `/frames/perfume_${i.toString().padStart(3, '0')}.png`;
      img.onload = incrementLoad;
      img.onerror = incrementLoad; // Move forward even on error
    }
  }, []);

  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, {
        scaleX: progress / 100,
        duration: 0.2,
        ease: 'power2.out',
      });
    }

    if (progress >= 100 && !isLoaded) {
      setTimeout(() => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1.5,
          ease: 'power3.inOut',
          onComplete: () => {
            setLoaded(true);
            if (containerRef.current) {
              containerRef.current.style.display = 'none';
            }
            // Restore scrolling
            document.body.style.overflow = '';
            if ((window as any).lenis) {
              (window as any).lenis.start();
            }
          },
        });
      }, 800);
    }
  }, [progress, isLoaded, setLoaded]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground"
    >
      <div className="relative w-40 md:w-56 h-12 md:h-16 mb-8">
        <Image 
          src="/images/logo.png" 
          alt="Lunel Logo" 
          fill 
          className="object-contain"
        />
      </div>
      <div className="w-64 h-[1px] bg-foreground/10 overflow-hidden relative">
        <div
          ref={barRef}
          className="absolute inset-y-0 left-0 bg-gold w-full origin-left scale-x-0"
        />
      </div>
      <p className="mt-4 text-xs tracking-widest font-sans font-light text-foreground/50">
        {Math.round(progress)}%
      </p>
    </div>
  );
}
