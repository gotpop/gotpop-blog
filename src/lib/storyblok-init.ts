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
import { apiPlugin, getStoryblokApi, storyblokInit } from "@storyblok/react/rsc"

let isInitialized = false

/** Ensures Storyblok is initialized with all registered components. */
export function ensureStoryblokInitialized() {
  if (isInitialized) {
    return getStoryblokApi()
  }

  const accessToken = process.env.STORYBLOK_ACCESS_TOKEN
  if (!accessToken) {
    throw new Error("STORYBLOK_ACCESS_TOKEN environment variable is required")
  }

  // biome-ignore lint/suspicious/noExplicitAny: Components have different prop signatures
  const components: Record<string, React.ComponentType<any>> = {
    baseline_status_block: BaselineStatusBlock,
    card: Card,
    footer_default: FooterDefault,
    hero_default: HeroDefault,
    link_list: LinkList,
    logo_default: LogoDefault,
    nav_item_default: NavItemDefault,
    rich_text_block: RichTextBlock,
    rich_text_code_block: RichTextCodeBlock,
    snippet_block: SnippetBlock,
  }

  components.cards = withCardsData(Cards, components)
  components.header_default = withHeaderData(HeaderDefault, components)
  components.nav_default = withNavData(NavDefault, components)
  components.page_default = withPageData(PageDefault, components)
  components.page_filter = withPageData(PageFilter, components)
  components.page_post = withPageData(PagePost, components)

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

ensureStoryblokInitialized()
