'use client';

import { useEffect, useState, useCallback } from 'react';

interface UseScrollManagerReturn {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

const SECTIONS = ['hero', 'about', 'skills', 'education', 'contact'];

export const useScrollManager = (): UseScrollManagerReturn => {
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);

  // Basic scroll to section without animation flags
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  }, []);

  // Simplified scroll detection without throttling
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      SECTIONS.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= windowHeight / 2 && bottom >= windowHeight / 2) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    activeSection,
    scrollToSection
  };
};