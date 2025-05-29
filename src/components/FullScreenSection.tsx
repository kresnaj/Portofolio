'use client'
import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { gsap } from 'gsap'

interface FullScreenSectionProps {
  children: React.ReactNode
  id: string
  className?: string
}

const FullScreenSection = ({ children, id, className = '' }: FullScreenSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false
  })

  useEffect(() => {
    if (inView && sectionRef.current) {
      gsap.fromTo(sectionRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' }
      )
    }
  }, [inView])

  return (
    <section
      id={id}
      ref={(el) => {
        ref(el)
      }}
      className={`min-h-screen flex items-center justify-center snap-start ${className}`}
    >
      {children}
    </section>
  )
}

export default FullScreenSection;