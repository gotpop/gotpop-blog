import type { ConfigStoryblok, NavDefaultStoryblok } from "@gotpop/system"
// import type { SbBlokData } from "@storyblok/react/rsc"
import type { ReactNode } from "react"
import { getStoryblokData } from "../data/get-storyblok-data"
import { StoryblokServerComponent } from "./StoryblokServerComponent"

interface WithNavDefaultDataProps<T extends NavDefaultStoryblok> {
  blok: T
  blocks: ReactNode
  config: ConfigStoryblok | null
}

export function withNavDefaultData<T extends NavDefaultStoryblok>(
  ViewComponent: React.ComponentType<WithNavDefaultDataProps<T>>
) {
  return async ({ blok }: { blok: T }) => {
    let config: ConfigStoryblok | null = null
    const configPath = `blog/config`
    const { data: configStory } = await getStoryblokData("story", {
      fullPath: configPath,
    })

    config = (configStory as { content: ConfigStoryblok }).content

    const blocks = blok.body?.map((nestedBlok: NavDefaultStoryblok) => (
      <StoryblokServerComponent
        blok={nestedBlok}
        key={nestedBlok._uid}
        config={config}
      />
    ))

    return <ViewComponent blok={blok} blocks={blocks} config={config} />
  }
}
