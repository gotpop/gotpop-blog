import type { ReactNode } from "react"
import { getInlineStyles } from "@/utils/inline-styles"

interface BoxGridProps {
  children: ReactNode
  className?: string
}

export default function BoxGrid({ children, className }: BoxGridProps) {
  const styles = getInlineStyles("BoxGrid.css")

  return (
    <div className={className}>
      {styles && <style>{styles}</style>}
      {children}
    </div>
  )
}
