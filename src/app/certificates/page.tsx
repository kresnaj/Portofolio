'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { getFirstImageFromFolder } from '@/utils/helpers';
import CertificateModal from '@/components/CertificateModal';
import gsap from 'gsap';

const CertificatePage = () => {
  const certificates = useMemo(() => [
    {
      id: 1,
      title: "Certificate of Completion",
      subtitle: "Data Science & Analytics",
      description: "Data Visualization and Analysis",
      category: "HP LIFE",
      folderName: "DataScienceHPLife", 
      tags: ["Data Science"]
    },
    {
      id: 2,
      title: "Certificate of Completion", 
      subtitle: "Learn Data Analytics with Python",
      description: "Data Visualization and Analysis",
      category: "Dicoding",
      folderName: "BelajarAnalisisDataDenganPythonDicoding",
      tags: ["Python", "Data", "Visualization"]
    },
    {
      id: 3,
      title: "Certificate of Completion",
      subtitle: "Learn basic of AI",
      description: "Artificial Intelligence Fundamentals",
      category: "Dicoding",
      folderName: "BelajarDasarAIDicoding",
      tags: ["AI"]
    },
    {
      id: 4,
      title: "Certificate of Completion",
      subtitle: "Learn Basic Machine Learning",
      description: "Machine Learning Fundamentals", 
      category: "Dicoding",
      folderName: "BelajarMachineLearningPemulaDicoding",
      tags: ["AI", "Python", "Data", "Visualization", "Machine Learning", "Scikit-Learn"]
    },
    {
      id: 5,
      title: "Certificate of Completion",
      subtitle: "Deep Learning Fundamentals",
      description: "Deep Learning",
      category: "Dicoding", 
      folderName: "DeepLearningFundamentalDicoding",
      tags: ["AI", "Python", "Data", "Visualization", "Deep Learning", "TensorFlow"]
    },
    {
      id: 6,
      title: "Certificate of Completion",
      subtitle: "Getting Started of Deep Learning",
      description: "Deep Learning Essentials",
      category: "NVIDIA DLI",
      folderName: "DeepLearning_NVIDIA",
      tags: ["AI", "Python", "Data", "Visualization", "Deep Learning", "PyTorch", "Optimization"]
    },
    {
      id: 7,
      title: "Certificate of Completion",
      subtitle: "Disaster Risk Monitoring Using Satellite Imagery",
      description: "Deep Learning on real-world problem cases",
      category: "NVIDIA DLI",
      folderName: "Sattelite_NVIDIA",
      tags: ["Python", "Data", "Visualization","Deep Learning", "PyTorch", "Optimization", "NVIDIA NGC"]
    },
    {
      id: 8,
      title: "Certificate of Completion", 
      subtitle: "The Python Programmer 2025",
      description: "Programming Language",
      category: "Udemy",
      folderName: "ThePythonProgrammer2025",
      tags: ["Python", "OOP", "Data Structures", "Algorithms"]
    },
    {
      id: 9,
      title: "Certificate of Completion",
      subtitle: "Mastering Kali Linux for Ethical Hackers", 
      description: "Cybersecurity Fundamentals",
      category: "Udemy",
      folderName: "MasteringKaliLinux",
      tags: ["Cybersecurity", "Kali Linux", "NMAP", "Metasploit", "Wireshark", "Burp Suite"]
    },
    {
      id: 10,
      title: "Certificate of Completion",
      subtitle: "Participate AI Skill Fest",
      description: "AI Training",
      category: "Microsoft Learn", 
      folderName: "AISkillFest",
      tags: ["AI"]
    }
  ], []); // Empty dependency array karena data statis

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [certificateImages, setCertificateImages] = useState<{ [key: string]: string }>({});
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [previewHover, setPreviewHover] = useState<string | null>(null);

  useEffect(() => {
    // Load semua gambar sertifikat
    const loadImages = async () => {
      const images: { [key: string]: string } = {};
      
      for (const cert of certificates) {
        if (cert.folderName) {
          try {
            const imagePath = await getFirstImageFromFolder(cert.folderName);
            images[cert.folderName] = imagePath;
          } catch (error) {
            console.error(`Error loading image for ${cert.folderName}:`, error);
            images[cert.folderName] = '/placeholder.png';
          }
        }
      }
      
      setCertificateImages(images);
    };

    loadImages();
  }, [certificates]); // Sekarang aman menggunakan certificates sebagai dependency

  const categories = ['ALL', 'HP LIFE', 'NVIDIA DLI', 'Dicoding', 'Udemy', 'Microsoft Learn'];

  const filteredCertificates = selectedCategory === 'ALL' 
    ? certificates 
    : certificates.filter(cert => cert.category === selectedCategory);

  const handleMouseEnter = (folderName: string) => {
    if (!previewHover) {  
      setPreviewHover(folderName);
      const element = document.querySelector(`.preview-${folderName}`);
      if (element) {
        gsap.killTweensOf(element);
        gsap.set(element, { display: 'flex' });
        gsap.fromTo(
          element,
          { 
            opacity: 0, 
            y: 10,
            immediateRender: true
          },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.3, 
            ease: "power2.out"
          }
        );
      }
    }
  };

  const handleMouseLeave = (folderName: string) => {
    const element = document.querySelector(`.preview-${folderName}`);
    if (element) {
      gsap.killTweensOf(element);
      gsap.to(element, { 
        opacity: 0, 
        y: 10, 
        duration: 0.2, 
        ease: "power2.in",
        onComplete: () => {
          gsap.set(element, { display: 'none' });
          setPreviewHover(null);
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navbar 
        sections={[]} 
        activeSection="" 
        onSectionClick={() => {}}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Certificate</h1>
        </div>

        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex flex-nowrap gap-3 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Certificates Grid - improved responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredCertificates.map((certificate) => (
            <div
              key={certificate.id}
              className="relative bg-gray-900 rounded-lg shadow-lg hover:shadow-primary/20 transition-shadow duration-200 overflow-hidden border border-gray-800 group"
              onMouseEnter={() => handleMouseEnter(certificate.folderName)}
              onMouseLeave={() => handleMouseLeave(certificate.folderName)}
              onClick={() => setSelectedCertificate(certificate.folderName)}
            >
              {/* Certificate Image */}
              <div className="relative h-40 sm:h-48">
                <Image
                  src={certificateImages[certificate.folderName] || '/placeholder.png'}
                  alt={certificate.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority
                />
              </div>

              {/* Hover Preview */}
              <div 
                className={`preview-${certificate.folderName} hidden absolute inset-0 bg-black/90 items-center justify-center p-4`}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={certificateImages[certificate.folderName] || '/placeholder.png'}
                    alt={certificate.title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                  />
                  <div className="absolute bottom-4 left-0 right-0 mx-auto text-white text-center bg-black/75 px-4 py-2 rounded-full text-sm max-w-[200px]">
                    Click to view full certificate
                  </div>
                </div>
              </div>
              
              {/* Certificate Content */}
              <div className="p-4 space-y-3">
                {/* Category Badge */}
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                      certificate.category === 'HP LIFE' 
                    ? 'bg-blue-200/20 text-blue-200' 
                    : certificate.category === 'NVIDIA DLI'
                    ? 'bg-green-900/20 text-green-400'
                    : certificate.category === 'Dicoding'
                    ? 'bg-blue-900/20 text-blue-400'
                    : certificate.category === 'Udemy'
                    ? 'bg-purple-900/20 text-purple-400'
                    : certificate.category === 'Microsoft Learn'
                    ? 'bg-yellow-900/20 text-yellow-400'
                    : 'bg-orange-900/20 text-orange-400'
                }`}>
                  {certificate.category}
                </span>

                {/* Title & Description */}
                <div className="min-h-[4rem]">
                  <h3 className="text-lg font-medium text-white break-words">
                    {certificate.subtitle}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                    {certificate.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-2">
                  {certificate.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-800/50 text-gray-400 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Certificate Modal */}
        <CertificateModal
          isOpen={!!selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
          imagePath={selectedCertificate ? certificateImages[selectedCertificate] : ''}
          title={selectedCertificate || ''}
        />

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No certificates found</h3>
            <p className="text-gray-400">Try selecting a different category or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificatePage;