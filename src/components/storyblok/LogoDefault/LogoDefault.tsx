import { IconLogoSVG } from "@/icons"
import type { LogoDefaultStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"
import { getStoryblokLinkProps } from "@/utils/storyblok"

interface LogoDefaultProps {
  blok: LogoDefaultStoryblok
}

export function LogoDefault({ blok: { link } }: LogoDefaultProps) {
  const linkProps = getStoryblokLinkProps(link)
  const styles = getInlineStyles("LogoDefault.css")

  return (
    <logo-main>
      <style>{styles}</style>
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
