import "server-only"

/**
 * @deprecated This constant is no longer used.
 * Use `getConfig()` from runtime-config.ts instead, which fetches
 * the prefix from Storyblok config (config.root_name_space).
 *
 * This file is kept for backward compatibility but should not be imported.
 */
export const CONTENT_PREFIX = process.env.STORYBLOK_CONTENT_PREFIX || "blog"

/**
 * @deprecated No longer needed. Config validation happens in runtime-config.ts
 */
export function validateContentPrefix(): void {
  if (!CONTENT_PREFIX) {
    throw new Error("STORYBLOK_CONTENT_PREFIX environment variable must be set")
  }

  console.log(`[Storyblok Config] Content prefix: ${CONTENT_PREFIX}`)
}
