import { useId } from "react"
import { ButtonToggleMenu } from "@/components"
import { StoryblokServerComponent } from "@/components/utils/StoryblokServerComponent"
import type { NavDefaultStoryblok } from "@/types/storyblok-components"
import "./NavDefault.css"

interface NavDefaultProps {
  blok: NavDefaultStoryblok
}

export function NavDefault({ blok }: NavDefaultProps) {
  const navId = useId()

  return (
    <>
      <ButtonToggleMenu navId={navId} />
      <nav className="nav" id={navId} aria-hidden="true" hidden>
        {blok.nav_items?.map((nestedBlok) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </nav>
    </>
  )
}
