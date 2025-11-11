import "server-only"

import type { ConfigStoryblok, NavDefaultStoryblok } from "@gotpop/system"
import type { ReactNode } from "react"
import { CONTENT_PREFIX } from "../config"
import { getStoryblokData } from "../data/get-storyblok-data"
import { StoryblokServerComponent } from "./StoryblokServerComponent"

interface NavBlok {
  nav_items?: NavDefaultStoryblok["nav_items"]
  [key: string]: unknown
}

interface WithNavDataProps<T extends NavBlok> {
  blok: T
  blocks: ReactNode
  config: ConfigStoryblok | null
}

export function withNavData<T extends NavBlok>(
  ViewComponent: React.ComponentType<WithNavDataProps<T>>
) {
  return async ({ blok }: { blok: T }) => {
    let config: ConfigStoryblok | null = null

    try {
      const configPath = `${CONTENT_PREFIX}/config`
      const { data: configStory } = await getStoryblokData("story", {
        fullPath: configPath,
      })

      config = (configStory as { content: ConfigStoryblok }).content
    } catch (error) {
      console.error("[withNavData] Failed to fetch config:", error)
    }

    const blocks = blok.nav_items?.map((nestedBlok) => (
      <StoryblokServerComponent
        blok={nestedBlok}
        key={nestedBlok._uid}
        config={config}
      />
    ))

    return <ViewComponent blok={blok} blocks={blocks} config={config} />
  }
}
