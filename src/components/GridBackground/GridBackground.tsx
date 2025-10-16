"use client"

import { CSSProperties, ReactNode, useEffect } from "react"

import { gridWorkletCode } from "@/worklets/gridWorklet"
import { useWorkletFromCode } from "@/hooks/useWorkletFromCode"

interface GridBackgroundProps {
  children?: ReactNode
  className?: string
  style?: CSSProperties
  gridSize?: number
  gridGap?: number
  baseColor?: string
  verticalColor?: string
  horizontalColor?: string
  animationProgress?: number
  staggerDelay?: number
  evenOdd?: "even" | "odd"
  gridOffset?: "centre" | "left"
}

export default function GridBackground({
  children,
  className = "",
  style = {},
  gridSize = 32,
  gridGap = 1,
  baseColor = "rgb(200, 200, 200)",
  verticalColor = "rgb(150, 150, 150)",
  horizontalColor = "rgb(150, 150, 150)",
  animationProgress = 1,
  staggerDelay = 0,
  evenOdd = "even",
  gridOffset = "left",
  ...props
}: GridBackgroundProps) {
  const { isLoaded, error, isSupported } = useWorkletFromCode({
    workletCode: gridWorkletCode,
  })

  // Log worklet state changes
  useEffect(() => {
    console.log("🎯 GridBackground worklet state:", {
      isLoaded,
      isSupported,
      error: error?.message,
    })
  }, [isLoaded, isSupported, error])

  const gridStyle = {
    "--root-grid-size": `${gridSize}px`,
    "--grid-gap": `${gridGap}px`,
    "--grid-base-color": baseColor,
    "--grid-vertical-color": verticalColor,
    "--grid-horizontal-color": horizontalColor,
    "--animation-progress": animationProgress.toString(),
    "--stagger-delay": `${staggerDelay}ms`,
    "--even-odd": evenOdd,
    "--grid-offset": gridOffset,
    background:
      isLoaded && isSupported
        ? "paint(grid)"
        : `linear-gradient(90deg, ${baseColor} 1px, transparent 1px), linear-gradient(${baseColor} 1px, transparent 1px)`,
    backgroundSize:
      isLoaded && isSupported ? "auto" : `${gridSize}px ${gridSize}px`,
    ...style,
  } as CSSProperties

  // Enhanced error and fallback logging
  useEffect(() => {
    if (error) {
      console.warn("⚠️  Grid worklet failed to load:", error.message)
      console.log("🔄 Using CSS fallback background instead")
    } else if (isLoaded && isSupported) {
      console.log("✨ Using CSS Paint Worklet for grid background")
    } else if (!isSupported) {
      console.log("📱 Paint Worklet not supported, using CSS fallback")
    }
  }, [error, isLoaded, isSupported])

  return (
    <div
      className={`grid-background ${className}`}
      style={gridStyle}
      {...props}
    >
      {children}
    </div>
  )
}
