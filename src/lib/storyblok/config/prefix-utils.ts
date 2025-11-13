import "server-only"

import type { ConfigStoryblok } from "@gotpop/system"

/** Get the content prefix from config */
export function getPrefix(config: ConfigStoryblok): string {
  return config?.root_name_space || "blog"
}
