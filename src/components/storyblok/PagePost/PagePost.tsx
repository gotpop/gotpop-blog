import { useId } from "react"
import RichText from "@/components/ui/RichText"
import { StoryblokServerComponent } from "@/components/utils/ClientLoader/StoryblokServerComponent"
import type { PagePostStoryblok } from "@/types/storyblok-components"
import { formatDate } from "@/utils/date-formatter"
import { getInlineStyles } from "@/utils/inline-styles"
import FooterDefault from "../FooterDefault"
import HeaderDefault from "../HeaderDefault"
import Typography from "../Typography"

interface PagePostProps {
  blok: PagePostStoryblok
}

export default async function PagePost({ blok }: PagePostProps) {
  const { Header, Footer, Heading, published_date, body, content } = blok
  const styles = getInlineStyles("PagePost.css")
  const id = useId()

  return (
    <div className="page-post">
      {styles && <style>{styles}</style>}
      {Header && <HeaderDefault uuid={Header} />}
      <main>
        <section aria-labelledby={id} className="page-post-header">
          <Typography tag="h1" variant="lg" shade="dark" id={id}>
            {Heading}
          </Typography>
          {published_date && (
            <time dateTime={published_date}>{formatDate(published_date)}</time>
          )}
        </section>
        {/* <baseline-status featureId="font-size-adjust"></baseline-status> */}
        {body && <RichText content={body} />}
        {content?.map((nestedBlok) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
      {Footer && <FooterDefault uuid={Footer} />}
    </div>
  )
}
