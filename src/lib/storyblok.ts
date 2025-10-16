import { apiPlugin, storyblokInit } from "@storyblok/react/rsc"

// Import all Storyblok components
import Card from "@/components/storyblok/Card"
import Cards from "@/components/storyblok/Cards"
import FooterDefault from "@/components/storyblok/FooterDefault"
import HeaderDefault from "@/components/storyblok/HeaderDefault"
import HeroDefault from "@/components/storyblok/HeroDefault"
import LogoDefault from "@/components/storyblok/LogoDefault"
import NavDefault from "@/components/storyblok/NavDefault"
import NavItemDefault from "@/components/storyblok/NavItemDefault"
import PageDefault from "@/components/storyblok/PageDefault"
import PagePost from "@/components/storyblok/PagePost"

const components = {
  card: Card,
  cards: Cards,
  footer_default: FooterDefault,
  header_default: HeaderDefault,
  hero_default: HeroDefault,
  logo_default: LogoDefault,
  nav_default: NavDefault,
  nav_item_default: NavItemDefault,
  page_default: PageDefault,
  page_post: PagePost,
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
