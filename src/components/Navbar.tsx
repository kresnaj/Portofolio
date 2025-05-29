'use client'
import { useState, useEffect } from 'react'
import { gsap } from 'gsap'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.nav-menu', 
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
    } else {
      gsap.to('.nav-menu', 
        { x: '100%', opacity: 0, duration: 0.3, ease: 'power2.in' }
      )
    }
  }, [isOpen])

  const navItems = ['Home', 'About', 'Skills', 'Portfolio', 'Contact']

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section.toLowerCase())
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Hamburger Menu */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-8 h-8 flex flex-col justify-center items-center space-y-1 bg-orange-accent rounded-md p-1"
        >
          <div className={`w-4 h-0.5 bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`} />
          <div className={`w-4 h-0.5 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <div className={`w-4 h-0.5 bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation Menu */}
      <div className="nav-menu fixed top-0 right-0 h-full w-80 bg-dark-bg border-l border-gray-800 z-40 transform translate-x-full">
        <div className="p-8 pt-20">
          <nav className="space-y-6">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left text-white hover:text-orange-accent transition-colors duration-300 text-lg font-mono"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navbar