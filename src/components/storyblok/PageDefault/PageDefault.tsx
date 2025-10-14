import HeaderDefault from "../HeaderDefault"
import { PageDefaultStoryblok } from "@/types/storyblok-components"
import { StoryblokServerComponent } from "@/components/StoryblokServerComponent"
import { getInlineStyles } from "@/utils/inline-styles"
import { storyblokEditable } from "@storyblok/react/rsc"

interface PageDefaultProps {
  blok: PageDefaultStoryblok
}

export default async function PageDefault({ blok }: PageDefaultProps) {
  const styles = getInlineStyles("PageDefault.css")

  let headerData = null
  let footerTitle = null

  // Fetch header story if UUID exists
  if (blok.Header) {
    try {
      const response = await fetch(
        `https://api.storyblok.com/v2/cdn/stories?token=${process.env.STORYBLOK_ACCESS_TOKEN}&by_uuids=${blok.Header}&version=draft`
      )
      const data = await response.json()

      if (data.stories && data.stories[0]) {
        headerData = data.stories[0].content // Pass just the content
      }
    } catch (e) {
      console.error("Failed to fetch header")
    }
  }

  // Fetch footer story if UUID exists
  if (blok.Footer) {
    try {
      const response = await fetch(
        `https://api.storyblok.com/v2/cdn/stories?token=${process.env.STORYBLOK_ACCESS_TOKEN}&by_uuids=${blok.Footer}&version=draft`
      )
      const data = await response.json()
      if (data.stories && data.stories[0]) {
        footerTitle = data.stories[0].name
      }
    } catch (e) {
      console.error("Failed to fetch footer")
    }
  }

  return (
    <div {...storyblokEditable(blok)} className="page">
      {styles && <style>{styles}</style>}
      <HeaderDefault blok={headerData} />
      <main>
        {blok.body?.map((nestedBlok) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
      {footerTitle && (
        <footer className="footer">
          <p>{footerTitle}</p>
        </footer>
      )}
    </div>
  )
}
