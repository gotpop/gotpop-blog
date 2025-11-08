import { CustomElement, Typography } from "@gotpop/system"
import { IconChrome, IconEdge, IconFirefox, IconSafari } from "../../icons"
import { BaselineIcon } from "./BaselineIcon"
import { SupportStatusIcon } from "./SupportStatusIcon"
import "./BaselineStatus.css"

export interface BaselineStatusData {
  featureId: string
  featureUrl: string
  normalizedName: string | null
  status: "widely" | "newly" | "limited" | "no_data"
  label: string
  badgeText: string | null
  lowDateFormatted: string | null
  highDateFormatted: string | null
  browsers: Array<{
    key: string
    label: string
    support: "available" | "unavailable" | "no_data"
  }>
}

interface BaselineStatusProps {
  data: BaselineStatusData
}

export function BaselineStatus({
  data,
}: BaselineStatusProps): React.JSX.Element {
  const {
    status,
    normalizedName,
    label,
    badgeText,
    browsers,
    lowDateFormatted,
    highDateFormatted,
    featureUrl,
  } = data

  const browserIcons = {
    chrome: IconChrome,
    edge: IconEdge,
    firefox: IconFirefox,
    safari: IconSafari,
  }

  return (
    <CustomElement tag="baseline-status" className="baseline-status">
      <details data-status={status}>
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
            {browsers.map(({ key, label, support }) => {
              const Icon =
                browserIcons[key as keyof typeof browserIcons] || IconChrome
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
          <a
            className="link-simple"
            href={featureUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </div>
      </details>
    </CustomElement>
  )
}
