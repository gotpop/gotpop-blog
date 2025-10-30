import type { ReactNode } from "react"
import { cn } from "@/utils/cn"

type ValidTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small" | "time"

type TypographyVariant =
  | "text-xs"
  | "text-sm"
  | "text-base"
  | "text-md"
  | "text-lg"
  | "text-xl"
  | "text-xxl"
  | "text-2xl"
  | "text-3xl"
  | "text-4xl"
  | "text-5xl"
  | "text-6xl"
  | "text-7xl"
  | "text-8xl"
  | "text-9xl"
  | "hero"

type FontWeight =
  | "weight-thin"
  | "weight-light"
  | "weight-regular"
  | "weight-medium"
  | "weight-semibold"
  | "weight-bold"
  | "weight-black"

type FontStyle = "style-normal" | "style-italic"

type TypographyShade = "light" | "dark" | "charcoal" | "dimmed"

interface TypographyProps {
  children: ReactNode
  tag: ValidTag
  shade?: TypographyShade
  variant?: TypographyVariant
  weight?: FontWeight
  style?: FontStyle
  className?: string
  id?: string
  dateTime?: string
}

export default function Typography({
  children,
  tag,
  shade,
  variant,
  weight,
  style,
  className = "",
  id = undefined,
  dateTime = undefined,
}: TypographyProps) {
  const validTags: ValidTag[] = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "small",
    "time",
  ]

  const elementTag: ValidTag = validTags.includes(tag.toLowerCase() as ValidTag)
    ? (tag.toLowerCase() as ValidTag)
    : "p"

  const Element = elementTag

  const shadeClass = shade || "light"

  const classNames = cn(
    "typography",
    shadeClass,
    variant,
    weight,
    style,
    className
  )

  return (
    <Element dateTime={dateTime} className={classNames} id={id}>
      {children}
    </Element>
  )
}
