import "server-only"
import Link from "next/link"
import { IconChrome, IconEdge, IconFirefox, IconSafari } from "@/icons"
import type { BaselineStatusBlockStoryblok } from "@/types/storyblok-components"
import { formatMonthYear } from "@/utils/date-formatter"
import { getInlineStyles } from "@/utils/inline-styles"
import { Typography } from "../Typography"
import { fetchFeatureData } from "./api"
import { BaselineIcon } from "./BaselineIcon"
import { SupportStatusIcon } from "./SupportStatusIcon"
import { getStatusDisplay, normalizeFeatureName } from "./utils"

interface BaselineStatusBlockProps {
  blok: BaselineStatusBlockStoryblok
}

export async function BaselineStatusBlock({ blok }: BaselineStatusBlockProps) {
  const featureId = blok.feature

  if (!featureId) return null

  const data = await fetchFeatureData(featureId)
  const { name } = data

  const status = data.baseline?.status || "no_data"
  const { label, badgeText } = getStatusDisplay(status, data.baseline?.low_date)
  const styles = getInlineStyles("BaselineStatus.css")
  const normalizedName = normalizeFeatureName(name)

  const featureUrl = `https://github.com/web-platform-dx/web-features/blob/main/features/${featureId}.yml`

  const lowDateFormatted = data.baseline?.low_date
    ? formatMonthYear(data.baseline.low_date)
    : null

  const highDateFormatted = data.baseline?.high_date
    ? formatMonthYear(data.baseline.high_date)
    : null

  // Browser support status helpers
  const browserImpl = data.browser_implementations || {}
  // Map browser keys to display order and icon
  const browsers = [
    {
      key: "chrome" as keyof typeof browserImpl,
      label: "Chrome",
      Icon: IconChrome,
    },
    { key: "edge" as keyof typeof browserImpl, label: "Edge", Icon: IconEdge },
    {
      key: "firefox" as keyof typeof browserImpl,
      label: "Firefox",
      Icon: IconFirefox,
    },
    {
      key: "safari" as keyof typeof browserImpl,
      label: "Safari",
      Icon: IconSafari,
    },
  ]
  // Helper to get support status for icon
  function getSupportStatus(status: string | undefined, baseline: string) {
    if (baseline === "limited") {
      if (status === "available" || status === "widely" || status === "newly")
        return "available"
      if (status === "unavailable") return "unavailable"
      return "no_data"
    }
    if (baseline === "widely" || baseline === "newly") return "available"
    return "no_data"
  }

  return (
    <baseline-status className="baseline-status" data-status={status}>
      {styles && <style>{styles}</style>}
      <details>
        <summary>
          <div className="title">
            {normalizedName && (
              <h4 className="feature-name">{normalizedName}</h4>
            )}
          </div>
          <div className="feature-meta">
            <BaselineIcon status={status} />
            <strong>Baseline</strong>
            <span>{label}</span>
            {badgeText && <span className="baseline-badge">{badgeText}</span>}
          </div>
          <div className="baseline-status-browsers">
            {browsers.map(({ key, label, Icon }) => {
              const browserStatus = browserImpl[key]
              const support = getSupportStatus(browserStatus, status) as
                | "available"
                | "unavailable"
                | "no_data"
              return (
                <span
                  key={key}
                  className={`browser-icon browser-${key}`}
                  title={`${label}: ${support}`}
                >
                  <Icon />
                  <SupportStatusIcon status={support} />
                </span>
              )
            })}
          </div>
        </summary>
        <div className="content">
          {lowDateFormatted && status === "newly" && (
            <Typography tag="p" variant="text-base" shade="dark">
              Since {lowDateFormatted} this feature works across the latest
              devices and browser versions.
            </Typography>
          )}
          {highDateFormatted && status === "widely" && (
            <Typography tag="p" variant="text-base" shade="dark">
              It's been available across browsers since {highDateFormatted}.
            </Typography>
          )}
          <Link
            className="link-simple"
            href={featureUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </Link>
        </div>
      </details>
    </baseline-status>
  )
}
