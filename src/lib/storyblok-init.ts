import "server-only"

import {
  withCardsData,
  withHeaderData,
  withNavData,
  withPageData,
} from "@gotpop/storyblok"
import {
  BaselineStatusBlock,
  Card,
  Cards,
  FooterDefault,
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

const CardsWithData = withCardsData(Cards)
const HeaderDefaultWithData = withHeaderData(HeaderDefault)
const NavDefaultWithData = withNavData(NavDefault)
const PageDefaultWithData = withPageData(PageDefault)
const PageFilterWithData = withPageData(PageFilter)
const PagePostWithData = withPageData(PagePost)

const components = {
  baseline_status_block: BaselineStatusBlock,
  card: Card,
  cards: CardsWithData,
  footer_default: FooterDefault,
  header_default: HeaderDefaultWithData,
  hero_default: HeroDefault,
  link_list: LinkList,
  logo_default: LogoDefault,
  nav_default: NavDefaultWithData,
  nav_item_default: NavItemDefault,
  page_default: PageDefaultWithData,
  page_filter: PageFilterWithData,
  page_post: PagePostWithData,
  rich_text_block: RichTextBlock,
  rich_text_code_block: RichTextCodeBlock,
  snippet_block: SnippetBlock,
}

storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components,
  apiOptions: {
    region: "eu",
  },
})
