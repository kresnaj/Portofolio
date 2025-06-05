'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Skill {
  name: string;
  icon: string; 
}

const skills: Skill[] = [
  { name: 'TensorFlow', icon: '/icons/TensorFlow.svg' },
  { name: 'Pytorch', icon: '/icons/Pytorch.svg' },
  { name: 'TypeScript', icon: '/icons/Typescript.svg' },
  { name: 'JavaScript', icon: '/icons/Javascript.svg' },
  { name: 'Node.js', icon: '/icons/Nodejs.svg' },
  { name: 'Python', icon: '/icons/Python.svg' },
  { name: 'MongoDB', icon: '/icons/MongoDB.svg'},
  { name: 'Tailwind', icon: '/icons/Tailwind.svg'},
  { name: 'MySQL', icon: '/icons/Mysql.svg' },
  { name: 'Postman', icon: '/icons/Postman.svg' },
  { name: 'php', icon: '/icons/Php.svg' },
  { name: 'Laravel', icon: '/icons/Laravel.svg' },
  { name: 'Figma', icon: '/icons/Figma.svg' },
  { name: 'Git', icon: '/icons/Git.svg' },
  { name: 'React', icon: '/icons/React.svg' },
  { name: 'Nextjs', icon: '/icons/NextJS.svg' },
];

interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => (
  <div 
    className="flex-shrink-0 mx-0.5 sm:-mx-3 rounded-lg p-2 sm:p-6 
    flex flex-col items-center justify-center
    w-[calc(14%-8px)] sm:w-[calc(14%-12px)]"
  >
    <div className="w-10 h-10 sm:w-20 sm:h-20 relative">
      <Image
        src={skill.icon}
        alt={skill.name}
        fill
        className="object-contain"
        sizes="(max-width: 640px) 40px, 80px"
      />
    </div>
  </div>
);

interface MarqueeRowProps {
  skills: Skill[];
  direction: 'left' | 'right';
  speed?: number;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ skills, direction, speed = 25 }) => {
  return (
    <div className="relative flex overflow-hidden">
      {/* Gradient Overlay - Left */}
      <div className="absolute left-0 top-0 w-32 h-full z-10 bg-gradient-to-r from-black to-transparent" />

      <motion.div
        className="flex"
        animate={{
          x: direction === 'right' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {/* First set */}
        {skills.map((skill, index) => (
          <SkillCard key={`${direction}-1-${index}`} skill={skill} />
        ))}
        {/* Second set - exact duplicate */}
        {skills.map((skill, index) => (
          <SkillCard key={`${direction}-2-${index}`} skill={skill} />
        ))}
      </motion.div>

      {/* Gradient Overlay - Right */}
      <div className="absolute right-0 top-0 w-32 h-full z-10 bg-gradient-to-l from-black to-transparent" />
    </div>
  );
};

const SkillsMarquee = () => {
  // Split skills into two rows
  const topRowSkills = skills.slice(0, Math.ceil(skills.length / 2));
  const bottomRowSkills = skills.slice(Math.ceil(skills.length / 2));

  return (
    <section className="min-h-screen bg-black flex items-center py-8 sm:py-20 px-1 sm:px-6 overflow-hidden">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-primary mb-4 font-semibold">
            Skills & Technologies
          </h2>
        </div>

        {/* Marquee Container */}
        <div className="space-y-4 sm:space-y-6">
          {/* Top row - moving right */}
          <MarqueeRow skills={topRowSkills} direction="right" speed={30} />
          
          {/* Bottom row - moving left */}
          <MarqueeRow skills={bottomRowSkills} direction="left" speed={25} />
        </div>

        {/* Bottom decoration */}
        <div className="text-center mt-12 sm:mt-20">
          <motion.div
            className="inline-flex items-center space-x-2 text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-8 h-px bg-primary"></div>
            <span className="text-sm">And many more technologies</span>
            <div className="w-8 h-px bg-primary"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsMarquee;