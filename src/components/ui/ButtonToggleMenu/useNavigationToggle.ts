import { useCallback, useEffect, useState } from "react"
import { MEDIA_QUERIES } from "@/constants/breakpoints"
import { useMediaQuery } from "@/hooks/useMediaQuery"

export function useNavigationToggle(navId: string) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isDesktop = useMediaQuery(MEDIA_QUERIES.large)

  const closeMenu = useCallback(() => {
    if (isDesktop) return

    setIsExpanded(false)
  }, [isDesktop])

  useEffect(() => {
    const navElement = document.getElementById(navId)

    if (!navElement) return

    if (isDesktop) {
      navElement.removeAttribute("aria-hidden")
      navElement.removeAttribute("hidden")
    } else {
      const isHidden = !isExpanded
      navElement.setAttribute("aria-hidden", isHidden.toString())

      if (isHidden) {
        navElement.setAttribute("hidden", "")
      } else {
        navElement.removeAttribute("hidden")
      }
    }
  }, [navId, isExpanded, isDesktop])

  useEffect(() => {
    if (isDesktop) {
      setIsExpanded(true)
    } else {
      setIsExpanded(false)
    }
  }, [isDesktop])

  const toggleMenu = () => {
    if (isDesktop) return

    setIsExpanded(!isExpanded)
  }

  return { isExpanded, toggleMenu, closeMenu }
}
