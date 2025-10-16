import type { SbBlokData } from "@storyblok/react"

export interface StoryblokComponent {
  blok: SbBlokData
}

// Storyblok Bridge API types
export interface StoryblokBridgeEvent {
  action: "input" | "published" | "change"
  story?: unknown
}

export interface StoryblokBridgeAPI {
  init: (config: { accessToken?: string }) => void
  on: (
    events: string[],
    callback: (event: StoryblokBridgeEvent) => void
  ) => void
  off: (events: string[]) => void
  pingEditor: (callback: () => void) => void
  inEditor: boolean
  enterEditmode: () => void
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    storyblok?: StoryblokBridgeAPI
  }
}
