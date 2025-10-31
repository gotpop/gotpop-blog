import { useEffect, useState } from "react"
import { MEDIA_QUERIES } from "@/constants/breakpoints"

export function useNavigationToggle(navId: string) {
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const navElement = document.getElementById(navId)
    if (!navElement) return

    const isDesktop = () => window.matchMedia(MEDIA_QUERIES.large).matches

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

    const mediaQuery = window.matchMedia(MEDIA_QUERIES.large)
    mediaQuery.addEventListener("change", handleResize)

    return () => mediaQuery.removeEventListener("change", handleResize)
  }, [navId, isExpanded])

  const toggleMenu = () => {
    const isDesktop = () => window.matchMedia(MEDIA_QUERIES.large).matches

    if (isDesktop()) return

    const newExpandedState = !isExpanded
    setIsExpanded(newExpandedState)

    const navElement = document.getElementById(navId)
    if (navElement) {
      navElement.setAttribute("aria-hidden", (!newExpandedState).toString())
    }
  }

  return { isExpanded, toggleMenu }
}
