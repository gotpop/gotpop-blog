import "server-only"

import type { ConfigStoryblok } from "@gotpop/system"
import { getStoryblokApi } from "../storyblok"

/** Cached config instance to prevent redundant API calls - single source of truth for Storyblok configuration */
let cachedConfig: ConfigStoryblok | null = null

/** Gets the content prefix from environment variable - this is the bootstrap prefix used to fetch the config itself. Note: This replaces the old CONTENT_PREFIX constant. After config is loaded, use config.root_name_space instead. */
function getBootstrapPrefix(): string {
  return process.env.STORYBLOK_CONTENT_PREFIX || "blog"
}

/** Fetches config from Storyblok with caching - this is the ONLY place config should be fetched from the API */
export async function getConfig(): Promise<ConfigStoryblok> {
  if (cachedConfig) {
    return cachedConfig
  }

  try {
    const bootstrapPrefix = getBootstrapPrefix()
    const configPath = `${bootstrapPrefix}/config`

    const storyblokApi = getStoryblokApi()
    const response = await storyblokApi.get(`cdn/stories/${configPath}`, {
      version: "published",
    })

    cachedConfig = response.data.story.content as ConfigStoryblok

    console.log(
      `[Runtime Config] Loaded config with prefix: ${cachedConfig.root_name_space}`
    )

    return cachedConfig
  } catch (error) {
    console.error("[Runtime Config] Failed to fetch config:", error)
    throw new Error("Failed to load Storyblok configuration")
  }
}

/** Gets the runtime content prefix from the cached config - falls back to bootstrap prefix if config not yet loaded */
export function getRuntimePrefix(): string {
  if (cachedConfig) {
    return cachedConfig.root_name_space || "blog"
  }
  return getBootstrapPrefix()
}

/** Resets the cached config (useful for testing) - DO NOT use this in production code */
export function _resetConfigCache(): void {
  cachedConfig = null
}
