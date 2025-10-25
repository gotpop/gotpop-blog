import type { ReactNode } from "react"
import BaselineStatus from "@/components/ui/BaselineStatus"
import PageLayout from "@/components/ui/PageLayout"
import { StoryblokServerComponent } from "@/components/utils/ClientLoader/StoryblokServerComponent"
import type {
  PageDefaultStoryblok,
  PageFilterStoryblok,
  PagePostStoryblok,
  StoryblokComponent,
} from "@/types/storyblok-components"
import PostHeader from "./PostHeader"

interface BasePageProps {
  Header?: string
  Footer?: string
  body?: StoryblokComponent[]
  children?: ReactNode
}

async function BasePage({ Header, Footer, body, children }: BasePageProps) {
  const blocks = body?.map((nestedBlok) => (
    <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
  ))

  return (
    <PageLayout header={Header} footer={Footer}>
      {children}
      {blocks}
    </PageLayout>
  )
}

export async function PageDefault({ blok }: { blok: PageDefaultStoryblok }) {
  const { Header, Footer, body } = blok

  return <BasePage Header={Header} Footer={Footer} body={body} />
}

export async function PageFilter({ blok }: { blok: PageFilterStoryblok }) {
  const { Header, Footer, body } = blok

  return <BasePage Header={Header} Footer={Footer} body={body} />
}

export async function PagePost({ blok }: { blok: PagePostStoryblok }) {
  const { Header, Footer, Heading, published_date, body } = blok
  const blocks = body?.map((nestedBlok) => (
    <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
  ))

  return (
    <PageLayout header={Header} footer={Footer}>
      <PostHeader heading={Heading} publishedDate={published_date} />
      <main-content>
        <BaselineStatus featureId="font-size-adjust" />
        {blocks}
      </main-content>
    </PageLayout>
  )
}
