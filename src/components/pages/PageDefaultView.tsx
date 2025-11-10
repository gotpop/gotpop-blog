import { PageLayout } from "@gotpop/system"
import { StoryblokServerComponent } from "@/components"
import type {
  FooterDefaultStoryblok,
  HeaderDefaultStoryblok,
  PageDefaultStoryblok,
} from "@/types/storyblok-components"

interface PageDefaultViewProps {
  header: HeaderDefaultStoryblok
  footer: FooterDefaultStoryblok
  blok: PageDefaultStoryblok
}

export function PageDefaultView({
  header,
  footer,
  blok,
}: PageDefaultViewProps) {
  const blocks = blok.body?.map((nestedBlok) => (
    <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
  ))

  return (
    <PageLayout header={header} footer={footer}>
      {blocks}
    </PageLayout>
  )
}
