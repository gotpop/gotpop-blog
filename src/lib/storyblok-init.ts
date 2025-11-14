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
  PageNotFound,
  PagePost,
  RichTextBlock,
  RichTextCodeBlock,
  SnippetBlock,
} from "@gotpop/system"
import { apiPlugin, getStoryblokApi, storyblokInit } from "@storyblok/react/rsc"

let isInitialized = false

/** Ensures Storyblok is initialized with all registered components. */
export function ensureStoryblokInitialised() {
  if (isInitialized) {
    return getStoryblokApi()
  }

  const accessToken = process.env.STORYBLOK_ACCESS_TOKEN

  if (!accessToken) {
    throw new Error("STORYBLOK_ACCESS_TOKEN environment variable is required")
  }

  const components = {
    baseline_status_block: BaselineStatusBlock,
    card: Card,
    cards: withCardsData(Cards),
    footer_default: FooterDefault,
    header_default: withHeaderData(HeaderDefault),
    hero_default: HeroDefault,
    link_list: LinkList,
    logo_default: LogoDefault,
    nav_default: withNavData(NavDefault),
    nav_item_default: NavItemDefault,
    not_found: withPageData(PageNotFound),
    page_default: withPageData(PageDefault),
    page_filter: withPageData(PageFilter),
    page_post: withPageData(PagePost),
    rich_text_block: RichTextBlock,
    rich_text_code_block: RichTextCodeBlock,
    snippet_block: SnippetBlock,
  }

  storyblokInit({
    accessToken,
    use: [apiPlugin],
    components,
    apiOptions: {
      region: "eu",
    },
  })

  isInitialized = true

  return getStoryblokApi()
}

ensureStoryblokInitialised()
