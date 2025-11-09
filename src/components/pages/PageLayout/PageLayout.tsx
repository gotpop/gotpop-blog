import { FooterDefault, HeaderDefault } from "@gotpop/system"
import type { ReactNode } from "react"
import { fetchStoryByUuid } from "@/lib/storyblok-fetch"
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
    const story = await fetchStoryByUuid(header)
    resolvedHeaderData = story?.content
  }

  if (footer && !footerData) {
    const story = await fetchStoryByUuid(footer)
    resolvedFooterData = story?.content
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
