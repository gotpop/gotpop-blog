import type { SbBlokData } from "@storyblok/react/rsc"
import { components } from "@/lib/storyblok/storyblok"

interface StoryblokServerComponentProps {
  blok: SbBlokData | null | undefined
}

export function StoryblokServerComponent({
  blok,
}: StoryblokServerComponentProps): React.JSX.Element | null {
  if (!blok) {
    return null
  }

  if (typeof blok !== "object" || !blok.component) {
    return null
  }

  const Component = components[blok.component as keyof typeof components]

  if (!Component) {
    console.warn(`Component ${blok.component} doesn't exist.`)

    return null
  }

  // TypeScript can't infer the correct blok type for each component
  // Safe to cast since we're checking the component exists
  return <Component blok={blok as never} />
}
