'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

interface Skill {
  name: string
  icon: any
}

interface SkillMarqueeProps {
  skills: Skill[]
  direction?: 'left' | 'right'
  speed?: number
}

const SkillMarquee = ({ skills, direction = 'left', speed = 50 }: SkillMarqueeProps) => {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return

    const marqueeContent = marquee.querySelector('.marquee-content')
    if (!marqueeContent) return

    const contentWidth = marqueeContent.scrollWidth
    const containerWidth = marquee.offsetWidth

    gsap.set(marqueeContent, { x: direction === 'left' ? 0 : -contentWidth })

    const tl = gsap.timeline({ repeat: -1 })
    
    if (direction === 'left') {
      tl.to(marqueeContent, {
        x: -contentWidth,
        duration: contentWidth / speed,
        ease: 'none'
      })
    } else {
      tl.to(marqueeContent, {
        x: 0,
        duration: contentWidth / speed,
        ease: 'none'
      })
    }

    return () => {
      tl.kill()
    }
  }, [skills, direction, speed])

  return (
    <div ref={marqueeRef} className="overflow-hidden whitespace-nowrap">
      <div className="marquee-content flex space-x-8">
        {[...skills, ...skills].map((skill, index) => (
          <div key={index} className="flex items-center space-x-3 bg-gray-800 px-4 py-2 rounded-lg">
            {skill.icon && (
              <Image
                src={skill.icon.fields?.file?.url || '/placeholder-icon.png'}
                alt={skill.name}
                width={24}
                height={24}
                className="w-6 h-6"
              />
            )}
            <span className="text-white font-mono text-sm">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillMarquee