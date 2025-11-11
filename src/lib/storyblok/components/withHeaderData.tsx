import "server-only"

import type { ConfigStoryblok, HeaderDefaultStoryblok } from "@gotpop/system"
import type { ReactNode } from "react"
import { getStoryblokData } from "../data/get-storyblok-data"
import { StoryblokServerComponent } from "./StoryblokServerComponent"

interface WithHeaderDataProps {
  blok: HeaderDefaultStoryblok
  nav: ReactNode
  logo: ReactNode
  config: ConfigStoryblok | null
}

/**
 * HOC that adds config data and renders header children as StoryblokServerComponents
 *
 * Usage:
 * ```tsx
 * const HeaderDefaultWithData = withHeaderData(HeaderDefault)
 * ```
 */
export function withHeaderData(
  ViewComponent: React.ComponentType<WithHeaderDataProps>
) {
  return async ({ blok }: { blok: HeaderDefaultStoryblok }) => {
    console.log("[withHeaderData] Starting to fetch config...")
    let config: ConfigStoryblok | null = null

    try {
      const configPath = `blog/config`
      const { data: configStory } = await getStoryblokData("story", {
        fullPath: configPath,
      })

      console.log(
        "[withHeaderData] Fetched config story:",
        JSON.stringify(configStory, null, 2)
      )
      config = (configStory as { content: ConfigStoryblok }).content
      console.log(
        "[withHeaderData] Extracted config content:",
        JSON.stringify(config, null, 2)
      )
    } catch (error) {
      console.error("[withHeaderData] Failed to fetch config:", error)
    }

    const nav = blok.nav?.[0] ? (
      <StoryblokServerComponent blok={blok.nav[0]} config={config} />
    ) : null

    const logo = blok.logo?.[0] ? (
      <StoryblokServerComponent blok={blok.logo[0]} config={config} />
    ) : null

    console.log(
      "[withHeaderData] Passing config to HeaderDefault:",
      JSON.stringify(config, null, 2)
    )
    return <ViewComponent blok={blok} nav={nav} logo={logo} config={config} />
  }
}
