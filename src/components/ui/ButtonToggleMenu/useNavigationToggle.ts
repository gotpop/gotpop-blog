import { useCallback, useEffect, useState } from "react"
import { MEDIA_QUERIES } from "@/constants/breakpoints"

export function useNavigationToggle(navId: string) {
  const [isExpanded, setIsExpanded] = useState(false)

  const closeMenu = useCallback(() => {
    const isDesktop = () => window.matchMedia(MEDIA_QUERIES.large).matches
    if (isDesktop()) return
    setIsExpanded(false)
  }, [])

  useEffect(() => {
    const navElement = document.getElementById(navId)
    if (!navElement) return

    const isDesktop = () => window.matchMedia(MEDIA_QUERIES.large).matches

    if (isDesktop()) {
      navElement.removeAttribute("aria-hidden")
    } else {
      navElement.setAttribute("aria-hidden", (!isExpanded).toString())
    }
  }, [navId, isExpanded])

  useEffect(() => {
    const navElement = document.getElementById(navId)
    if (!navElement) return

    const isDesktop = () => window.matchMedia(MEDIA_QUERIES.large).matches

    const handleResize = () => {
      if (isDesktop()) {
        setIsExpanded(true)
      }
    }

    if (isDesktop()) {
      setIsExpanded(true)
    } else {
      const isCurrentlyHidden =
        navElement.getAttribute("aria-hidden") === "true"
      setIsExpanded(!isCurrentlyHidden)
    }

    const mediaQuery = window.matchMedia(MEDIA_QUERIES.large)
    mediaQuery.addEventListener("change", handleResize)

    return () => mediaQuery.removeEventListener("change", handleResize)
  }, [navId])

  const toggleMenu = () => {
    const isDesktop = () => window.matchMedia(MEDIA_QUERIES.large).matches
    if (isDesktop()) return
    setIsExpanded(!isExpanded)
  }

  return { isExpanded, toggleMenu, closeMenu }
}
