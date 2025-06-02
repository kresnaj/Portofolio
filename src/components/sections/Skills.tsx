'use client';

import { motion } from 'framer-motion';

interface Skill {
  name: string;
  icon: string; 
}

const skills: Skill[] = [
  { name: 'React', icon: '/icons/react.svg' },
  { name: 'Next.js', icon: '/icons/nextjs.svg' },
  { name: 'TypeScript', icon: '/icons/typescript.svg' },
  { name: 'JavaScript', icon: '/icons/javascript.svg' },
  { name: 'Node.js', icon: '/icons/nodejs.svg' },
  { name: 'Python', icon: '/icons/python.svg' },
  { name: 'PostgreSQL', icon: '/icons/postgresql.svg' },
  { name: 'MongoDB', icon: '/icons/mongodb.svg' },
  { name: 'Docker', icon: '/icons/docker.svg' },
  { name: 'AWS', icon: '/icons/aws.svg' },
  { name: 'Git', icon: '/icons/git.svg' },
  { name: 'Figma', icon: '/icons/figma.svg' },
];

interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => (
  <div className="flex-shrink-0 mx-4 bg-gray-800 rounded-lg p-6 w-32 h-32 flex flex-col items-center justify-center group hover:bg-gray-700 transition-colors duration-300">
    <div className="w-12 h-12 mb-3 relative">
      {/* 
      Replace with actual icons. For now using placeholder divs with orange background
      Uncomment and replace with actual image when you have the icons:
      <Image
        src={skill.icon}
        alt={skill.name}
        fill
        className="object-contain"
      />
      */}
      <div className="w-full h-full bg-primary rounded-lg flex items-center justify-center">
        <span className="text-white text-xs font-bold">
          {skill.name.slice(0, 2).toUpperCase()}
        </span>
      </div>
    </div>
    <span className="text-white text-sm font-medium text-center group-hover:text-primary transition-colors duration-300">
      {skill.name}
    </span>
  </div>
);

interface MarqueeRowProps {
  skills: Skill[];
  direction: 'left' | 'right';
  speed?: number;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ skills, direction, speed = 25 }) => {
  const animationClass = direction === 'right' ? 'animate-marquee' : 'animate-marquee-reverse';
  
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className={`flex ${animationClass}`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {/* First set */}
        {skills.map((skill, index) => (
          <SkillCard key={`first-${index}`} skill={skill} />
        ))}
        {/* Duplicate set for seamless loop */}
        {skills.map((skill, index) => (
          <SkillCard key={`second-${index}`} skill={skill} />
        ))}
      </motion.div>
    </div>
  );
};

const SkillsMarquee = () => {
  // Split skills into two rows
  const topRowSkills = skills.slice(0, Math.ceil(skills.length / 2));
  const bottomRowSkills = skills.slice(Math.ceil(skills.length / 2));

  return (
    <section className="min-h-screen bg-black flex items-center py-20 overflow-hidden">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Skills & Technologies
          </h2>
        </div>

        {/* Marquee Container */}
        <div className="space-y-6">
          {/* Top row - moving right */}
          <MarqueeRow skills={topRowSkills} direction="right" speed={30} />
          
          {/* Bottom row - moving left */}
          <MarqueeRow skills={bottomRowSkills} direction="left" speed={25} />
        </div>

        {/* Bottom decoration */}
        <div className="text-center mt-16">
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