import { StoryblokServerComponent } from "@/components/utils/ClientLoader/StoryblokServerComponent"
import type { PageFilterStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"
import FooterDefault from "../FooterDefault"
import HeaderDefault from "../HeaderDefault"

interface PageFilterProps {
  blok: PageFilterStoryblok
}

export default async function PageFilter({ blok }: PageFilterProps) {
  const { Header, Footer, body } = blok
  const styles = getInlineStyles("PageFilter.css")

  return (
    <div className="page page-filter">
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
