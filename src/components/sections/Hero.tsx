'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Set initial state to prevent flashing
    gsap.set([titleRef.current, subtitleRef.current], { 
      opacity: 1,
      y: 0 
    });

    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
        duration: 1,
        opacity: 1
      }
    });
    
    tl.fromTo(titleRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1 }
    ).fromTo(subtitleRef.current,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1 },
      '-=0.5'
    );

    // Cleanup
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden"
    >
      <div className="container mx-auto px-6 text-center">
        <h1
          ref={titleRef}
          className="text-5xl lg:text-7xl font-bold text-white mb-1 opacity-100"
        >
          Talk less. Do more.
          <br />
        </h1>
        
        <p
          ref={subtitleRef}
          className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto opacity-100"
        >
          Make your ideas a reality with our innovative solutions.
        </p>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;