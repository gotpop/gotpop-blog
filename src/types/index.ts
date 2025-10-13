import { SbBlokData } from "@storyblok/react"

export interface StoryblokComponent {
  blok: SbBlokData
}

export interface PageStoryblok extends SbBlokData {
  body: SbBlokData[]
}

export interface PostStoryblok extends SbBlokData {
  title: string
  content: any
  excerpt: string
  featured_image: {
    filename: string
    alt: string
  }
}