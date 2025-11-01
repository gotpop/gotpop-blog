import type { ReactNode } from "react"
import FooterDefault from "@/components/storyblok/FooterDefault/FooterDefault"
import HeaderDefault from "@/components/storyblok/HeaderDefault/HeaderDefault"
import { getInlineStyles } from "@/utils/inline-styles"

interface PageLayoutProps {
  children?: ReactNode
  className?: string
  header?: string
  footer?: string
}

export default function PageLayout({
  children,
  header,
  footer,
}: PageLayoutProps) {
  const styles = getInlineStyles("PageLayout.css")

  return (
    <div className="page-layout">
      {styles && <style>{styles}</style>}
      <HeaderDefault uuid={header} />
      <main>
        <div className="box-crosshatch">{children}</div>
      </main>
      <FooterDefault uuid={footer} />
    </div>
  )
}
