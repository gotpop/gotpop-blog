import "server-only"

import type { ConfigStoryblok } from "@gotpop/system"
import { cache } from "react"
import { CONTENT_PREFIX } from "../config"
import { getStoryblokData } from "../data/get-storyblok-data"

/**
 * Cached config fetcher - only fetches once per request
 * Automatically uses current content prefix (blog/config or portfolio/config)
 */
export const getSiteConfig = cache(
  async (): Promise<ConfigStoryblok | null> => {
    try {
      const configPath = `${CONTENT_PREFIX}/config`

      const { data: configStory } = await getStoryblokData("story", {
        fullPath: configPath,
      })

      return (configStory as { content: ConfigStoryblok }).content
    } catch (error) {
      console.error(
        `[withConfigData] Failed to fetch config from ${CONTENT_PREFIX}/config:`,
        error
      )
      return null
    }
  }
)

/**
 * HOC that adds site config to component props
 * Config is automatically fetched based on STORYBLOK_CONTENT_PREFIX env var
 *
 * Usage:
 * ```tsx
 * const MyComponentWithConfig = withConfigData(MyComponent)
 * ```
 */
export function withConfigData<P extends object>(
  Component: React.ComponentType<P & { config: ConfigStoryblok | null }>
) {
  return async (props: P) => {
    const config = await getSiteConfig()

    return <Component {...props} config={config} />
  }
}
