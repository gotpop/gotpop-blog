import { storyblokEditable } from "@storyblok/react/rsc"
import { StoryblokServerComponent } from "@/components/utils/ClientLoader/StoryblokServerComponent"
import type { HeaderDefaultStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"

interface HeaderDefaultProps {
  blok: HeaderDefaultStoryblok | null
}

export default function HeaderDefault({ blok }: HeaderDefaultProps) {
  const styles = getInlineStyles("HeaderDefault.css")

  if (!blok) {
    return null
  }

  const { nav, logo } = blok

  return (
    <header {...storyblokEditable(blok)} className="header">
      <style>{styles}</style>
      {logo?.[0] && <StoryblokServerComponent blok={logo[0]} />}
      {nav?.[0] && <StoryblokServerComponent blok={nav[0]} />}
    </header>
  )
}
