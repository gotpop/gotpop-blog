import PageLayout from "@/components/ui/PageLayout"
import { StoryblokServerComponent } from "@/components/utils/ClientLoader/StoryblokServerComponent"
import type { PageDefaultStoryblok } from "@/types/storyblok-components"

interface PageDefaultProps {
  blok: PageDefaultStoryblok
}

export default async function PageDefault({ blok }: PageDefaultProps) {
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
