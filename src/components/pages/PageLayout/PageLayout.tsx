import { FooterDefault, HeaderDefault } from "@gotpop/system"
import type { ReactNode } from "react"
import { getStoryblokData } from "@/lib/storyblok/data"
import type { StoryblokStoryResponse } from "@/types/storyblok"
import "./PageLayout.css"
import type {
  FooterDefaultStoryblok,
  HeaderDefaultStoryblok,
} from "@/types/storyblok-components"

interface PageLayoutProps {
  children?: ReactNode
  className?: string
  header?: string
  footer?: string
  headerData?: HeaderDefaultStoryblok | null
  footerData?: FooterDefaultStoryblok | null
}

export async function PageLayout({
  children,
  header,
  footer,
  headerData,
  footerData,
}: PageLayoutProps) {
  let resolvedHeaderData = headerData
  let resolvedFooterData = footerData

  if (header && !headerData) {
    const { data } = await getStoryblokData("storyByUuid", {
      uuid: header,
      version: "draft",
    })
    const story = data as StoryblokStoryResponse
    resolvedHeaderData = story?.content as HeaderDefaultStoryblok
  }

  if (footer && !footerData) {
    const { data } = await getStoryblokData("storyByUuid", {
      uuid: footer,
      version: "draft",
    })
    const story = data as StoryblokStoryResponse
    resolvedFooterData = story?.content as FooterDefaultStoryblok
  }

  return (
    <page-layout className="page-layout">
      <HeaderDefault blok={resolvedHeaderData} />
      <main>
        <box-crosshatch className="box-crosshatch">{children}</box-crosshatch>
      </main>
      {resolvedFooterData && <FooterDefault data={resolvedFooterData} />}
    </page-layout>
  )
}
