import { createClient } from 'contentful'

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || '',
})

export interface Portfolio {
  title: string
  description: string
  image: any
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
}

export interface Skill {
  name: string
  icon: any
  category: string
}

export async function getPortfolioItems(): Promise<Portfolio[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'portfolio',
      order: ['-sys.createdAt'],
    })
    
    return entries.items.map((item: any) => ({
      title: item.fields.title,
      description: item.fields.description,
      image: item.fields.image,
      technologies: item.fields.technologies || [],
      githubUrl: item.fields.githubUrl,
      liveUrl: item.fields.liveUrl,
    }))
  } catch (error) {
    console.error('Error fetching portfolio items:', error)
    return []
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'skill',
      order: ['fields.name'],
    })
    
    return entries.items.map((item: any) => ({
      name: item.fields.name,
      icon: item.fields.icon,
      category: item.fields.category || 'general',
    }))
  } catch (error) {
    console.error('Error fetching skills:', error)
    return []
  }
}