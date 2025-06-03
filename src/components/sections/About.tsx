'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Set initial state
    gsap.set(section.children, {
      y: 30,
      opacity: 0
    });

    // Create timeline for entrance animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reset', 
      }
    });

    // Animate all children with stagger
    tl.to(section.children, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    });

    return () => {
      // Cleanup
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      // Reset styles
      gsap.set(section.children, {
        clearProps: 'all'
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-black flex items-center py-20"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-start max-w-3xl mx-auto">
          
          <div className="flex items-center gap-4 mb-8">
            <h1 className="text-5xl text-white font-bold">Hi, I'm Joshua!</h1>
            <a 
              href="https://www.linkedin.com/in/joshua-kresna-kusmono-a9a26834b/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2 bg-black border-2 border-white hover:bg-white rounded-2xl text-white hover:text-black transition-colors"
            >
              <span className="mr-2">LinkedIn</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>

          {/* Main Description */}
          <p className="text-gray-400 text-lg mb-8">
            A professional that expertise on Website Developer and AI Enthusiast. 
            Create a Model that performs well to website application. Has IT background 
            with Software Engineering major.
          </p>

          {/* Skills Section */}
          <div className="flex flex-wrap gap-3">
            <span className="px-6 py-2 bg-zinc-900 text-gray-500 rounded-full text-sm hover:bg-zinc-800 transition-colors">
              Software Engineering
            </span>
            <span className="px-6 py-2 bg-zinc-900 text-gray-500 rounded-full text-sm hover:bg-zinc-800 transition-colors">
              Machine Learning
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;