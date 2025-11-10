import { CustomElement, FooterDefault, HeaderDefault } from "@gotpop/system"
import { getStoryblokData } from "@/lib/storyblok"
import type { StoryblokStoryResponse } from "@/types/storyblok"
import "./PageLayout.css"
import type {
  FooterDefaultStoryblok,
  HeaderDefaultStoryblok,
} from "@/types/storyblok-components"

interface PageLayoutProps {
  children?: React.ReactNode
  className?: string
  header?: string
  footer?: string
}

export async function PageLayout({
  children,
  footer = "",
  header = "",
}: PageLayoutProps) {
  const { data: headerData } = await getStoryblokData("storyByUuid", {
    uuid: header,
  })

  const { data: footerData } = await getStoryblokData("storyByUuid", {
    uuid: footer,
  })

  const { content: resolvedHeaderData } = headerData as StoryblokStoryResponse
  const { content: resolvedFooterData } = footerData as StoryblokStoryResponse

  return (
    <CustomElement tag="page-layout">
      <HeaderDefault blok={resolvedHeaderData as HeaderDefaultStoryblok} />
      <main>
        <CustomElement tag="box-crosshatch">{children}</CustomElement>
      </main>
      <FooterDefault data={resolvedFooterData as FooterDefaultStoryblok} />
    </CustomElement>
  )
}
