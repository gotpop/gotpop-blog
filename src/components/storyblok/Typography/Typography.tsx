import type { ReactNode } from "react"

// import { getInlineStyles } from "@/utils/inline-styles"

// import

type ValidTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small"

interface TypographyProps {
  children: ReactNode
  tag: ValidTag
  shade?: "light" | "dark"
  variant?: "sm" | "base" | "md" | "lg" | "xl" | "xxl" | "hero"
  className?: string
  id?: string
}

export default function Typography({
  children,
  tag,
  shade,
  variant,
  className = "",
  id = "",
}: TypographyProps) {
  // const styles = getInlineStyles("Typography.css")

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

  const shadeClass = shade === "dark" ? "dark" : "light"
  const variantClass = variant ? `variant-${variant}` : ""

  const classNames = [
    "typography-text",
    `typography-${elementTag}`,
    shadeClass,
    variantClass,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <Element className={classNames} id={id || undefined}>
      {/* {styles && <style>{styles}</style>} */}
      {children}
    </Element>
  )
}
