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

  const { logo, nav } = footerData

  return (
    <footer className="footer">
      {styles && <style>{styles}</style>}

      <div className="footer-content">
        {logo?.[0] && <StoryblokServerComponent blok={logo[0]} />}

        {nav && nav.length > 0 && (
          <nav className="footer-nav">
            {nav.map((navItem) => (
              <StoryblokServerComponent key={navItem._uid} blok={navItem} />
            ))}
          </nav>
        )}
      </div>

      <small className="footer_copyright">
        ©GotPop {new Date().getFullYear()}
      </small>
    </footer>
  )
}
