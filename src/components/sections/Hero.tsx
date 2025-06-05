'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image'; 
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
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 px-4 md:px-8 items-center gap-8 md:gap-1">
        {/* Text Content - Left Side */}
        <div className="text-left mx-4 md:mx-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-200 opacity-100">
            Hi, I&apos;m  
          </h2>
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary mb-4 opacity-100"
          >
            Joshua
          </h1>
          
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl opacity-100"
          >
            Make your ideas a reality with our innovative solutions. Transforming complex challenges into elegant digital solutions.
          </p>

          {/* LinkedIn button */}
          <a 
            href="https://www.linkedin.com/in/joshua-kresna-kusmono-a9a26834b/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 bg-black border-2 border-primary hover:bg-primary rounded-xl hover:border-transparent text-white hover:text-black transition-colors"
          >
            <span className="mr-2 text-base md:text-lg">LinkedIn</span>
            <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>

        {/* Image - Right Side */}
        <div className="relative w-full h-full flex justify-center items-center mt-8 md:mt-0">
          <div className="w-[80%] md:w-[100%] aspect-square relative">
            <Image
              src="/icons/Hands.png" 
              alt="Hero Image"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;