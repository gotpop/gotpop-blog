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

// Shared base component for all page types
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

// PageDefault component
interface PageDefaultProps {
  blok: PageDefaultStoryblok
}

export async function PageDefault({ blok }: PageDefaultProps) {
  const { Header, Footer, body } = blok
  return <BasePage Header={Header} Footer={Footer} body={body} />
}

// PageFilter component
interface PageFilterProps {
  blok: PageFilterStoryblok
}

export async function PageFilter({ blok }: PageFilterProps) {
  const { Header, Footer, body } = blok
  return <BasePage Header={Header} Footer={Footer} body={body} />
}

// PagePost component
interface PagePostProps {
  blok: PagePostStoryblok
}

export async function PagePost({ blok }: PagePostProps) {
  const { Header, Footer, Heading, published_date, body } = blok

  return (
    <BasePage Header={Header} Footer={Footer} body={body}>
      <PostHeader heading={Heading} publishedDate={published_date} />
      <main-content>
        <BaselineStatus featureId="font-size-adjust" />
      </main-content>
    </BasePage>
  )
}
