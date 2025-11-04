import { StoryblokServerComponent } from "@/components"
import type { HeaderDefaultStoryblok } from "@/types/storyblok-components"
import "./HeaderDefault.css"
import { fetchStoryByUuid } from "@/utils/storyblok-fetch"

interface HeaderDefaultProps {
  blok?: HeaderDefaultStoryblok | null
  uuid?: string
}

export async function HeaderDefault({ blok, uuid }: HeaderDefaultProps) {
  let headerData = blok

  if (uuid && !blok) {
    const story = await fetchStoryByUuid(uuid)
    headerData = story?.content
  }

  if (!headerData) {
    return null
  }

  const { nav, logo } = headerData

  return (
    <header className="header">
      {logo?.[0] && <StoryblokServerComponent blok={logo[0]} />}
      {nav?.[0] && <StoryblokServerComponent blok={nav[0]} />}
    </header>
  )
}
