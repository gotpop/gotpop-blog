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

export function ensureStoryblokInitialized() {
  console.log(
    "[storyblok-init] ensureStoryblokInitialized called, isInitialized:",
    isInitialized
  )
  if (isInitialized) {
    console.log("[storyblok-init] Already initialized, skipping")
    const api = getStoryblokApi()
    console.log("[storyblok-init] getStoryblokApi() after init check:", !!api)
    return api
  }

  console.log("[storyblok-init] Starting initialization...")

  const accessToken = process.env.STORYBLOK_ACCESS_TOKEN
  if (!accessToken) {
    throw new Error("STORYBLOK_ACCESS_TOKEN environment variable is required")
  }

  // Create base components map first (without HOC-wrapped components)
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

  // Wrap components with HOCs, passing the components map for nested rendering
  components.cards = withCardsData(Cards, components)
  components.header_default = withHeaderData(HeaderDefault, components)
  components.nav_default = withNavData(NavDefault, components)
  components.page_default = withPageData(PageDefault, components)
  components.page_filter = withPageData(PageFilter, components)
  components.page_post = withPageData(PagePost, components)

  // Initialize Storyblok once with all components
  storyblokInit({
    accessToken,
    use: [apiPlugin],
    components,
    apiOptions: {
      region: "eu",
    },
  })

  isInitialized = true
  console.log("[storyblok-init] Initialization complete")

  // Get and return the API instance after initialization
  const api = getStoryblokApi()
  console.log("[storyblok-init] getStoryblokApi() after init:", !!api)

  return api
}

// Auto-initialize on module load for runtime requests
ensureStoryblokInitialized()
