"use client"

import { useId } from "react"
import { useNavigationToggle } from "./useNavigationToggle"

interface ButtonToggleMenuClientProps {
  styles?: string
  navId: string
}

export default function ButtonToggleMenuClient({
  styles,
  navId,
}: ButtonToggleMenuClientProps) {
  const { isExpanded, toggleMenu } = useNavigationToggle(navId)
  const id = useId()

  return (
    <button-toggle>
      {styles && <style>{styles}</style>}
      <button
        aria-controls={navId}
        aria-expanded={isExpanded}
        aria-haspopup="true"
        aria-label="Toggle navigation"
        id={id}
        onClick={toggleMenu}
        type="button"
      >
        <icon-hamburger></icon-hamburger>
        <span hidden>Toggle navigation</span>
      </button>
    </button-toggle>
  )
}
