'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface EducationItem {
  year: string;
  institution: string;
  degree: string;
  description: string;
}

const educationData: EducationItem[] = [
  {
    year: '2022 - 2025',
    institution: 'SMK Negeri 8 Malang',
    degree: 'Software Engineering',
    description: 'Focus on full-stack development, algorithms, data structures, and software architecture patterns.'
  },
  {
    year: '2025 / 01 - 2025 / 04',
    institution: 'Coding Camp 2025 Powered by DBS Foundation',
    degree: 'Machine Learning Engineer',
    description: 'Intensive program covering Machine Learning concepts.'
  },
  {
    year: '2025 / 04 - 2025 / 06',
    institution: 'ElevAIte x Dicoding',
    degree: 'AI Engineer',
    description: 'Intensive program covering Artificial Intelligence with Microsoft Azure.'
  }
];

interface EducationCardProps {
  item: EducationItem;
  index: number;
}

const EducationCard: React.FC<EducationCardProps> = ({ item, index }) => (
  <motion.div
    className="rounded-lg p-6 transition-colors duration-300 border-2 border-transparent hover:border-primary hover:shadow-[0_0_105px_rgba(255,255,255,0.1)]"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.01 }}
  >
    <div className="flex items-start space-x-4">
      {/* Timeline dot */}
      <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center mt-1">
        <span className="text-white font-bold text-sm">{index + 1}</span>
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-bold text-white">{item.institution}</h3>
          <span className="text-white font-medium text-sm">{item.year}</span>
        </div>
        
        <h4 className="text-primary text-lg font-medium mb-3">{item.degree}</h4>
        
        <p className="text-gray-200 leading-relaxed">{item.description}</p>
      </div>
    </div>
  </motion.div>
);

const EducationSection = () => {
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

    tl.fromTo('.education-header',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-black flex items-center py-20"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="education-header text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-primary font-semibold mb-1">
            Educational
          </h2>
          <p className="text-gray-100 text-lg max-w-2xl mx-auto">
            My educational journey and professional development milestones
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {educationData.map((item, index) => (
              <EducationCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-4">
            <div className="w-12 h-px bg-primary"></div>
            <span className="text-gray-200 text-sm">Continuous Learning Journey</span>
            <div className="w-12 h-px bg-primary"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;