import { FooterDefaultStoryblok } from "@/types/storyblok-components"
import { StoryblokServerComponent } from "@/components/StoryblokServerComponent"
import { getInlineStyles } from "@/utils/inline-styles"
import { storyblokEditable } from "@storyblok/react/rsc"

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
    <footer {...storyblokEditable(blok)} className="footer">
      {styles && <style>{styles}</style>}
      {logo && logo[0] && <StoryblokServerComponent blok={logo[0]} />}
      {nav && nav[0] && <StoryblokServerComponent blok={nav[0]} />}
    </footer>
  )
}
