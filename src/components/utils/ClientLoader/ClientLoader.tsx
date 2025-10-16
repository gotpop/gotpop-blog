"use client"

import { useClientLoader } from "@/hooks/useClientLoader"

export default function ClientLoader() {
  useClientLoader({
    name: "grid-worklet",
    type: "worklet",
    src: "/worklets/gridWorklet.js",
  })

  return null
}
