"use client"

import { gridWorkletCode } from "@/worklets/gridWorklet"
import { useEffect } from "react"
import { useWorkletFromCode } from "@/hooks/useWorkletFromCode"

export default function WorkletLoader() {
  const { isLoaded, error, isSupported } = useWorkletFromCode({
    workletCode: gridWorkletCode,
  })

  // Log worklet state changes
  useEffect(() => {
    console.log("🎯 WorkletLoader state:", {
      isLoaded,
      isSupported,
      error: error?.message,
    })
  }, [isLoaded, isSupported, error])

  // Enhanced error and status logging
  useEffect(() => {
    if (error) {
      console.warn("⚠️  Grid worklet failed to load:", error.message)
    } else if (isLoaded && isSupported) {
      console.log(
        "✨ Grid worklet loaded - you can now use background: paint(grid) in CSS"
      )
    } else if (!isSupported) {
      console.log("📱 Paint Worklet not supported in this browser")
    }
  }, [error, isLoaded, isSupported])

  // This component renders nothing - it just loads the worklet
  return null
}
