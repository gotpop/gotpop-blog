import "server-only"

import { getStoryblokData } from "@/lib/storyblok/data"

export async function generateAllStaticParams() {
  const { data } = await getStoryblokData("staticParams")

  return data as { slug: string[] }[]
}
