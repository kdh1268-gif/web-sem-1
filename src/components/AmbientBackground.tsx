'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const particles = containerRef.current.querySelectorAll('.particle');
    
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
          delay: () => -(Math.random() * 30)
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
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Subtle Ambient Glows */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vh] rounded-full bg-gold-light blur-[150px] mix-blend-multiply opacity-20"></div>
        <div className="absolute top-[30%] -right-[10%] w-[50vw] h-[70vh] rounded-full bg-stone-200 blur-[160px] mix-blend-multiply opacity-50"></div>
        <div className="absolute -bottom-[20%] left-[10%] w-[70vw] h-[60vh] rounded-full bg-gold-dark blur-[180px] mix-blend-multiply opacity-10"></div>
      </div>
      
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Global Particles */}
      <div ref={containerRef} className="absolute inset-0 mix-blend-multiply">
        {[...Array(40)].map((_, i) => (
          <div 
            key={i} 
            className="particle absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-gold blur-[1px]"
          ></div>
        ))}
      </div>
    </div>
  );
}
