import styles from "!!raw-loader!./LogoDefault.css"
import { IconLogoSVG } from "@/icons"
import type { LogoDefaultStoryblok } from "@/types/storyblok-components"
import { getStoryblokLinkProps } from "@/utils/storyblok"

interface LogoDefaultProps {
  blok: LogoDefaultStoryblok
}

export function LogoDefault({ blok: { link } }: LogoDefaultProps) {
  const linkProps = getStoryblokLinkProps(link)

  return (
    <logo-main>
      {styles && <style>{styles}</style>}
      <a
        className="link-logo"
        href={linkProps.href}
        rel={linkProps.rel}
        target={linkProps.target}
      >
        <IconLogoSVG />
        <span className="logo-text">GotPop</span>
      </a>
    </logo-main>
  )
}
