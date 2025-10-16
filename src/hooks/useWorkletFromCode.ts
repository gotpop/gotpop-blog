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
      console.log("🎨 Starting worklet loading process...")
      console.log(
        "📏 Worklet code preview:",
        workletCode.substring(0, 100) + "..."
      )

      const cssWithWorklet = CSS as unknown as {
        paintWorklet: { addModule(url: string): Promise<void> }
      }

      if (typeof window === "undefined") {
        console.warn("❌ Window is undefined - running on server")
        setError(new Error("Window is undefined"))
        return
      }

      if (!("CSS" in window)) {
        console.warn("❌ CSS not available in window")
        setError(new Error("CSS not available"))
        return
      }

      if (!("paintWorklet" in cssWithWorklet)) {
        console.warn("❌ Paint Worklet API not supported in this browser")
        setError(new Error("Paint Worklet not supported"))
        return
      }

      console.log("✅ Paint Worklet API is supported")

      try {
        console.log("📝 Creating blob from worklet code...")
        console.log("Worklet code length:", workletCode.length, "characters")

        // Create a blob URL from the worklet code
        const blob = new Blob([workletCode], { type: "application/javascript" })
        const workletUrl = URL.createObjectURL(blob)

        console.log("🔗 Created blob URL:", workletUrl)
        console.log("📦 Adding worklet module...")

        await cssWithWorklet.paintWorklet.addModule(workletUrl)

        console.log("🎉 Worklet loaded successfully!")
        setIsLoaded(true)

        // Clean up the blob URL
        URL.revokeObjectURL(workletUrl)
        console.log("🧹 Cleaned up blob URL")
      } catch (err) {
        console.error("💥 Failed to load worklet:", err)
        if (err instanceof Error) {
          console.error("Error message:", err.message)
          console.error("Error stack:", err.stack)
        }
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
