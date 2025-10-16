"use client"

import { useEffect, useState } from "react"

export type ClientLoaderType = "worklet" | "script"

interface UseClientLoaderOptions {
  name: string
  type: ClientLoaderType
  code: string
  onLoad?: () => void
  onError?: (error: Error) => void
}

interface LoaderState {
  isLoaded: boolean
  isLoading: boolean
  error: Error | null
  isSupported: boolean
}

export function useClientLoader({
  name,
  type,
  code,
  onLoad,
  onError,
}: UseClientLoaderOptions): LoaderState {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Check if the environment supports the requested loader type
  const isSupported = (() => {
    if (typeof window === "undefined") return false

    switch (type) {
      case "worklet":
        const cssWithWorklet = CSS as unknown as {
          paintWorklet?: { addModule(url: string): Promise<void> }
        }
        return (
          "CSS" in window && cssWithWorklet && "paintWorklet" in cssWithWorklet
        )

      case "script":
        return true // Scripts are always supported in browser

      default:
        return false
    }
  })()

  useEffect(() => {
    if (!isSupported) {
      const unsupportedError = new Error(
        `${type} is not supported in this environment`
      )
      setError(unsupportedError)
      onError?.(unsupportedError)
      return
    }

    async function loadCode() {
      setIsLoading(true)
      setError(null)

      try {
        const blob = new Blob([code], { type: "application/javascript" })
        const codeUrl = URL.createObjectURL(blob)

        switch (type) {
          case "worklet": {
            const cssWithWorklet = CSS as unknown as {
              paintWorklet: { addModule(url: string): Promise<void> }
            }
            await cssWithWorklet.paintWorklet.addModule(codeUrl)
            break
          }

          case "script": {
            // Create and execute script tag
            const script = document.createElement("script")
            script.src = codeUrl

            await new Promise<void>((resolve, reject) => {
              script.onload = () => resolve()
              script.onerror = () =>
                reject(new Error(`Failed to load script: ${name}`))
              document.head.appendChild(script)
            })

            // Clean up script tag
            document.head.removeChild(script)
            break
          }

          default:
            throw new Error(`Unsupported loader type: ${type}`)
        }

        setIsLoaded(true)
        onLoad?.()

        // Clean up blob URL
        URL.revokeObjectURL(codeUrl)
      } catch (err) {
        const loadError =
          err instanceof Error
            ? err
            : new Error(`Failed to load ${type}: ${name}`)
        setError(loadError)
        onError?.(loadError)
      } finally {
        setIsLoading(false)
      }
    }

    loadCode()
  }, [name, type, code, isSupported, onLoad, onError])

  return {
    isLoaded,
    isLoading,
    error,
    isSupported,
  }
}
