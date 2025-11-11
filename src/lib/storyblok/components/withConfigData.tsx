import type { ConfigStoryblok } from "@gotpop/system"
import type { HeaderDefaultStoryblok } from "@/types/storyblok-components"
import { getStoryblokData } from "../data/get-storyblok-data"

interface WithConfigDataProps<T extends object> {
  blok: T
  config: ConfigStoryblok | null
  header: HeaderDefaultStoryblok
}

export function withConfigData<T extends object>(
  ViewComponent: React.ComponentType<WithConfigDataProps<T>>
) {
  return async ({ blok }: { blok: T }) => {
    let config: ConfigStoryblok | null = null

    const configPath = `blog/config`
    const { data: configStory } = await getStoryblokData("story", {
      fullPath: configPath,
    })

    const { data: headerData } = await getStoryblokData<HeaderDefaultStoryblok>(
      "storyByUuid",
      { uuid: "37cd2b08-ec1f-452f-a282-a9ffb21fa6eb" }
    )

    // log headerData for debugging
    console.log("Header Data:", JSON.stringify(headerData, null, 2))

    console.log(
      "[withConfigData] Fetched config data:",
      JSON.stringify(configStory, null, 2)
    )
    config = (configStory as { content: ConfigStoryblok }).content

    return (
      <ViewComponent blok={blok} config={config} header={headerData.content} />
    )
  }
}
