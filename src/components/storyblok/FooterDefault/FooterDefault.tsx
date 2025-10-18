import { StoryblokServerComponent } from "@/components/utils/ClientLoader/StoryblokServerComponent"
import type { FooterDefaultStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"
import { getEditableProps } from "@/utils/storyblok-editable"

interface FooterDefaultProps {
  blok: FooterDefaultStoryblok
}

export default function FooterDefault({ blok }: FooterDefaultProps) {
  const styles = getInlineStyles("FooterDefault.css")

  if (!blok) {
    return null
  }

  const { nav, logo } = blok

  return (
    <footer {...getEditableProps(blok)} className="footer">
      {styles && <style>{styles}</style>}
      {logo?.[0] && <StoryblokServerComponent blok={logo[0]} />}
      {nav?.[0] && <StoryblokServerComponent blok={nav[0]} />}
    </footer>
  )
}
