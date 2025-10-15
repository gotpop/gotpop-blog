import { getInlineStyles } from "@/utils/inline-styles"

export default function IconHamburger() {
  const styles = getInlineStyles("IconHamburger.css")

  return (
    <span className="icon-hamburger">{styles && <style>{styles}</style>}</span>
  )
}
