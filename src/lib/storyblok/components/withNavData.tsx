import "server-only"

import type { ConfigStoryblok, NavDefaultStoryblok } from "@gotpop/system"
import type { ReactNode } from "react"
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

/**
 * HOC that adds config data and renders nav items as StoryblokServerComponents
 *
 * Usage:
 * ```tsx
 * const NavDefaultWithData = withNavData(NavDefault)
 * ```
 */
export function withNavData<T extends NavBlok>(
  ViewComponent: React.ComponentType<WithNavDataProps<T>>
) {
  return async ({ blok }: { blok: T }) => {
    console.log("[withNavData] Starting to fetch config...")
    let config: ConfigStoryblok | null = null

    try {
      const configPath = `blog/config`
      const { data: configStory } = await getStoryblokData("story", {
        fullPath: configPath,
      })

      console.log(
        "[withNavData] Fetched config story:",
        JSON.stringify(configStory, null, 2)
      )
      config = (configStory as { content: ConfigStoryblok }).content
      console.log(
        "[withNavData] Extracted config content:",
        JSON.stringify(config, null, 2)
      )
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

    console.log(
      "[withNavData] Passing config to NavDefault:",
      JSON.stringify(config, null, 2)
    )
    return <ViewComponent blok={blok} blocks={blocks} config={config} />
  }
}
