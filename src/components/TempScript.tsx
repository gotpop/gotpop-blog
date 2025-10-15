"use client"

import { useEffect } from "react"

export default function TempScript() {
  useEffect(() => {
    // Import and run your main.js file
    import("@/scripts/main.js")
      .then(() => {
        console.log("Temp script (main.js) loaded successfully")
      })
      .catch((error) => {
        console.error("Failed to load temp script:", error)
      })
  }, [])

  return null // No visual output
}
