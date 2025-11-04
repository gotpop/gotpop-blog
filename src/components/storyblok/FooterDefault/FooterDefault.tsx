import { StoryblokServerComponent } from "@/components"
import type { FooterDefaultStoryblok } from "@/types/storyblok-components"
import "./FooterDefault.css"
import { fetchStoryByUuid } from "@/utils/storyblok-fetch"
import { Typography } from "../Typography"

interface FooterDefaultProps {
  blok?: FooterDefaultStoryblok | null
  uuid?: string
}

export async function FooterDefault({ blok, uuid }: FooterDefaultProps) {
  let footerData = blok

  if (uuid && !blok) {
    const story = await fetchStoryByUuid(uuid)
    footerData = story?.content
  }

  if (!footerData) {
    return null
  }

  const { logo, nav } = footerData
  const hasNav = nav && nav.length > 0
  const hasLogo = logo?.[0]
  const copyright = `© GotPop ${new Date().getFullYear()}`

  return (
    <footer className="footer">
      <div className="footer-content">
        {hasLogo && <StoryblokServerComponent blok={logo[0]} />}
        {hasNav && (
          <nav className="footer-nav">
            {nav.map((navItem) => (
              <StoryblokServerComponent key={navItem._uid} blok={navItem} />
            ))}
          </nav>
        )}
      </div>

      <Typography
        className="copyright"
        tag="small"
        variant="text-xs"
        shade="dimmed"
      >
        {copyright}
      </Typography>
    </footer>
  )
}
