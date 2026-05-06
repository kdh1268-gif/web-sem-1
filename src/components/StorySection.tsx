'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function StorySection() {
  const containerRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(maskRef.current, {
        width: "100%",
        height: "100%",
        borderRadius: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "center center",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[150vh] w-full bg-background flex flex-col items-center justify-start">
      
      <div className="w-full h-screen sticky top-0 flex items-center justify-center overflow-hidden p-6 md:p-12">
        <div 
          ref={maskRef}
          className="w-[30vw] min-w-[280px] h-[60vh] rounded-t-full rounded-b-full overflow-hidden flex items-center justify-center bg-[#f7f7f7] relative border border-gold-light/40 shadow-2xl"
        >
          {/* Elegant Boutique Interior Image */}
          <div className="absolute inset-0">
            <Image 
              src="/images/boutique.jpg"
              alt="Onyx Boutique"
              fill
              className="object-cover opacity-60"
            />
            {/* Elegant overlay to make text pop */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/90 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-white/40"></div>
          </div>
          
          <div className="relative z-10 text-center flex flex-col items-center justify-center h-full">
            <h3 className="font-serif text-4xl md:text-7xl lg:text-8xl tracking-[0.1em] text-foreground font-light mb-12 opacity-95 leading-tight drop-shadow-sm">
              Discover <br/><span className="text-gold-dark">The Collection</span>
            </h3>
            
            <button className="px-12 py-4 border border-gold-dark text-gold-dark hover:bg-gold-dark hover:text-white transition-colors duration-500 font-sans tracking-[0.2em] text-xs uppercase cursor-pointer">
              Shop Now
            </button>
          </div>
        </div>
      </div>
      
    </section>
  );
}
