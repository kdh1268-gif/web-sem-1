'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const particles = containerRef.current.children;
    
    const ctx = gsap.context(() => {
      gsap.utils.toArray(particles).forEach((particle: any) => {
        // Random starting positions
        gsap.set(particle, {
          x: () => Math.random() * window.innerWidth,
          y: () => Math.random() * window.innerHeight,
          opacity: () => Math.random() * 0.3 + 0.1,
          scale: () => Math.random() * 1.5 + 0.5
        });

        // Floating animation
        gsap.to(particle, {
          y: () => `-=${window.innerHeight}`,
          x: () => `+=${Math.random() * 100 - 50}`,
          rotation: () => Math.random() * 360,
          duration: () => Math.random() * 20 + 15,
          repeat: -1,
          ease: "none",
          delay: () => -(Math.random() * 30) // Start at different times
        });
        
        // Twinkling animation
        gsap.to(particle, {
          opacity: () => Math.random() * 0.6 + 0.1,
          duration: () => Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: () => -(Math.random() * 5)
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-[1] pointer-events-none overflow-hidden mix-blend-multiply">
      {[...Array(30)].map((_, i) => (
        <div 
          key={i} 
          className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-gold blur-[1px]"
        ></div>
      ))}
    </div>
  );
}
