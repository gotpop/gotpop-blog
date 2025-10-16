import { PagePostStoryblok } from "@/types/storyblok-components"
import RichText from "@/components/ui/RichText"
import { StoryblokServerComponent } from "@/components/utils/ClientLoader/StoryblokServerComponent"
import { getInlineStyles } from "@/utils/inline-styles"
import { getStoryblokApi } from "@/lib/storyblok"
import { storyblokEditable } from "@storyblok/react/rsc"

interface PagePostProps {
  blok: PagePostStoryblok
}

export default async function PagePost({ blok }: PagePostProps) {
  const styles = getInlineStyles("PagePost.css")
  const storyblokApi = getStoryblokApi()

  let headerData = null
  let footerData = null

  // Fetch header story if UUID exists
  if (blok.Header) {
    try {
      const { data } = await storyblokApi.get(`cdn/stories`, {
        version: "draft",
        by_uuids: blok.Header,
      })

      if (data?.stories?.[0]) {
        headerData = data.stories[0].content
      }
    } catch (e) {
      console.error("Failed to fetch header:", e)
    }
  }

  // Fetch footer story if UUID exists
  if (blok.Footer) {
    try {
      const { data } = await storyblokApi.get(`cdn/stories`, {
        version: "draft",
        by_uuids: blok.Footer,
      })

      if (data?.stories?.[0]) {
        footerData = data.stories[0].content
      }
    } catch (e) {
      console.error("Failed to fetch footer:", e)
    }
  }

  return (
    <div {...storyblokEditable(blok)} className="page-post">
      {styles && <style>{styles}</style>}
      {headerData && <StoryblokServerComponent blok={headerData} />}
      <main>
        {blok.Heading && <h1>{blok.Heading}</h1>}
        {blok.published_date && (
          <time dateTime={blok.published_date}>
            {new Date(blok.published_date).toLocaleDateString()}
          </time>
        )}
        {blok.body && <RichText content={blok.body} />}
        {blok.content?.map((nestedBlok) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
      {footerData && <StoryblokServerComponent blok={footerData} />}
    </div>
  )
}
