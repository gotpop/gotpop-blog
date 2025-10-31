import { useEffect } from "react"

export function useClickOutside(
  navId: string,
  isActive: boolean = true,
  onClickOutside?: () => void
) {
  useEffect(() => {
    if (!isActive) return

    const handleClickOutside = (event: MouseEvent) => {
      const navElement = document.getElementById(navId)
      const buttonElement = document.querySelector(`[aria-controls="${navId}"]`)

      if (navElement && !navElement.contains(event.target as Node)) {
        // Don't trigger if clicking on the toggle button
        if (buttonElement?.contains(event.target as Node)) {
          return
        }

        if (onClickOutside) {
          onClickOutside()
        } else {
          const isCurrentlyHidden =
            navElement.getAttribute("aria-hidden") === "true"
          navElement.setAttribute(
            "aria-hidden",
            (!isCurrentlyHidden).toString()
          )
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [navId, isActive, onClickOutside])
}
