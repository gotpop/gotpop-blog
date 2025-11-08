import { apiPlugin, storyblokInit } from "@storyblok/react/rsc"
import {
  BaselineStatusBlock,
  Card,
  Cards,
  FilterContent,
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
} from "@/storyblok"

const components = {
  baseline_status_block: BaselineStatusBlock,
  card: Card,
  cards: Cards,
  filter_content: FilterContent,
  // footer_default: Removed - now handled in templates with data fetching
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

// Server-side initialization
export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components,
  apiOptions: {
    region: "eu",
  },
})
