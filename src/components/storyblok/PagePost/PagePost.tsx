import { PagePostStoryblok } from "@/types/storyblok-components"
import RichText from "@/components/RichText"
import { StoryblokServerComponent } from "@/components/StoryblokServerComponent"
import { storyblokEditable } from "@storyblok/react/rsc"

interface PagePostProps {
  blok: PagePostStoryblok
}

export default function PagePost({ blok }: PagePostProps) {
  return (
    <div {...storyblokEditable(blok)} className="page-post">
      <StoryblokServerComponent blok={blok.header} />
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
      <StoryblokServerComponent blok={blok.footer} />
    </div>
  )
}
