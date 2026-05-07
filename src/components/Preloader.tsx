'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { useStore } from '@/store/useStore';

export default function Preloader() {
  const sequenceProgress = useStore((state) => state.sequenceProgress);
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
  }, []);

  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, {
        scaleX: sequenceProgress / 100,
        duration: 0.2,
        ease: 'power2.out',
      });
    }

    if (sequenceProgress >= 100 && !isLoaded) {
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
  }, [sequenceProgress, isLoaded, setLoaded]);

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
        {Math.round(sequenceProgress)}%
      </p>
    </div>
  );
}
