import { FooterDefault, HeaderDefault } from "@gotpop/system"
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
  header: string
  footer: string
}

export async function PageLayout({
  children,
  footer,
  header,
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
    <page-layout>
      <HeaderDefault blok={resolvedHeaderData as HeaderDefaultStoryblok} />
      <main>
        <box-crosshatch className="box-crosshatch">{children}</box-crosshatch>
      </main>
      <FooterDefault data={resolvedFooterData as FooterDefaultStoryblok} />
    </page-layout>
  )
}
