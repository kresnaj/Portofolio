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
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-primary rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-primary rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-primary rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 text-center">
        <h1
          ref={titleRef}
          className="text-5xl lg:text-7xl font-bold text-white mb-6 opacity-100"
        >
          Talk less. Do more.
          <br />
          <span className="text-primary">Design is quite every day</span>
        </h1>
        
        <p
          ref={subtitleRef}
          className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto opacity-100"
        >
          Hi, I'm Joshua! A passionate software engineer from Indonesia who loves creating 
          digital experiences and solving complex problems through code.
        </p>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <button className="bg-primary hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300">
            Get In Touch
          </button>
        </motion.div>

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