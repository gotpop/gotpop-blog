import { StoryblokServerComponent } from "@/components/utils/ClientLoader/StoryblokServerComponent"
import { getStoryblokApi } from "@/lib/storyblok"
import type { FooterDefaultStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"

interface FooterDefaultProps {
  blok?: FooterDefaultStoryblok | null
  uuid?: string
}

export default async function FooterDefault({
  blok,
  uuid,
}: FooterDefaultProps) {
  const styles = getInlineStyles("FooterDefault.css")

  let footerData = blok

  // If UUID is provided, fetch the data
  if (uuid && !blok) {
    try {
      const storyblokApi = getStoryblokApi()
      const { data } = await storyblokApi.get(`cdn/stories`, {
        version: "draft",
        by_uuids: uuid,
      })

      footerData = data?.stories?.[0]?.content
    } catch (error) {
      console.error("Failed to fetch footer:", error)
      return null
    }
  }

  if (!footerData) {
    return null
  }

  const { nav, logo } = footerData

  return (
    <footer className="footer">
      {styles && <style>{styles}</style>}
      {logo?.[0] && <StoryblokServerComponent blok={logo[0]} />}
      {nav?.[0] && <StoryblokServerComponent blok={nav[0]} />}
    </footer>
  )
}
