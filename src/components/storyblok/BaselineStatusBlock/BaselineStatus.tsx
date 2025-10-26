import "server-only"
import Link from "next/link"
import type { BaselineStatusBlockStoryblok } from "@/types/storyblok-components"
import { formatMonthYear } from "@/utils/date-formatter"
import { getInlineStyles } from "@/utils/inline-styles"
import { fetchFeatureData } from "./api"
import BaselineIcon from "./BaselineIcon"
import { getStatusDisplay } from "./utils"

interface BaselineStatusBlockProps {
  blok: BaselineStatusBlockStoryblok
}

export default async function BaselineStatusBlock({
  blok,
}: BaselineStatusBlockProps) {
  const featureId = blok.feature

  if (!featureId) return null

  const data = await fetchFeatureData(featureId)
  const status = data.baseline?.status || "no_data"
  const { label, description, badgeText } = getStatusDisplay(
    status,
    data.baseline?.low_date
  )
  const styles = getInlineStyles("BaselineStatus.css")

  const featureUrl = `https://github.com/web-platform-dx/web-features/blob/main/features/${featureId}.yml`

  const lowDateFormatted = data.baseline?.low_date
    ? formatMonthYear(data.baseline.low_date)
    : null

  const highDateFormatted = data.baseline?.high_date
    ? formatMonthYear(data.baseline.high_date)
    : null

  return (
    <baseline-status className="baseline-status" data-status={status}>
      {styles && <style>{styles}</style>}
      <details>
        <summary>
          {data.name && <div className="feature-name">{data.name}</div>}
          <BaselineIcon status={status} />
          <div className="baseline-status-title">
            <div>
              <strong>Baseline</strong> {label}
              {badgeText && <span className="baseline-badge">{badgeText}</span>}
            </div>
          </div>
        </summary>
        <div className="baseline-status-content">
          <p>{description}</p>
          {lowDateFormatted && status === "newly" && (
            <p>
              Since {lowDateFormatted} this feature works across the latest
              devices and browser versions.
            </p>
          )}
          {highDateFormatted && status === "widely" && (
            <p>
              It's been available across browsers since {highDateFormatted}.
            </p>
          )}
          <p>
            <Link href={featureUrl} target="_blank" rel="noopener noreferrer">
              Learn more
            </Link>
          </p>
        </div>
      </details>
    </baseline-status>
  )
}
