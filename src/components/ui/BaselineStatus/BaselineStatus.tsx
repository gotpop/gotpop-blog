import "server-only"
import { getInlineStyles } from "@/utils/inline-styles"

interface BaselineData {
  name?: string
  description?: string
  baseline?: {
    status: "widely" | "newly" | "limited" | "no_data"
    high_date?: string
    low_date?: string
  }
  browser_implementations?: {
    chrome?: string
    chrome_android?: string
    edge?: string
    firefox?: string
    firefox_android?: string
    safari?: string
    safari_ios?: string
  }
}

interface BaselineStatusProps {
  featureId: string
  className?: string
}

async function fetchFeatureData(featureId: string): Promise<BaselineData> {
  try {
    const response = await fetch(
      `https://api.webstatus.dev/v1/features/${featureId}`,
      {
        headers: {
          "User-Agent": "gotpop-blog-baseline-status/1.0",
        },
        // Cache for 24 hours
        next: { revalidate: 86400 },
      }
    )

    if (!response.ok) {
      console.warn(
        `Failed to fetch baseline data for ${featureId}: ${response.status}`
      )
      return {}
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching baseline data for ${featureId}:`, error)
    return {}
  }
}

function getStatusDisplay(status?: string, lowDate?: string) {
  switch (status) {
    case "widely":
      return {
        label: "Widely available",
        description:
          "This feature is well established and works across many devices and browser versions.",
        badgeText: null,
        color: "green",
      }
    case "newly":
      return {
        label: `${lowDate ? new Date(lowDate).getFullYear() : "Recently"}`,
        description:
          "Since this date, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.",
        badgeText: "newly available",
        color: "blue",
      }
    case "limited":
      return {
        label: "Limited availability",
        description: "This feature is available in some browsers but not all.",
        badgeText: "limited",
        color: "orange",
      }
    default:
      return {
        label: "Unknown availability",
        description:
          "We currently don't have browser support information about this feature.",
        badgeText: null,
        color: "gray",
      }
  }
}

function BaselineIcon({ status = "no_data" }: { status?: string }) {
  const iconPaths = {
    widely: (
      <>
        <path
          fill="var(--baseline-icon-widely-front)"
          d="M18 8L20 10L18 12L16 10L18 8Z"
        />
        <path
          fill="var(--baseline-icon-widely-front)"
          d="M26 0L28 2L10 20L0 10L2 8L10 16L26 0Z"
        />
        <path
          fill="var(--baseline-icon-widely-back)"
          d="M28 2L26 4L32 10L26 16L22 12L20 14L26 20L36 10L28 2Z"
        />
        <path
          fill="var(--baseline-icon-widely-back)"
          d="M10 0L2 8L4 10L10 4L14 8L16 6L10 0Z"
        />
      </>
    ),
    newly: (
      <>
        <path
          fill="var(--baseline-icon-newly-back)"
          d="m10 0 2 2-2 2-2-2 2-2Zm4 4 2 2-2 2-2-2 2-2Zm16 0 2 2-2 2-2-2 2-2Zm4 4 2 2-2 2-2-2 2-2Zm-4 4 2 2-2 2-2-2 2-2Zm-4 4 2 2-2 2-2-2 2-2Zm-4-4 2 2-2 2-2-2 2-2ZM6 4l2 2-2 2-2-2 2-2Z"
        />
        <path
          fill="var(--baseline-icon-newly-front)"
          d="m26 0 2 2-18 18L0 10l2-2 8 8L26 0Z"
        />
      </>
    ),
    limited: (
      <>
        <path
          fill="var(--baseline-icon-limited-front)"
          d="M10 0L16 6L14 8L8 2L10 0Z"
        />
        <path
          fill="var(--baseline-icon-limited-front)"
          d="M22 12L20 14L26 20L28 18L22 12Z"
        />
        <path
          fill="var(--baseline-icon-limited-front)"
          d="M26 0L28 2L10 20L8 18L26 0Z"
        />
        <path
          fill="var(--baseline-icon-limited-back)"
          d="M8 2L10 4L4 10L10 16L8 18L0 10L8 2Z"
        />
        <path
          fill="var(--baseline-icon-limited-back)"
          d="M28 2L36 10L28 18L26 16L32 10L26 4L28 2Z"
        />
      </>
    ),
    no_data: (
      <>
        <path
          fill="var(--baseline-icon-no_data)"
          d="M18 8L20 10L18 12L16 10L18 8Z"
        />
        <path
          fill="var(--baseline-icon-no_data)"
          d="M28 2L26 4L32 10L26 16L22 12L20 14L26 20L36 10L28 2Z"
        />
        <path
          fill="var(--baseline-icon-no_data)"
          d="M10 0L2 8L4 10L10 4L14 8L16 6L10 0Z"
        />
        <path
          fill="var(--baseline-icon-no_data)"
          d="M26 0L28 2L10 20L0 10L2 8L10 16L26 0Z"
        />
      </>
    ),
  }

  return (
    <svg
      viewBox="0 0 36 20"
      width="36"
      height="20"
      style={{ display: "inline-block" }}
      aria-hidden="true"
    >
      {iconPaths[status as keyof typeof iconPaths] || iconPaths.no_data}
    </svg>
  )
}

export default async function BaselineStatus({
  featureId,
  className,
}: BaselineStatusProps) {
  const data = await fetchFeatureData(featureId)
  const status = data.baseline?.status || "no_data"
  const statusInfo = getStatusDisplay(status, data.baseline?.low_date)
  const styles = getInlineStyles("BaselineStatus.css")

  return (
    <div className={`baseline-status ${className || ""}`} data-status={status}>
      {styles && <style>{styles}</style>}
      {data.name && <div className="feature-name">{data.name}</div>}
      <details>
        <summary>
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
    </div>
  )
}
