import Icon from "@/components/ui/Icon"
import type { IconName } from "@/components/ui/Icon/Icon"
import type { NavItemDefaultStoryblok } from "@/types/storyblok-components"
import { cn } from "@/utils/cn"
import { getStoryblokLinkProps } from "@/utils/storyblok"

interface NavItemDefaultProps {
  blok: NavItemDefaultStoryblok
}

export default function NavItemDefault({ blok }: NavItemDefaultProps) {
  const linkProps = getStoryblokLinkProps(blok.link)
  const { href, target, rel } = linkProps

  const hasText = Boolean(blok.text)
  const hasIcon = Boolean(blok.icon)
  const hasBoth = hasText && hasIcon
  const hasTextOnly = hasText && !hasIcon
  const hasIconOnly = hasIcon && !hasText

  if (!blok.link || href === "#") {
    return <span className="nav-item">{blok.text}</span>
  }

  const classNames = cn(
    "nav-item",
    hasTextOnly && "has-text",
    hasIconOnly && "has-icon",
    hasBoth && "has-text-and-icon"
  )

  const renderContent = () => {
    if (hasBoth) {
      return (
        <>
          <span>{blok.text}</span>
          <Icon name={blok.icon as IconName} size={32} />
        </>
      )
    }

    if (hasTextOnly) {
      return blok.text
    }

    if (hasIconOnly) {
      return <Icon name={blok.icon as IconName} size={32} />
    }

    return null
  }

  return (
    <a href={href} target={target} rel={rel} className={classNames}>
      {renderContent()}
    </a>
  )
}
