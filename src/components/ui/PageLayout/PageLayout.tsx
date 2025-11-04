import type { ReactNode } from "react"
import { FooterDefault } from "@/components/storyblok/FooterDefault/FooterDefault"
import { HeaderDefault } from "@/components/storyblok/HeaderDefault/HeaderDefault"
import "./PageLayout.css"

interface PageLayoutProps {
  children?: ReactNode
  className?: string
  header?: string
  footer?: string
}

export function PageLayout({ children, header, footer }: PageLayoutProps) {
  return (
    <page-layout className="page-layout">
      <HeaderDefault uuid={header} />
      <main>
        <box-crosshatch className="box-crosshatch">{children}</box-crosshatch>
      </main>
      <FooterDefault uuid={footer} />
    </page-layout>
  )
}
