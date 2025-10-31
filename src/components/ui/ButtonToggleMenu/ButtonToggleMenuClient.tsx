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

  useEffect(() => {
    const navElement = document.getElementById(navId)
    if (!navElement) return

    const isDesktop = () => window.matchMedia("(width >= 1480px)").matches

    const handleResize = () => {
      if (isDesktop()) {
        navElement.removeAttribute("aria-hidden")
        setIsExpanded(true)
      } else {
        navElement.setAttribute("aria-hidden", (!isExpanded).toString())
      }
    }

    if (isDesktop()) {
      navElement.removeAttribute("aria-hidden")
      setIsExpanded(true)
    } else {
      const isCurrentlyHidden =
        navElement.getAttribute("aria-hidden") === "true"
      setIsExpanded(!isCurrentlyHidden)
    }

    const mediaQuery = window.matchMedia("(width >= 1480px)")
    mediaQuery.addEventListener("change", handleResize)

    return () => mediaQuery.removeEventListener("change", handleResize)
  }, [navId, isExpanded])

  const toggleMenu = () => {
    const isDesktop = () => window.matchMedia("(width >= 1480px)").matches

    if (isDesktop()) return

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
