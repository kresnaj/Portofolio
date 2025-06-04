import React from 'react';
import Link from 'next/link';

const ProjectsSection = () => {
  return (
    <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center py-20">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Explore My Projects
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          Discover my portfolio of AI and machine learning projects. From deep learning applications 
          to data science solutions, see how I turn concepts into reality.
        </p>
        <Link 
          href="/projects"
          className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full transition-colors duration-200 transform hover:scale-105"
        >
          View All Projects
        </Link>
      </div>
      
      {/* Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {/* You can add project preview cards here */}
      </div>
    </div>
  );
};

export default ProjectsSection;