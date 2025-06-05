'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

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
        <div className="flex flex-col items-center max-w-3xl mx-auto"> {/* Changed to center */}
          <h2 className="text-4xl lg:text-5xl text-primary mb-4 font-bold"> {/* Changed styling */}
            Where Code Meets Intelligence.
          </h2>
          <p className="text-gray-100 text-xl mb-8 text-center font-medium"> {/* Changed styling */}
            Software Engineering graduate with strong skills in website development and AI integration. Experienced in deploying machine learning models into scalable web applications. Lifelong learner, actively improving through real-world projects and specialized programs.
          </p>

          <Link 
            href="/projects" 
            className="inline-flex items-center px-5 py-2 bg-black border-2 border-primary hover:bg-primary rounded-xl text-white hover:text-black transition-colors"
          >
            <span className="mr-2">See my project</span>
            <svg 
              className="w-4 h-4" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;