import "server-only"

import type { ConfigStoryblok } from "@gotpop/system"
import { getStoryblokData } from "../data/get-storyblok-data"

/**
 * HOC that adds site config to component props
 * Fetches config from blog/config for each component that uses it
 *
 * Usage:
 * ```tsx
 * const MyComponentWithConfig = withConfigData(MyComponent)
 * ```
 */
export function withConfigData<T extends object>(
  Component: React.ComponentType<T & { config: ConfigStoryblok | null }>
) {
  return async (props: T) => {
    console.log("[withConfigData] Starting to fetch config...")

    let config: ConfigStoryblok | null = null

    try {
      const configPath = `blog/config`
      const { data: configStory } = await getStoryblokData("story", {
        fullPath: configPath,
      })

      console.log(
        "[withConfigData] Fetched config data:",
        JSON.stringify(configStory, null, 2)
      )
      config = (configStory as { content: ConfigStoryblok }).content
    } catch (error) {
      console.error("[withConfigData] Failed to fetch config:", error)
    }

    console.log(
      "[withConfigData] Final config:",
      JSON.stringify(config, null, 2)
    )

    return <Component {...props} config={config} />
  }
}
