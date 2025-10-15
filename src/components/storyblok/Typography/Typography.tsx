import { ReactNode } from "react"
import { getInlineStyles } from "@/utils/inline-styles"

type ValidTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small"

interface TypographyProps {
  children: ReactNode
  tag: string
  shade?: "light" | "dark"
  variant?: "jumbo" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "small"
}

export default function Typography({
  children,
  tag,
  shade,
  variant,
}: TypographyProps) {
  const styles = getInlineStyles("Typography.css")

  const validTags: ValidTag[] = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "small",
  ]

  const elementTag: ValidTag = validTags.includes(tag.toLowerCase() as ValidTag)
    ? (tag.toLowerCase() as ValidTag)
    : "p"

  const Element = elementTag

  // Build CSS custom properties based on props
  const customProperties: Record<string, string> = {
    ...(shade && { "--typography-shade": shade }),
    ...(variant && { "--typography-variant": variant }),
  }

  return (
    <Element
      className={`typography-text typography-${elementTag}`}
      style={customProperties}
    >
      {styles && <style>{styles}</style>}
      {children}
    </Element>
  )
}
