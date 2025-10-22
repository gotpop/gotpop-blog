import { StoryblokServerComponent } from "@/components/utils/ClientLoader/StoryblokServerComponent"
import type { PageDefaultStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"
import FooterDefault from "../FooterDefault"
import HeaderDefault from "../HeaderDefault"

interface PageDefaultProps {
  blok: PageDefaultStoryblok
}

export default async function PageDefault({ blok }: PageDefaultProps) {
  const { Header, Footer, body } = blok
  const styles = getInlineStyles("PageDefault.css")

  return (
    <div className="page">
      {styles && <style>{styles}</style>}
      {Header && <HeaderDefault uuid={Header} />}
      <main>
        {body?.map((nestedBlok) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
      {Footer && <FooterDefault uuid={Footer} />}
    </div>
  )
}
