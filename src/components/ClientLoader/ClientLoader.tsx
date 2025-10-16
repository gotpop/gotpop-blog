"use client"

import { gridWorkletCode } from "@/worklets/gridWorklet"
import { useClientLoader } from "@/hooks/useClientLoader"

export default function ClientLoader() {
  useClientLoader({
    name: "grid-worklet",
    type: "worklet",
    code: gridWorkletCode,
  })

  return null
}
