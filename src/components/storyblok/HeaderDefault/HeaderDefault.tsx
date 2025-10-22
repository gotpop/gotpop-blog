import { StoryblokServerComponent } from "@/components/utils/ClientLoader/StoryblokServerComponent"
import { getStoryblokApi } from "@/lib/storyblok"
import type { HeaderDefaultStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"

interface HeaderDefaultProps {
  blok?: HeaderDefaultStoryblok | null
  uuid?: string
}

export default async function HeaderDefault({
  blok,
  uuid,
}: HeaderDefaultProps) {
  const styles = getInlineStyles("HeaderDefault.css")

  let headerData = blok

  if (uuid && !blok) {
    try {
      const storyblokApi = getStoryblokApi()
      const { data } = await storyblokApi.get(`cdn/stories`, {
        version: "draft",
        by_uuids: uuid,
      })

      headerData = data?.stories?.[0]?.content
    } catch (error) {
      console.error("Failed to fetch header:", error)
      return null
    }
  }

  if (!headerData) {
    return null
  }

  const { nav, logo } = headerData

  return (
    <header className="header">
      <style>{styles}</style>
      {logo?.[0] && <StoryblokServerComponent blok={logo[0]} />}
      {nav?.[0] && <StoryblokServerComponent blok={nav[0]} />}
    </header>
  )
}
