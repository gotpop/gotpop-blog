import type { BaselineStatusBlockStoryblok } from "../../../types/storyblok-components"
// import { formatMonthYear } from "../../../utils/date-formatter"
import { fetchFeatureData } from "./api"
import type { BaselineStatusData } from "./BaselineStatus"
import { BaselineStatus } from "./BaselineStatus"
import { getSupportStatus } from "./get-support-status"
import { getStatusDisplay, normalizeFeatureName } from "./utils"

interface BaselineStatusBlockProps {
  blok: BaselineStatusBlockStoryblok
}

export async function BaselineStatusBlock({
  blok,
}: BaselineStatusBlockProps): Promise<React.JSX.Element | null> {
  const featureId = blok.feature

  if (!featureId) return null

  const data = await fetchFeatureData(featureId)
  const { name } = data

  const status = data.baseline?.status || "no_data"
  const { label, badgeText } = getStatusDisplay(status, data.baseline?.low_date)
  const normalizedName = normalizeFeatureName(name)

  const featureUrl = `https://github.com/web-platform-dx/web-features/blob/main/features/${featureId}.yml`

  const lowDateFormatted = null
  const highDateFormatted = null

  const browserImpl = data.browser_implementations || {}

  const browserConfigs = [
    { key: "chrome" as const, label: "Chrome" },
    { key: "edge" as const, label: "Edge" },
    { key: "firefox" as const, label: "Firefox" },
    { key: "safari" as const, label: "Safari" },
  ]

  const browsers = browserConfigs.map(({ key, label }) => ({
    key,
    label,
    support: getSupportStatus(browserImpl[key], status),
  }))

  const viewData: BaselineStatusData = {
    featureId,
    featureUrl,
    normalizedName,
    status,
    label,
    badgeText,
    lowDateFormatted,
    highDateFormatted,
    browsers,
  }

  return <BaselineStatus data={viewData} />
}
