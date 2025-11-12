import "server-only"

import type { ConfigStoryblok, HeaderDefaultStoryblok } from "@gotpop/system"
import type { ReactNode } from "react"
import { getConfig } from "../data/get-storyblok-data"
import { StoryblokServerComponent } from "./StoryblokServerComponent"

interface WithHeaderDataProps {
  blok: HeaderDefaultStoryblok
  nav: ReactNode
  logo: ReactNode
  config: ConfigStoryblok | null
}

export function withHeaderData(
  ViewComponent: React.ComponentType<WithHeaderDataProps>
) {
  return async ({ blok }: { blok: HeaderDefaultStoryblok }) => {
    const config = await getConfig()

    const nav = blok.nav?.[0] ? (
      <StoryblokServerComponent blok={blok.nav[0]} config={config} />
    ) : null

    const logo = blok.logo?.[0] ? (
      <StoryblokServerComponent blok={blok.logo[0]} config={config} />
    ) : null

    return <ViewComponent blok={blok} nav={nav} logo={logo} config={config} />
  }
}
