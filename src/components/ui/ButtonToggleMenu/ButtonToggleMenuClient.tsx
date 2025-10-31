"use client"

import { useId, useState } from "react"

interface ButtonToggleMenuClientProps {
  styles?: string
}

export default function ButtonToggleMenuClient({
  styles,
}: ButtonToggleMenuClientProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const id = useId()

  const toggleMenu = () => {
    setIsExpanded(!isExpanded)
    // Add your menu toggle logic here
  }

  return (
    <div className="button-toggle-menu">
      {styles && <style>{styles}</style>}
      <button
        aria-controls="header-nav"
        aria-expanded={isExpanded}
        aria-haspopup="true"
        aria-label="Toggle navigation"
        className="button-toggle-menu"
        id={id}
        type="button"
        onClick={toggleMenu}
      >
        <icon-hamburger></icon-hamburger>
        <span hidden>Toggle navigation</span>
      </button>
    </div>
  )
}
