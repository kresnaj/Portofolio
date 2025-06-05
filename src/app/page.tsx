'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/Hero';
import AboutSection from '@/components/sections/About';
import SkillsMarquee from '@/components/sections/Skills';
import EducationSection from '@/components/sections/Education';
import ContactSection from '@/components/sections/Contact';

// Hooks
import { useScrollManager } from '@/hooks/useScrollManager';

// Define the sections used in the Navbar and for scrolling
const SECTIONS = [
  { id: 'hero', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'skills', name: 'Skills' },
  { id: 'education', name: 'Education' },
  { id: 'projects', name: 'Projects' }, // Add this
  { id: 'contact', name: 'Contact' },
];

export default function Home() {
  const { activeSection, scrollToSection } = useScrollManager();

  useEffect(() => {
    // Register GSAP plugins
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    // Konfigurasi untuk mencegah konten hilang
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    });
    
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        markers: false,
        toggleActions: 'play none none none', // Ubah ini
        scrub: false, // Tambahkan ini
        pin: false, // Tambahkan ini
        onEnter: () => {
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
        },
        onLeave: () => {
          gsap.to(section, {
            opacity: 1, // Tetap 1 agar tidak hilang
            duration: 0.5,
          });
        },
        onEnterBack: () => {
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.5,
          });
        },
        onLeaveBack: () => {
          gsap.to(section, {
            opacity: 1, // Tetap 1 agar tidak hilang
            duration: 0.5,
          });
        }
      });
    });

    // Initial state untuk semua section
    sections.forEach((section) => {
      gsap.set(section, {
        opacity: 1,
      });
    });

    // Refresh ScrollTrigger saat semua konten dimuat
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSectionClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  return (
  <main className="bg-dark text-white overflow-x-hidden min-h-screen">
    <Navbar
      sections={SECTIONS.map(s => s.name)}
      activeSection={SECTIONS.find(s => s.id === activeSection)?.name || 'Home'}
      onSectionClick={(sectionName) => {
        const section = SECTIONS.find(s => s.name === sectionName);
        if (section) {
          handleSectionClick(section.id);
        }
      }}
    />

    {/* Update section styling */}
    <section id="hero" className="min-h-screen opacity-100">
      <HeroSection />
    </section>

    <section id="about" className="min-h-screen opacity-100">
      <AboutSection />
    </section>

    <section id="skills" className="min-h-screen opacity-100">
      <SkillsMarquee />
    </section>

    <section id="education" className="min-h-screen opacity-100">
      <EducationSection />
    </section>

    <section id="contact" className="min-h-screen opacity-100">
      <ContactSection />
    </section>
  </main>
);
}