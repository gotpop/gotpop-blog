import {
  generateAllStaticParams,
  getConfig,
  getStoryblokData,
  handleStoryblokPathRedirect,
  normalizeStoryblokPath,
} from "@gotpop/storyblok"
import { StoryblokStory } from "@storyblok/react/rsc"
import { notFound } from "next/navigation"
import { ensureStoryblokInitialized } from "@/lib/storyblok-init"

export const dynamicParams = true

export async function generateStaticParams() {
  // Ensure Storyblok is initialized before generating static params
  const initResult = ensureStoryblokInitialized()
  console.log("[page.tsx] generateStaticParams - initResult:", !!initResult)
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
    notFound()
  }

  return <StoryblokStory story={story} />
}
