import "server-only"

import type { StoryblokClient } from "@storyblok/react/rsc"
import type { DatasourceEntriesConfig, StoryblokDataResult } from "../../types"

/** Fetches entries from a Storyblok datasource */
export async function handleDatasourceEntries(
  storyblokApi: StoryblokClient,
  config: DatasourceEntriesConfig
): Promise<StoryblokDataResult> {
  const { datasource } = config
  const response = await storyblokApi.get("cdn/datasource_entries", {
    datasource,
  })

  return { data: response.data.datasource_entries || [] }
}
