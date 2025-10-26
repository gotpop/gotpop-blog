import "server-only"
import type { BaselineStatusBlockStoryblok } from "@/types/storyblok-components"
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
  const statusInfo = getStatusDisplay(status, data.baseline?.low_date)
  const styles = getInlineStyles("BaselineStatus.css")

  return (
    <baseline-status className="baseline-status" data-status={status}>
      {styles && <style>{styles}</style>}
      <details>
        <summary>
          {data.name && <div className="feature-name">{data.name}</div>}
          <BaselineIcon status={status} />
          <div className="baseline-status-title">
            <div>
              <strong>Baseline</strong> {statusInfo.label}
              {statusInfo.badgeText && (
                <span className="baseline-badge">{statusInfo.badgeText}</span>
              )}
            </div>
          </div>
        </summary>
        <div className="baseline-status-content">
          <p>{statusInfo.description}</p>
          {data.baseline?.low_date && status === "newly" && (
            <p>
              Since{" "}
              {new Date(data.baseline.low_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}{" "}
              this feature works across the latest devices and browser versions.
            </p>
          )}
          {data.baseline?.high_date && status === "widely" && (
            <p>
              It's been available across browsers since{" "}
              {new Date(data.baseline.high_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
              .
            </p>
          )}
          <p>
            <a
              href={`https://github.com/web-platform-dx/web-features/blob/main/features/${featureId}.yml`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
          </p>
        </div>
      </details>
    </baseline-status>
  )
}
