import BaselineStatus from "@/components/ui/BaselineStatus"
import { StoryblokServerComponent } from "@/components/utils/ClientLoader/StoryblokServerComponent"
import type { PagePostStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"
import FooterDefault from "../FooterDefault"
import HeaderDefault from "../HeaderDefault"
import PostHeader from "./PostHeader"

interface PagePostProps {
  blok: PagePostStoryblok
}

export default async function PagePost({ blok }: PagePostProps) {
  const { Header, Footer, Heading, published_date, body } = blok
  const styles = getInlineStyles("PagePost.css")

  const mainContent = body?.map((nestedBlok) => (
    <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
  ))

  return (
    <div className="page-post">
      {styles && <style>{styles}</style>}
      {Header && <HeaderDefault uuid={Header} />}
      <main>
        <PostHeader heading={Heading} publishedDate={published_date} />
        <div className="main-content">
          <BaselineStatus featureId="font-size-adjust" />
          {mainContent}
        </div>
      </main>
      {Footer && <FooterDefault uuid={Footer} />}
    </div>
  )
}
