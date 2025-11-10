import { getStoryblokData } from "@/lib/storyblok"
import type {
  FooterDefaultStoryblok,
  HeaderDefaultStoryblok,
} from "@/types/storyblok-components"

interface PageBlok {
  Header?: string
  Footer?: string
  [key: string]: unknown
}

interface WithPageDataProps<T extends PageBlok> {
  header: HeaderDefaultStoryblok
  footer: FooterDefaultStoryblok
  blok: T
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

    return (
      <ViewComponent
        blok={blok}
        header={headerData.content}
        footer={footerData.content}
      />
    )
  }
}
