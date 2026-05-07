'use client';
import { useEffect, useState } from 'react';

const navItems = [
  { id: 'main-scroll-container', label: 'HERO' },
  { id: 'philosophy', label: 'PHILOSOPHY' },
  { id: 'architecture', label: 'ARCHITECTURE' },
  { id: 'collection', label: 'COLLECTION' },
  { id: 'bespoke', label: 'BESPOKE' },
  { id: 'boutique', label: 'BOUTIQUE' },
];

export default function SideNavigation() {
  const [activeSection, setActiveSection] = useState('main-scroll-container');

  useEffect(() => {
    const handleScroll = () => {
      let current = 'main-scroll-container';
      const windowHeight = window.innerHeight;

      navItems.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section spans the middle of the viewport
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            current = item.id;
          } else if (rect.top <= windowHeight / 2 && item.id !== 'main-scroll-container') {
             // as we scroll down, if the top passed middle but bottom didn't, it might be a small section or we are at bottom
             // Actually, the above logic is good for full-height sections.
             // But let's also check if the top is above middle
             if (rect.top > -rect.height && rect.top < windowHeight / 2) {
                current = item.id;
             }
          }
        }
      });

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Calculate top position. For 'main-scroll-container', it's pinned so we scroll to 0 to be safe
      const top = id === 'main-scroll-container' ? 0 : element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed top-1/2 left-4 md:left-12 -translate-y-1/2 z-[100] flex flex-col items-center pointer-events-none">
      {/* Background Line */}
      <div className="absolute top-0 bottom-0 w-[1px] bg-gold-dark/20 rounded-full left-[3.5px]" />
      
      <div className="flex flex-col gap-6 md:gap-8 relative pointer-events-auto py-4">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <div 
              key={item.id}
              className="relative group flex items-center cursor-pointer h-4"
              onClick={() => scrollToSection(item.id)}
            >
              {/* Dot */}
              <div 
                className={`w-2 h-2 rounded-full border border-gold-dark transition-all duration-300 relative z-10 ${
                  isActive ? 'bg-gold-dark scale-125' : 'bg-[#fdfdfd] hover:bg-gold-dark/50'
                }`}
              />
              
              {/* Label */}
              <span 
                className={`absolute left-6 font-sans text-[9px] md:text-[10px] tracking-widest whitespace-nowrap transition-all duration-300 ${
                  isActive ? 'opacity-100 text-gold-dark translate-x-0' : 'opacity-0 -translate-x-2 text-foreground/50 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
