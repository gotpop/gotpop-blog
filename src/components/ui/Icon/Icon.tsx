import {
  FaBars,
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaExternalLinkAlt,
  FaHome,
  FaLink,
  FaPhone,
  FaQuestionCircle,
  FaSearch,
  FaStar,
  FaTimes,
  FaUser,
} from "react-icons/fa"

interface IconProps {
  name: string // e.g., "FaHome" (Font Awesome icon name)
  size?: number
  color?: string
  className?: string
}

/**
 * Explicit icon map prevents dynamic namespace access which can prevent tree-shaking.
 * Add any additional icons you need to the ICONS object above.
 */
const ICONS: Record<
  string,
  React.ComponentType<{ size?: number; color?: string; className?: string }>
> = {
  FaHome,
  FaUser,
  FaSearch,
  FaTimes,
  FaBars,
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaPhone,
  FaLink,
  FaExternalLinkAlt,
  FaQuestionCircle,
  FaStar,
}

export default function Icon({ name, size = 24, color, className }: IconProps) {
  if (!name) {
    console.log("Invalid icon name:", JSON.stringify({ name }, null, 2))
    return null
  }

  const IconComponent = ICONS[name]

  if (!IconComponent) {
    console.log(
      "Font Awesome icon not found:",
      JSON.stringify({ name }, null, 2)
    )
    // render a safe fallback so consumers still get an icon
    return <FaQuestionCircle size={size} color={color} className={className} />
  }

  return <IconComponent size={size} color={color} className={className} />
}
