import type { CardsStoryblok } from "@gotpop/system"
import {
  BaselineStatusBlock,
  Cards,
  HeaderDefault,
  HeroDefault,
  LinkList,
  LogoDefault,
  NavDefault,
  NavItemDefault,
  PageDefault,
  PageFilter,
  PagePost,
  RichTextBlock,
  RichTextCodeBlock,
  SnippetBlock,
} from "@gotpop/system"
import { apiPlugin, storyblokInit } from "@storyblok/react/rsc"
import { withPageData } from "@/components/pages/withPageData"
import {
  getCachedPostsWithTags as fetchPosts,
  getCachedTags as fetchTags,
} from "@/utils/cached-data"

const CardsWithData = async ({ blok }: { blok: CardsStoryblok }) =>
  await Cards({
    blok,
    fetchPosts,
    fetchTags,
  })

const PageDefaultWithData = withPageData(PageDefault)
const PageFilterWithData = withPageData(PageFilter)
const PagePostWithData = withPageData(PagePost)

export const components = {
  baseline_status_block: BaselineStatusBlock,
  cards: CardsWithData,
  header_default: HeaderDefault,
  hero_default: HeroDefault,
  link_list: LinkList,
  logo_default: LogoDefault,
  nav_default: NavDefault,
  nav_item_default: NavItemDefault,
  page_default: PageDefaultWithData,
  page_filter: PageFilterWithData,
  page_post: PagePostWithData,
  rich_text_block: RichTextBlock,
  rich_text_code_block: RichTextCodeBlock,
  snippet_block: SnippetBlock,
}

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components,
  apiOptions: {
    region: "eu",
  },
})
