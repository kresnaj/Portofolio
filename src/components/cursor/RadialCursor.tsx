'use client';

import { useEffect, useState } from 'react';

const RadialCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Konfigurasi untuk cursor effect
  const config = {
    mainGlow: {
      size: '800px', // Ukuran cahaya utama (sebelumnya 600px)
      intensity: 0.2, // Intensitas cahaya utama (sebelumnya 0.15)
      hoverIntensity: 0.3 // Intensitas saat hover
    },
    secondaryGlow: {
      size: '200px', // Ukuran cahaya sekunder (sebelumnya 150px)
      intensity: 0.25, // Intensitas cahaya sekunder
      hoverIntensity: 0.35 // Intensitas saat hover
    },
    cursor: {
      dotSize: '4px', // Ukuran dot cursor (sebelumnya 4px)
      ringSize: '24px', // Ukuran ring cursor (sebelumnya 8px)
      ringScale: 1.5 // Skala ring saat hover
    }
  };

  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover)').matches;
    setIsMobile(!hasHover);
    setIsVisible(true);

    // Tambahkan style ke body untuk mengembalikan cursor default
    document.body.style.cursor = 'auto';

    if (!hasHover) return;

    let cursor: HTMLDivElement | null = null;
    let cursorRing: HTMLDivElement | null = null;

    const createCursor = () => {
      // Custom cursor dot
      cursor = document.createElement('div');
      cursor.className = 'fixed bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference';
      cursor.style.width = config.cursor.dotSize;
      cursor.style.height = config.cursor.dotSize;
      document.body.appendChild(cursor);

      // Custom cursor ring
      cursorRing = document.createElement('div');
      cursorRing.className = 'fixed border-2 border-white rounded-full pointer-events-none z-[9998] mix-blend-difference transition-transform duration-300';
      cursorRing.style.width = config.cursor.ringSize;
      cursorRing.style.height = config.cursor.ringSize;
      document.body.appendChild(cursorRing);
    };

    createCursor();

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (cursor && cursorRing) {
        // Offset calculation for centering
        const dotOffset = parseInt(config.cursor.dotSize) / 2;
        const ringOffset = parseInt(config.cursor.ringSize) / 2;
        
        cursor.style.transform = `translate(${e.clientX - dotOffset}px, ${e.clientY - dotOffset}px)`;
        cursorRing.style.transform = `translate(${e.clientX - ringOffset}px, ${e.clientY - ringOffset}px)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.closest('[role="button"]') ||
          target.closest('button') ||
          target.closest('a')) {
        setIsHovering(true);
        if (cursorRing) {
          const ringOffset = parseInt(config.cursor.ringSize) / 2;
          cursorRing.style.transform = `translate(${e.clientX - ringOffset}px, ${e.clientY - ringOffset}px) scale(${config.cursor.ringScale})`;
        }
      } else {
        setIsHovering(false);
        if (cursorRing) {
          const ringOffset = parseInt(config.cursor.ringSize) / 2;
          cursorRing.style.transform = `translate(${e.clientX - ringOffset}px, ${e.clientY - ringOffset}px) scale(1)`;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cursor?.remove();
      cursorRing?.remove();
      document.body.style.cursor = 'auto'; // Reset cursor style on cleanup
    };
  }, []);

  if (isMobile || !isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[-1] transition-opacity duration-300"
      style={{
        opacity: 1,
        background: `
          radial-gradient(${config.mainGlow.size} circle at ${position.x}px ${position.y}px, 
            rgba(255,255,255,${isHovering ? config.mainGlow.hoverIntensity : config.mainGlow.intensity}), 
            transparent 40%
          ),
          radial-gradient(${config.secondaryGlow.size} circle at ${position.x}px ${position.y}px, 
            rgba(255,255,255,${isHovering ? config.secondaryGlow.hoverIntensity : config.secondaryGlow.intensity}), 
            transparent 40%
          )
        `
      }}
    />
  );
};

export default RadialCursor;