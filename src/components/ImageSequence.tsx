'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FRAME_COUNT = 193;

export default function ImageSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Load images
    const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    const imageSeq = { frame: 0 };

    const render = () => {
      const img = images[Math.round(imageSeq.frame)];
      if (img && img.complete && img.naturalWidth > 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate aspect ratio to fit image nicely
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        // Use Math.min to ensure whole image fits, then scale it down for a luxurious margin (increased by ~1.2x)
        const ratio = Math.min(hRatio, vRatio) * 0.75;
        
        const isDesktop = canvas.width >= 768;
        const shiftFactor = isDesktop ? 0.75 : 0.5;
        const verticalShift = isDesktop ? 0 : canvas.height * 0.15; // Push down 15% on mobile
        const centerShift_x = (canvas.width * shiftFactor) - (img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2 + verticalShift;  

        context.drawImage(img, 0, 0, img.width, img.height,
           centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      }
    };

    const loadImages = async () => {
      const loadFrame = (index: number) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = `/frames/perfume_${(index + 1).toString().padStart(3, '0')}.avif`;
          img.onload = () => {
            images[index] = img;
            if (index === 0) render(); // Render first frame immediately
            resolve();
          };
          img.onerror = () => resolve(); // Proceed even if an image fails
        });
      };

      // Load first frame ASAP so user sees something
      await loadFrame(0);
      
      // Load the rest in small batches to prevent Dev Server / Browser choking
      const BATCH_SIZE = 4;
      for (let i = 1; i < FRAME_COUNT; i += BATCH_SIZE) {
        const batch = [];
        for (let j = i; j < Math.min(i + BATCH_SIZE, FRAME_COUNT); j++) {
          batch.push(loadFrame(j));
        }
        await Promise.all(batch);
        // Tiny pause to let Next.js dev server breathe
        await new Promise(r => setTimeout(r, 20)); 
      }
    };

    loadImages();

    const ctx = gsap.context(() => {
      gsap.to(imageSeq, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: "#main-scroll-container",
          start: "top top",
          end: () => window.innerWidth < 768 ? "+=6000" : "+=4000",
          scrub: 2, // Slightly higher scrub smooths out fast swipes on mobile
        },
        onUpdate: render,
      });
      
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
      };
      
      window.addEventListener('resize', handleResize);
      handleResize(); // Init size
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full object-contain" />
    </div>
  );
}
