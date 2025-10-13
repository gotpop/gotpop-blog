import { SbBlokData } from "@storyblok/react"

export interface StoryblokComponent {
  blok: SbBlokData
}

// Page Types
export interface PageDefaultStoryblok extends SbBlokData {
  header: SbBlokData
  body: SbBlokData[]
  footer: SbBlokData
}

export interface PagePostStoryblok extends SbBlokData {
  header: SbBlokData
  content: SbBlokData[]
  footer: SbBlokData
}

// UI Components
export interface CardStoryblok extends SbBlokData {
  title: string
  description: string
  image?: {
    filename: string
    alt: string
  }
  link?: {
    url: string
    target?: string
  }
}

export interface CardsStoryblok extends SbBlokData {
  cards: CardStoryblok[]
}

export interface FooterDefaultStoryblok extends SbBlokData {
  content: SbBlokData[]
}

export interface HeaderDefaultStoryblok extends SbBlokData {
  navigation: SbBlokData
  logo: SbBlokData
}

export interface HeroDefaultStoryblok extends SbBlokData {
  title: string
  subtitle?: string
  image?: {
    filename: string
    alt: string
  }
}

export interface LogoDefaultStoryblok extends SbBlokData {
  image: {
    filename: string
    alt: string
  }
  link: {
    url: string
  }
}

export interface NavDefaultStoryblok extends SbBlokData {
  nav_items: SbBlokData[]
}

export interface NavItemDefaultStoryblok extends SbBlokData {
  label: string
  link: {
    url: string
    target?: string
  }
} } from "@storyblok/react";

export interface StoryblokComponent {
  blok: SbBlokData;
}

export interface PageStoryblok extends SbBlokData {
  body: SbBlokData[];
}

export interface PostStoryblok extends SbBlokData {
  title: string;
  content: any;
  excerpt: string;
  featured_image: {
    filename: string;
    alt: string;
  };
}
