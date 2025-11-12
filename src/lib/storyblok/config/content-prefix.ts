import "server-only"

/** Content prefix for multi-tenant Storyblok setup */
export const CONTENT_PREFIX = process.env.STORYBLOK_CONTENT_PREFIX || "blog"

/** Validates that CONTENT_PREFIX is set correctly */
export function validateContentPrefix(): void {
  if (!CONTENT_PREFIX) {
    throw new Error("STORYBLOK_CONTENT_PREFIX environment variable must be set")
  }

  console.log(`[Storyblok Config] Content prefix: ${CONTENT_PREFIX}`)
}
