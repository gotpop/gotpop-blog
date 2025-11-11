import type {
  ConfigStoryblok,
  FooterDefaultStoryblok,
  HeaderDefaultStoryblok,
} from "@gotpop/system"
import type { SbBlokData } from "@storyblok/react/rsc"
import type { ReactNode } from "react"
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

export function withPageData<T extends PageBlok>(
  ViewComponent: React.ComponentType<WithPageDataProps<T>>
) {
  return async ({ blok }: { blok: T }) => {
    const { Header = "", Footer = "" } = blok

    const { data: headerData } = await getStoryblokData<HeaderDefaultStoryblok>(
      "storyByUuid",
      { uuid: Header }
    )

    const { data: footerData } = await getStoryblokData<FooterDefaultStoryblok>(
      "storyByUuid",
      { uuid: Footer }
    )

    let config: ConfigStoryblok | null = null
    const configPath = `blog/config`
    const { data: configStory } = await getStoryblokData("story", {
      fullPath: configPath,
    })

    console.log(
      "[withPageData] Fetched config data:",
      JSON.stringify(configStory, null, 2)
    )
    config = (configStory as { content: ConfigStoryblok }).content

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
