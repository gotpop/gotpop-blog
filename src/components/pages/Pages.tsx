import { PageLayout, PostHeader } from "@gotpop/system"
import type { ReactNode } from "react"
import { StoryblokServerComponent } from "@/components"
import { getStoryblokData } from "@/lib/storyblok"
import type {
  FooterDefaultStoryblok,
  HeaderDefaultStoryblok,
  PageDefaultStoryblok,
  PageFilterStoryblok,
  PagePostStoryblok,
  StoryblokComponent,
} from "@/types/storyblok-components"

interface BasePageProps {
  header?: string
  footer?: string
  body?: StoryblokComponent[]
  children?: ReactNode
}

async function BasePage({
  header = "",
  footer = "",
  body,
  children,
}: BasePageProps) {
  const { data: headerData } = await getStoryblokData<HeaderDefaultStoryblok>(
    "storyByUuid",
    {
      uuid: header,
    }
  )

  const { data: footerData } = await getStoryblokData<FooterDefaultStoryblok>(
    "storyByUuid",
    {
      uuid: footer,
    }
  )

  const blocks = body?.map((nestedBlok) => (
    <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
  ))

  return (
    <PageLayout header={headerData.content} footer={footerData.content}>
      {children}
      {blocks}
    </PageLayout>
  )
}

export async function PageDefault({ blok }: { blok: PageDefaultStoryblok }) {
  const { Header, Footer, body } = blok

  return <BasePage header={Header} footer={Footer} body={body} />
}

export async function PageFilter({ blok }: { blok: PageFilterStoryblok }) {
  const { Header, Footer, body } = blok

  return <BasePage header={Header} footer={Footer} body={body} />
}

export async function PagePost({ blok }: { blok: PagePostStoryblok }) {
  const {
    Header,
    Footer,
    Heading,
    published_date,
    body,
    view_transition_name,
  } = blok

  return (
    <BasePage header={Header} footer={Footer} body={body}>
      <PostHeader
        heading={Heading}
        publishedDate={published_date}
        style={{ viewTransitionName: view_transition_name }}
      />
    </BasePage>
  )
}
