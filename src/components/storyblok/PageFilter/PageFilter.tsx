import { StoryblokServerComponent } from "@/components/utils/ClientLoader/StoryblokServerComponent"
import { getStoryblokApi } from "@/lib/storyblok"
import type { PageFilterStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"
import { storyblokEditable } from "@storyblok/react/rsc"

interface PageFilterProps {
  blok: PageFilterStoryblok
}

export default async function PageFilter({ blok }: PageFilterProps) {
  const styles = getInlineStyles("PageFilter.css")
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
    <div className="page page-filter">
      {styles && <style>{styles}</style>}
      {headerData && <StoryblokServerComponent blok={headerData} />}
      <main>
        {blok.body?.map((nestedBlok) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
      {footerData && <StoryblokServerComponent blok={footerData} />}
    </div>
  )
}
