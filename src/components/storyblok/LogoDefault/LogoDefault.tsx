import IconLogo from "@/components/icons/IconLogo"
import ButtonToggleMenu from "@/components/ui/ButtonToggleMenu"
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
        {/* <div className="logo" role="img" aria-label="GotPop Logo"> */}
        <IconLogo />
        <span className="logo-text">GotPop</span>
        {/* </div> */}
      </a>
      <ButtonToggleMenu />
    </logo-main>
  )
}
