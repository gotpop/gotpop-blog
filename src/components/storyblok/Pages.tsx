import BaselineStatus from "@/components/ui/BaselineStatus"
import PageLayout from "@/components/ui/PageLayout"
import { StoryblokServerComponent } from "@/components/utils/ClientLoader/StoryblokServerComponent"
import type {
  PageDefaultStoryblok,
  PageFilterStoryblok,
  PagePostStoryblok,
} from "@/types/storyblok-components"
import PostHeader from "./PostHeader"

// PageDefault component
interface PageDefaultProps {
  blok: PageDefaultStoryblok
}

export async function PageDefault({ blok }: PageDefaultProps) {
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

// PageFilter component
interface PageFilterProps {
  blok: PageFilterStoryblok
}

export async function PageFilter({ blok }: PageFilterProps) {
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

// PagePost component
interface PagePostProps {
  blok: PagePostStoryblok
}

export async function PagePost({ blok }: PagePostProps) {
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
