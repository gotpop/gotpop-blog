import { CustomElement, PageLayout, PostHeader } from "@gotpop/system"
import { StoryblokServerComponent } from "@/components"
import { getStoryblokData } from "@/lib/storyblok"
import type {
  FooterDefaultStoryblok,
  HeaderDefaultStoryblok,
  PageDefaultStoryblok,
  PageFilterStoryblok,
  PagePostStoryblok,
} from "@/types/storyblok-components"

export async function PageDefault({ blok }: { blok: PageDefaultStoryblok }) {
  const { Header = "", Footer = "", body } = blok

  const { data: headerData } = await getStoryblokData<HeaderDefaultStoryblok>(
    "storyByUuid",
    {
      uuid: Header,
    }
  )

  const { data: footerData } = await getStoryblokData<FooterDefaultStoryblok>(
    "storyByUuid",
    {
      uuid: Footer,
    }
  )

  const blocks = body?.map((nestedBlok) => (
    <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
  ))

  return (
    <PageLayout header={headerData.content} footer={footerData.content}>
      {blocks}
    </PageLayout>
  )
}

export async function PageFilter({ blok }: { blok: PageFilterStoryblok }) {
  const { Header = "", Footer = "", body } = blok

  const { data: headerData } = await getStoryblokData<HeaderDefaultStoryblok>(
    "storyByUuid",
    {
      uuid: Header,
    }
  )

  const { data: footerData } = await getStoryblokData<FooterDefaultStoryblok>(
    "storyByUuid",
    {
      uuid: Footer,
    }
  )

  const blocks = body?.map((nestedBlok) => (
    <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
  ))

  return (
    <PageLayout header={headerData.content} footer={footerData.content}>
      {blocks}
    </PageLayout>
  )
}

export async function PagePost({ blok }: { blok: PagePostStoryblok }) {
  const {
    Header = "",
    Footer = "",
    Heading,
    published_date,
    body,
    view_transition_name,
  } = blok

  const { data: headerData } = await getStoryblokData<HeaderDefaultStoryblok>(
    "storyByUuid",
    {
      uuid: Header,
    }
  )

  const { data: footerData } = await getStoryblokData<FooterDefaultStoryblok>(
    "storyByUuid",
    {
      uuid: Footer,
    }
  )

  const blocks = body?.map((nestedBlok) => (
    <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
  ))

  return (
    <PageLayout header={headerData.content} footer={footerData.content}>
      <PostHeader
        heading={Heading}
        publishedDate={published_date}
        style={{ viewTransitionName: view_transition_name }}
      />
      <CustomElement tag="main-content">{blocks}</CustomElement>
    </PageLayout>
  )
}
