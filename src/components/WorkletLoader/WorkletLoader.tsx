"use client"

import { gridWorkletCode } from "@/worklets/gridWorklet"
import { useWorkletFromCode } from "@/hooks/useWorkletFromCode"

export default function WorkletLoader() {
  useWorkletFromCode({
    workletCode: gridWorkletCode,
  })

  // This component renders nothing - it just loads the worklet
  return null
}
