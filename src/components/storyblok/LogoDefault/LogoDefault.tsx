import Link from "next/link"
import ButtonToggleMenu from "@/components/ui/ButtonToggleMenu"
import type { LogoDefaultStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"
import { getStoryblokLinkProps } from "@/utils/storyblok"
import { getEditableProps } from "@/utils/storyblok-editable"

interface LogoDefaultProps {
  blok: LogoDefaultStoryblok
}

export default function LogoDefault({ blok }: LogoDefaultProps) {
  const linkProps = getStoryblokLinkProps(blok.link)
  const styles = getInlineStyles("LogoDefault.css")

  return (
    <div className="header-logo">
      <style>{styles}</style>
      <Link
        className="logo"
        href={linkProps.href}
        rel={linkProps.rel}
        target={linkProps.target}
        {...getEditableProps(blok)}
      >
        <figure className="logo" role="img" aria-label="GotPop Logo">
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
      </Link>
      <ButtonToggleMenu />
    </div>
  )
}
