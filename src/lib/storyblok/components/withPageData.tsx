import "server-only"

import type {
  ConfigStoryblok,
  FooterDefaultStoryblok,
  HeaderDefaultStoryblok,
} from "@gotpop/system"
import type { SbBlokData } from "@storyblok/react/rsc"
import type { ReactNode } from "react"
import { getConfig } from "../config/runtime-config"
import { getStoryblokData } from "../data/get-storyblok-data"
import { StoryblokServerComponent } from "./StoryblokServerComponent"

interface PageBlok {
  Header?: string
  Footer?: string
  body?: SbBlokData[]
  [key: string]: unknown
}

interface WithPageDataProps<T extends PageBlok> {
  header: ReactNode
  footer: ReactNode
  blok: T
  blocks: ReactNode
}

/** Higher-Order Component that fetches and renders header and footer components for a page */
export function withPageData<T extends PageBlok>(
  ViewComponent: React.ComponentType<WithPageDataProps<T>>
) {
  return async ({
    blok,
    config: providedConfig,
  }: {
    blok: T
    config?: ConfigStoryblok | null
  }) => {
    const { Header = "", Footer = "" } = blok

    // Use provided config or fetch from cache
    const config = providedConfig ?? (await getConfig())

    const { data: headerData } = await getStoryblokData<HeaderDefaultStoryblok>(
      "storyByUuid",
      { uuid: Header }
    )

    const { data: footerData } = await getStoryblokData<FooterDefaultStoryblok>(
      "storyByUuid",
      { uuid: Footer }
    )

    const header = (
      <StoryblokServerComponent blok={headerData.content} config={config} />
    )

    const footer = (
      <StoryblokServerComponent blok={footerData.content} config={config} />
    )

    const blocks = blok.body?.map((nestedBlok) => (
      <StoryblokServerComponent
        blok={nestedBlok}
        key={nestedBlok._uid}
        config={config}
      />
    ))

    return (
      <ViewComponent
        blok={blok}
        blocks={blocks}
        header={header}
        footer={footer}
      />
    )
  }
}
