'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import SkillMarquee from '../components/Skill'
import FullScreenSection from '../components/FullScreenSection'
import { getPortfolioItems, getSkills, Portfolio, Skill } from '../../lib/cms'

export default function Home() {
  const [portfolioItems, setPortfolioItems] = useState<Portfolio[]>([])
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    const loadData = async () => {
      const [portfolioData, skillsData] = await Promise.all([
        getPortfolioItems(),
        getSkills()
      ])
      setPortfolioItems(portfolioData)
      setSkills(skillsData)
    }
    loadData()
  }, [])

  // Sample data for development (replace with Contentful data)
  const sampleSkills = [
    { name: 'React', icon: { fields: { file: { url: '/icons/react.png' } } } },
    { name: 'Next.js', icon: { fields: { file: { url: '/icons/nextjs.png' } } } },
    { name: 'TypeScript', icon: { fields: { file: { url: '/icons/typescript.png' } } } },
    { name: 'Node.js', icon: { fields: { file: { url: '/icons/nodejs.png' } } } },
    { name: 'GSAP', icon: { fields: { file: { url: '/icons/gsap.png' } } } },
    { name: 'Tailwind', icon: { fields: { file: { url: '/icons/tailwind.png' } } } },
  ]

  return (
    <div className="bg-dark-bg text-white overflow-x-hidden snap-y snap-mandatory h-screen overflow-y-scroll">
      <Navbar />

      {/* Hero Section */}
      <FullScreenSection id="home" className="text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-6xl font-bold mb-4">
            Talk less. Do more.
          </h1>
          <p className="text-xl text-gray-400 mb-8 font-mono">
            Because I'm better every day
          </p>
          
          {/* Profile Section */}
          <div className="flex items-center justify-center space-x-8 mb-12">
            <div className="w-24 h-24 rounded-full bg-gray-700 overflow-hidden">
              {/* GANTI FOTO PROFIL DI SINI */}
              <Image
                src="/profile-photo.jpg" // Ganti dengan path foto Anda
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold">Hi, I'm Suhardi</h2>
              <p className="text-gray-400 font-mono">
                A professional web programmer
              </p>
            </div>
          </div>

          <div className="flex justify-center space-x-6">
            <button className="bg-orange-accent px-8 py-3 rounded-lg font-mono hover:bg-orange-600 transition-colors">
              Get In Touch
            </button>
            <button className="border border-gray-600 px-8 py-3 rounded-lg font-mono hover:border-orange-accent transition-colors">
              Download CV
            </button>
          </div>
        </div>
      </FullScreenSection>

      {/* Skills Section */}
      <FullScreenSection id="skills" className="py-20">
        <div className="w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Skills</h2>
            <p className="text-gray-400 font-mono">Technologies I work with</p>
          </div>
          
          <div className="space-y-8">
            <SkillMarquee 
              skills={skills.length > 0 ? skills : sampleSkills} 
              direction="right" 
              speed={60}
            />
            <SkillMarquee 
              skills={skills.length > 0 ? skills : sampleSkills} 
              direction="left" 
              speed={60}
            />
          </div>
        </div>
      </FullScreenSection>

      {/* Portfolio Section */}
      <FullScreenSection id="portfolio" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Portfolio</h2>
            <p className="text-gray-400 font-mono">Some of my recent work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
                <div className="h-48 bg-gray-700">
                  {item.image && (
                    <Image
                      src={item.image.fields?.file?.url || '/placeholder-project.jpg'}
                      alt={item.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.technologies.map((tech: string, i: number) => (
                      <span key={i} className="bg-orange-accent px-2 py-1 rounded text-sm">
                      {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    {item.githubUrl && (
                      <a href={item.githubUrl} className="text-orange-accent hover:underline">
                        GitHub
                      </a>
                    )}
                    {item.liveUrl && (
                      <a href={item.liveUrl} className="text-orange-accent hover:underline">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FullScreenSection>

      {/* Contact Section */}
      <FullScreenSection id="contact" className="text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8">Get In Touch?</h2>
          <p className="text-gray-400 mb-8 font-mono">
            Let's work together to bring your ideas to life
          </p>
          
          <div className="flex justify-center space-x-6">
            <button className="bg-orange-accent px-8 py-3 rounded-lg font-mono hover:bg-orange-600 transition-colors">
              Send Message
            </button>
            <button className="border border-gray-600 px-8 py-3 rounded-lg font-mono hover:border-orange-accent transition-colors">
              View Resume
            </button>
          </div>
        </div>
      </FullScreenSection>
    </div>
  )
}