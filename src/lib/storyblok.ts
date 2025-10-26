import { apiPlugin, storyblokInit } from "@storyblok/react/rsc"
import { Card, Cards } from "@/storyblok/Cards"
import FilterContent from "@/storyblok/FilterContent"
import FooterDefault from "@/storyblok/FooterDefault"
import HeaderDefault from "@/storyblok/HeaderDefault"
import HeroDefault from "@/storyblok/HeroDefault"
import LogoDefault from "@/storyblok/LogoDefault"
import { NavDefault, NavItemDefault } from "@/storyblok/NavDefault"
import { PageDefault, PageFilter, PagePost } from "@/storyblok/Pages"
import RichTextBlock from "@/storyblok/RichTextBlock"
import RichTextCodeBlock from "@/storyblok/RichTextCodeBlock"
import SnippetBlock from "@/storyblok/SnippetBlock"

const components = {
  card: Card,
  cards: Cards,
  filter_content: FilterContent,
  footer_default: FooterDefault,
  header_default: HeaderDefault,
  hero_default: HeroDefault,
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
