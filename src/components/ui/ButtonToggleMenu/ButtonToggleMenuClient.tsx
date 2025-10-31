"use client"

import { useEffect, useId, useState } from "react"

interface ButtonToggleMenuClientProps {
  styles?: string
  navId: string
}

export default function ButtonToggleMenuClient({
  styles,
  navId,
}: ButtonToggleMenuClientProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const id = useId()

  // Sync initial state with nav element on mount
  useEffect(() => {
    const navElement = document.getElementById(navId)
    if (navElement) {
      const isCurrentlyHidden =
        navElement.getAttribute("aria-hidden") === "true"
      setIsExpanded(!isCurrentlyHidden)
    }
  }, [navId])

  const toggleMenu = () => {
    const newExpandedState = !isExpanded
    setIsExpanded(newExpandedState)

    const navElement = document.getElementById(navId)

    if (navElement) {
      navElement.setAttribute("aria-hidden", (!newExpandedState).toString())
    }
  }

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
