"use client"

import type { StoryblokBridgeEvent } from "@/types"
import { useEffect } from "react"

export function StoryblokBridge() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const checkBridge = setInterval(() => {
      if (window.storyblok) {
        clearInterval(checkBridge)

        window.storyblok.init({
          accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
        })

        window.storyblok.on(
          ["input", "published", "change"],
          (event: StoryblokBridgeEvent) => {
            if (event.action === "input") {
              window.location.reload()
            } else if (
              event.action === "change" ||
              event.action === "published"
            ) {
              window.location.reload()
            }
          }
        )

        window.storyblok.pingEditor(() => {
          if (window.storyblok?.inEditor) {
            window.storyblok.enterEditmode()
          }
        })
      }
    }, 100)

    return () => {
      clearInterval(checkBridge)
      if (window.storyblok) {
        window.storyblok.off(["input", "published", "change"])
      }
    }
  }, [])

  return null
}
