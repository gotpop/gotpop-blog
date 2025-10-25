import PageLayout from "@/components/ui/PageLayout"
import { StoryblokServerComponent } from "@/components/utils/ClientLoader/StoryblokServerComponent"
import type { PageFilterStoryblok } from "@/types/storyblok-components"

interface PageFilterProps {
  blok: PageFilterStoryblok
}

export default async function PageFilter({ blok }: PageFilterProps) {
  const { Header, Footer, body } = blok

  const blocks = body?.map((nestedBlok) => (
    <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
  ))

  return (
    <PageLayout header={Header} footer={Footer}>
      {blocks}
    </PageLayout>
  )
}
