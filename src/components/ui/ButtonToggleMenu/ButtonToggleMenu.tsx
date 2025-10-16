import { useId } from "react"
import IconHamburger from "@/components/icons/IconHamburger"
import { getInlineStyles } from "@/utils/inline-styles"

export default function ButtonToggleMenu() {
  const styles = getInlineStyles("ButtonToggleMenu.css")
  const id = useId()

  return (
    <div className="button-toggle-menu">
      {styles && <style>{styles}</style>}
      <button
        aria-controls="header-nav"
        aria-expanded="false"
        aria-haspopup="true"
        aria-label="Toggle navigation"
        className="button-toggle-menu"
        id={id}
        type="button"
        data-click-listener-added="true"
      >
        <IconHamburger />
        <span hidden>Toggle navigation</span>
      </button>
    </div>
  )
}
