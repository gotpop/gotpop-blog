interface IconLogoSVGProps {
  width?: number
  height?: number
  className?: string
}

export function IconLogoSVG({
  width = 45,
  height = 45,
  className = "svg morphing-logo",
}: IconLogoSVGProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 100 100"
    >
      <title>GotPop Logo</title>
      <rect
        className="morph-shape shape-1"
        x="50"
        y="25"
        width="50"
        height="50"
        rx="25"
        ry="25"
        fill="oklch(1 0.4 100 / 0.5)"
      />
      <rect
        className="morph-shape shape-2"
        x="37.5"
        y="46.65"
        width="50"
        height="50"
        rx="25"
        ry="25"
        fill="oklch(1 0.4 150 / 0.5)"
      />
      <rect
        className="morph-shape shape-3"
        x="12.5"
        y="46.65"
        width="50"
        height="50"
        rx="25"
        ry="25"
        fill="oklch(1 0.4 200 / 0.5)"
      />
      <rect
        className="morph-shape shape-4"
        x="0"
        y="25"
        width="50"
        height="50"
        rx="25"
        ry="25"
        fill="oklch(1 0.4 250 / 0.5)"
      />
      <rect
        className="morph-shape shape-5"
        x="12.5"
        y="3.35"
        width="50"
        height="50"
        rx="25"
        ry="25"
        fill="oklch(1 0.4 300 / 0.5)"
      />
      <rect
        className="morph-shape shape-6"
        x="37.5"
        y="3.35"
        width="50"
        height="50"
        rx="25"
        ry="25"
        fill="oklch(1 0.4 350 / 0.5)"
      />
    </svg>
  )
}
