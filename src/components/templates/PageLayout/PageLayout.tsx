import { FooterDefault } from "@gotpop/system/components/storyblok/FooterDefaultBlock"
import type { ReactNode } from "react"
import { HeaderDefault } from "@/components/storyblok/HeaderDefault/HeaderDefault"
import { fetchStoryByUuid } from "@/utils/storyblok-fetch"
import "./PageLayout.css"
import type { FooterDefaultStoryblok } from "@/types/storyblok-components"

interface PageLayoutProps {
  children?: ReactNode
  className?: string
  header?: string
  footer?: string
  footerData?: FooterDefaultStoryblok | null
}

export async function PageLayout({
  children,
  header,
  footer,
  footerData,
}: PageLayoutProps) {
  let resolvedFooterData = footerData

  if (footer && !footerData) {
    const story = await fetchStoryByUuid(footer)
    resolvedFooterData = story?.content
  }

  return (
    <page-layout className="page-layout">
      <HeaderDefault uuid={header} />
      <main>
        <box-crosshatch className="box-crosshatch">{children}</box-crosshatch>
      </main>
      {resolvedFooterData && <FooterDefault data={resolvedFooterData} />}
    </page-layout>
  )
}
