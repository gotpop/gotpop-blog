"use client"

import { useEffect, useState } from "react"

interface UseWorkletFromCodeOptions {
  workletCode: string
}

export function useWorkletFromCode({ workletCode }: UseWorkletFromCodeOptions) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadWorklet() {
      const cssWithWorklet = CSS as unknown as {
        paintWorklet: { addModule(url: string): Promise<void> }
      }

      if (typeof window === "undefined") {
        setError(new Error("Window is undefined"))
        return
      }

      if (!("CSS" in window)) {
        setError(new Error("CSS not available"))
        return
      }

      if (!("paintWorklet" in cssWithWorklet)) {
        setError(new Error("Paint Worklet not supported"))
        return
      }

      try {
        const blob = new Blob([workletCode], { type: "application/javascript" })
        const workletUrl = URL.createObjectURL(blob)

        await cssWithWorklet.paintWorklet.addModule(workletUrl)
        setIsLoaded(true)

        URL.revokeObjectURL(workletUrl)
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load worklet")
        )
      }
    }

    loadWorklet()
  }, [workletCode])

  const cssWithWorklet =
    typeof window !== "undefined"
      ? (CSS as unknown as {
          paintWorklet: { addModule(url: string): Promise<void> }
        })
      : null
  const isSupported =
    typeof window !== "undefined" &&
    "CSS" in window &&
    cssWithWorklet &&
    "paintWorklet" in cssWithWorklet

  return { isLoaded, error, isSupported }
}
