import { StoryblokServerComponent } from "@/components"
import type { FooterDefaultStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"
import { fetchStoryByUuid } from "@/utils/storyblok-fetch"

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

  if (uuid && !blok) {
    const story = await fetchStoryByUuid(uuid)
    footerData = story?.content
  }

  if (!footerData) {
    return null
  }

  const { logo } = footerData

  return (
    <footer className="footer">
      {styles && <style>{styles}</style>}
      {logo?.[0] && <StoryblokServerComponent blok={logo[0]} />}
      <small className="footer_copyright">
        ©GotPop {new Date().getFullYear()}
      </small>
    </footer>
  )
}
