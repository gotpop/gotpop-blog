import { CustomElement, FooterDefault, HeaderDefault } from "@gotpop/system"
import "./PageLayout.css"
import type {
  FooterDefaultStoryblok,
  HeaderDefaultStoryblok,
} from "@/types/storyblok-components"

interface PageLayoutProps {
  children?: React.ReactNode
  className?: string
  header: HeaderDefaultStoryblok
  footer: FooterDefaultStoryblok
}

export async function PageLayout({
  children,
  footer,
  header,
}: PageLayoutProps) {
  return (
    <CustomElement tag="page-layout">
      <HeaderDefault blok={header} />
      <main>
        <CustomElement tag="box-crosshatch">{children}</CustomElement>
      </main>
      <FooterDefault blok={footer} />
    </CustomElement>
  )
}
