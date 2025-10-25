import type { ReactNode } from "react"
import { getInlineStyles } from "@/utils/inline-styles"

interface HeroProps {
  children?: ReactNode
  className?: string
  variant?: "default" | "centered" | "minimal"
  id: string
}

export default function Hero({
  children,
  className,
  id,
  variant = "default",
}: HeroProps) {
  const styles = getInlineStyles("Hero.css")

  const classNames = [
    "hero",
    variant ? `hero--${variant}` : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section className={classNames} aria-labelledby={id}>
      {styles && <style>{styles}</style>}
      <div className="hero-content">{children}</div>
    </section>
  )
}
