import "server-only"

import { getStoryblokData } from "@/lib/storyblok/data"

/** Generates static parameters for Next.js static site generation from Storyblok data. */
export async function generateAllStaticParams() {
  const { data } = await getStoryblokData("staticParams")

  return data as { slug: string[] }[]
}
