import { FooterDefault, HeaderDefault } from "@gotpop/system"
import type { ReactNode } from "react"
import { getStoryblokData } from "@/lib/storyblok"
import type { StoryblokStoryResponse } from "@/types/storyblok"
import "./PageLayout.css"
import type {
  FooterDefaultStoryblok,
  HeaderDefaultStoryblok,
} from "@/types/storyblok-components"

interface PageLayoutProps {
  children?: ReactNode
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
  const resolvedHeaderData = (headerData as StoryblokStoryResponse)
    ?.content as HeaderDefaultStoryblok

  const { data: footerData } = await getStoryblokData("storyByUuid", {
    uuid: footer,
  })
  const resolvedFooterData = (footerData as StoryblokStoryResponse)
    ?.content as FooterDefaultStoryblok

  return (
    <page-layout className="page-layout">
      <HeaderDefault blok={resolvedHeaderData} />
      <main>
        <box-crosshatch className="box-crosshatch">{children}</box-crosshatch>
      </main>
      <FooterDefault data={resolvedFooterData} />
    </page-layout>
  )
}
