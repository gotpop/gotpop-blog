import { useId } from "react"
import RichText from "@/components/ui/RichText"
import { StoryblokServerComponent } from "@/components/utils/ClientLoader/StoryblokServerComponent"
import { getStoryblokApi } from "@/lib/storyblok"
import type { PagePostStoryblok } from "@/types/storyblok-components"
import { formatDate } from "@/utils/date-formatter"
import { getInlineStyles } from "@/utils/inline-styles"
import Typography from "../Typography"

interface PagePostProps {
  blok: PagePostStoryblok
}

export default async function PagePost({ blok }: PagePostProps) {
  const styles = getInlineStyles("PagePost.css")
  const storyblokApi = getStoryblokApi()
  const id = useId()

  console.log("PagePost blok>>>>>>:", JSON.stringify(blok, null, 2))

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
    <div className="page-post">
      {styles && <style>{styles}</style>}
      {headerData && <StoryblokServerComponent blok={headerData} />}
      <main>
        <section aria-labelledby={id} className="page-post-header">
          <Typography tag="h1" variant="lg" shade="dark" id={id}>
            {blok.Heading}
          </Typography>
          {blok.published_date && (
            <time dateTime={blok.published_date}>
              {formatDate(blok.published_date)}
            </time>
          )}
        </section>
        {/* <baseline-status featureId="font-size-adjust"></baseline-status> */}
        {blok.body && <RichText content={blok.body} />}
        {blok.content?.map((nestedBlok) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
      {footerData && <StoryblokServerComponent blok={footerData} />}
    </div>
  )
}
