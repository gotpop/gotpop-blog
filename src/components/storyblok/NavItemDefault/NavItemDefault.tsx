import Link from "next/link"
import Icon from "@/components/ui/Icon"
import type { IconName } from "@/components/ui/Icon/Icon"
import type { NavItemDefaultStoryblok } from "@/types/storyblok-components"
import { getStoryblokLinkProps } from "@/utils/storyblok"

interface NavItemDefaultProps {
  blok: NavItemDefaultStoryblok
}

export default function NavItemDefault({ blok }: NavItemDefaultProps) {
  const linkProps = getStoryblokLinkProps(blok.link)

  const { href, target, rel } = linkProps
  const withText = !blok.icon
  const withIcon = blok.icon && !blok.text
  const textAndIcon = blok.icon && blok.text

  if (!blok.link || href === "#") {
    return <span className="nav-item">{blok.text}</span>
  }

  const classNames = [
    "nav-item",
    withText && "with-text",
    withIcon && "with-icon",
    textAndIcon && "text-and-icon",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <Link href={href} target={target} rel={rel} className={classNames}>
      {withText
        ? blok.text
        : blok.icon && <Icon name={blok.icon as IconName} size={32} />}
    </Link>
  )
}
