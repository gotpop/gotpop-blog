import IconLogo from "@/components/icons/IconLogo"
import type { LogoDefaultStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"
import { getStoryblokLinkProps } from "@/utils/storyblok"

interface LogoDefaultProps {
  blok: LogoDefaultStoryblok
}

export default function LogoDefault({ blok }: LogoDefaultProps) {
  const linkProps = getStoryblokLinkProps(blok.link)
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
        <IconLogo />
        <svg className="svg" width="45" height="45" viewBox="0 0 100 100">
          <title>GotPop Logo</title>
          <circle cx="75" cy="50" r="25" fill="oklch(1 0.4 100 / 0.5)" />
          <circle cx="62.5" cy="71.65" r="25" fill="oklch(1 0.4 150 / 0.5)" />
          <circle cx="37.5" cy="71.65" r="25" fill="oklch(1 0.4 200 / 0.5)" />

          <circle cx="25" cy="50" r="25" fill="oklch(1 0.4 250 / 0.5)" />
          <circle cx="37.5" cy="28.35" r="25" fill="oklch(1 0.4 300 / 0.5)" />
          <circle cx="62.5" cy="28.35" r="25" fill="oklch(1 0.4 350 / 0.5)" />
        </svg>
        <span className="logo-text">GotPop</span>
      </a>
    </logo-main>
  )
}
