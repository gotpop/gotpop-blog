import { CustomElement, PageLayout, PostHeader } from "@gotpop/system"
import { StoryblokServerComponent } from "@/components"
import type {
  FooterDefaultStoryblok,
  HeaderDefaultStoryblok,
  PagePostStoryblok,
} from "@/types/storyblok-components"

interface PagePostViewProps {
  header: HeaderDefaultStoryblok
  footer: FooterDefaultStoryblok
  blok: PagePostStoryblok
}

export function PagePostView({ header, footer, blok }: PagePostViewProps) {
  const blocks = blok.body?.map((nestedBlok) => (
    <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
  ))

  return (
    <PageLayout header={header} footer={footer}>
      <PostHeader
        heading={blok.Heading}
        publishedDate={blok.published_date}
        style={{ viewTransitionName: blok.view_transition_name }}
      />
      <CustomElement tag="main-content">{blocks}</CustomElement>
    </PageLayout>
  )
}
