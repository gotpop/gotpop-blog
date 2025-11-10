import { PageLayout } from "@gotpop/system"
import { StoryblokServerComponent } from "@/components"
import type {
  FooterDefaultStoryblok,
  HeaderDefaultStoryblok,
  PageFilterStoryblok,
} from "@/types/storyblok-components"

interface PageFilterViewProps {
  header: HeaderDefaultStoryblok
  footer: FooterDefaultStoryblok
  blok: PageFilterStoryblok
}

export function PageFilterView({ header, footer, blok }: PageFilterViewProps) {
  const blocks = blok.body?.map((nestedBlok) => (
    <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
  ))

  return (
    <PageLayout header={header} footer={footer}>
      {blocks}
    </PageLayout>
  )
}
