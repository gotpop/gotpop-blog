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
  RichTextBlock,
  RichTextCodeBlock,
  SnippetBlock,
} from "@gotpop/system"
import { apiPlugin, storyblokInit } from "@storyblok/react/rsc"
import { PageDefault, PageFilter, PagePost } from "@/storyblok"
import {
  getCachedPostsWithTags as fetchPosts,
  getCachedTags as fetchTags,
} from "@/utils/cached-data"

const CardsWithData = async (blok: CardsStoryblok) =>
  await Cards({
    blok,
    fetchPosts,
    fetchTags,
  })

export const components = {
  baseline_status_block: BaselineStatusBlock,
  cards: CardsWithData,
  header_default: HeaderDefault,
  hero_default: HeroDefault,
  link_list: LinkList,
  logo_default: LogoDefault,
  nav_default: NavDefault,
  nav_item_default: NavItemDefault,
  page_default: PageDefault,
  page_filter: PageFilter,
  page_post: PagePost,
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
