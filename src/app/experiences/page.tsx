'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../../components/Navbar';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ExperiencesPage = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(section.children,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: 'power3.out' 
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Navigation Icon */}
      <Navbar 
        sections={[]} 
        activeSection="" 
        onSectionClick={() => {}}
      />

      <section 
        ref={sectionRef}
        className="min-h-screen bg-black flex items-center justify-center py-20"
      >
        <div className="container mx-auto px-6 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 relative">
              <Image
                src="/icons/Barrier.svg"
                alt="Experiences icon"
                fill
                className="object-contain invert"
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Experiences Coming Soon
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
            I&apos;m currently curating my professional experiences.
            Check back soon to see my journey and milestones!
          </p>

          {/* Expected Launch */}
          <div className="text-gray-400 mb-8">
            <span className="inline-flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              Expected launch: Q4 2025
            </span>
          </div>

          {/* Return Button */}
          <Link 
            href="/"
            className="inline-flex px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </section>
    </>
  );
};

export default ExperiencesPage;