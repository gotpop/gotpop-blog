import BaselineStatus from "@/components/ui/BaselineStatus"
import PageLayout from "@/components/ui/PageLayout"
import { StoryblokServerComponent } from "@/components/utils/ClientLoader/StoryblokServerComponent"
import type { PagePostStoryblok } from "@/types/storyblok-components"
import PostHeader from "./PostHeader"

interface PagePostProps {
  blok: PagePostStoryblok
}

export default async function PagePost({ blok }: PagePostProps) {
  const { Header, Footer, Heading, published_date, body } = blok

  const mainContent = body?.map((nestedBlok) => (
    <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
  ))

  return (
    <PageLayout header={Header} footer={Footer}>
      <PostHeader heading={Heading} publishedDate={published_date} />
      <main-content>
        <BaselineStatus featureId="font-size-adjust" />
        {mainContent}
      </main-content>
    </PageLayout>
  )
}
