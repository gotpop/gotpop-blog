import type { SbBlokData } from "@storyblok/react/rsc"
import type { ReactNode } from "react"
import type {
  FooterDefaultStoryblok,
  HeaderDefaultStoryblok,
} from "@/types/storyblok-components"
import { getStoryblokData } from "./data/get-storyblok-data"
import { StoryblokServerComponent } from "./StoryblokServerComponent"

interface PageBlok {
  Header?: string
  Footer?: string
  body?: SbBlokData[]
  [key: string]: unknown
}

interface WithPageDataProps<T extends PageBlok> {
  header: HeaderDefaultStoryblok
  footer: FooterDefaultStoryblok
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

    const blocks = blok.body?.map((nestedBlok) => (
      <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))

    return (
      <ViewComponent
        blok={blok}
        blocks={blocks}
        header={headerData.content}
        footer={footerData.content}
      />
    )
  }
}
