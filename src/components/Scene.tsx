'use client';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, Preload } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

function PerfumeBottle() {
  const meshRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    // Scroll-synced object rotation (Option 2-A & 3-A)
    const ctx = gsap.context(() => {
      gsap.to(meshRef.current!.rotation, {
        y: Math.PI * 2,
        ease: 'none',
        scrollTrigger: {
          trigger: '#main-scroll-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });
      
      // Add a slight vertical movement based on scroll
      gsap.to(meshRef.current!.position, {
        y: -1.5,
        ease: 'none',
        scrollTrigger: {
          trigger: '#main-scroll-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={meshRef}>
        {/* Placeholder Bottle Body */}
        <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 3, 1.5]} />
          <meshStandardMaterial 
            color="#ffffff" 
            roughness={0.1} 
            metalness={0.2} 
            envMapIntensity={1.5} 
          />
        </mesh>
        {/* Placeholder Cap */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.6, 0.6, 1, 32]} />
          <meshStandardMaterial 
            color="#cfb276" 
            roughness={0.2} 
            metalness={0.8} 
            envMapIntensity={2} 
          />
        </mesh>
        {/* Label Detail */}
        <mesh position={[0, -0.5, 0.76]}>
          <planeGeometry args={[1, 1.5]} />
          <meshStandardMaterial color="#fdfdfd" roughness={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-10">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} color="#ffffff" />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#fff8f0" castShadow />
          <spotLight position={[-5, 5, 5]} angle={0.4} penumbra={1} intensity={2} color="#cfb276" />
          
          <PerfumeBottle />
          
          {/* Soft environment lighting to give elegant reflections */}
          <Environment preset="city" />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
