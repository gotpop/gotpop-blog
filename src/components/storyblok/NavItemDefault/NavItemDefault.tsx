import { storyblokEditable } from "@storyblok/react/rsc"
import Link from "next/link"
import type { NavItemDefaultStoryblok } from "@/types/storyblok-components"
import { getStoryblokLinkProps } from "@/utils/storyblok"

interface NavItemDefaultProps {
  blok: NavItemDefaultStoryblok
}

export default function NavItemDefault({ blok }: NavItemDefaultProps) {
  const linkProps = getStoryblokLinkProps(blok.link)

  if (!blok.link || linkProps.href === "#") {
    return (
      <span {...storyblokEditable(blok)} className="nav-item">
        {blok.text}
      </span>
    )
  }

  return (
    <Link
      href={linkProps.href}
      target={linkProps.target}
      rel={linkProps.rel}
      {...storyblokEditable(blok)}
      className="nav-item"
    >
      {blok.text}
    </Link>
  )
}
