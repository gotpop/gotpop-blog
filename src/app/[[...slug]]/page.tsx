import { StoryblokStory } from "@storyblok/react/rsc"
import { notFound } from "next/navigation"
import {
  generateAllStaticParams,
  getConfig,
  getStoryblokData,
  handleStoryblokPathRedirect,
} from "@/lib/storyblok"
import { normalizeStoryblokPath } from "@/lib/storyblok/config"

export const dynamicParams = true

export async function generateStaticParams() {
  return await generateAllStaticParams()
}

interface PageParams {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function Page({ params }: PageParams) {
  const { slug } = await params
  const config = await getConfig()

  handleStoryblokPathRedirect(slug, config)

  if (!config) {
    throw new Error("Config not found")
  }

  // Now use config for all path operations
  const fullPath = normalizeStoryblokPath(slug, config)

  const { data: story, error } = await getStoryblokData("story", { fullPath })

  if (error || !story) {
    // Trigger Next.js 404 page for story not found errors
    notFound()
  }

  return <StoryblokStory story={story} />
}
