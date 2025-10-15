import Link from "next/link"
import { LogoDefaultStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"
import { getStoryblokLinkProps } from "@/utils/storyblok"
import { storyblokEditable } from "@storyblok/react/rsc"

interface LogoDefaultProps {
  blok: LogoDefaultStoryblok
}

export default function LogoDefault({ blok }: LogoDefaultProps) {
  const linkProps = getStoryblokLinkProps(blok.link)
  const styles = getInlineStyles("LogoDefault.css")

  return (
    <Link
      className="logo"
      href={linkProps.href}
      rel={linkProps.rel}
      target={linkProps.target}
      {...storyblokEditable(blok)}
    >
      <div>
        <figure className="logo" role="img" aria-label="GotPop Logo">
          <style>{styles}</style>
          <style></style>
          <div className="circles">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
          <span className="logo-text">GotPop</span>
        </figure>
        <button
          aria-controls="header-nav"
          aria-expanded="false"
          aria-haspopup="true"
          aria-label="Toggle navigation"
          className="button-toggle-menu"
          id="header-toggle"
          type="button"
          data-click-listener-added="true"
        >
          <div id="header-toggle-icon" aria-hidden="true">
            X
          </div>
          <span hidden>Toggle navigation</span>
        </button>
      </div>
    </Link>
  )
}
