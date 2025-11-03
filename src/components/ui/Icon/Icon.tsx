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
import { FaSquareGithub } from "react-icons/fa6"
import { MdArticle } from "react-icons/md"
import { TfiGithub } from "react-icons/tfi"

/**
 * Icon registry - single source of truth for available icons.
 * Only icons listed here will be bundled (tree-shaking optimization).
 * Add new icons here and run `yarn sync-icons` to update Storyblok datasource.
 */
const ICON_REGISTRY = {
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
  FaSquareGithub,
  FaStar,
  FaTimes,
  FaUser,
  TfiGithub,
  MdArticle,
} as const

// Export for sync scripts and type generation
export const AVAILABLE_ICONS = Object.keys(ICON_REGISTRY) as Array<
  keyof typeof ICON_REGISTRY
>

// Type-safe icon names
export type IconName = keyof typeof ICON_REGISTRY

interface IconProps {
  name: IconName
  size?: number
  color?: string
  className?: string
}

export function Icon({ name, size = 24, color, className }: IconProps) {
  if (!name) {
    console.log("Invalid icon name:", JSON.stringify({ name }, null, 2))
    return null
  }

  const IconComponent = ICON_REGISTRY[name]

  if (!IconComponent) {
    console.log(
      "Font Awesome icon not found:",
      JSON.stringify({ name, availableIcons: AVAILABLE_ICONS }, null, 2)
    )
    // render a safe fallback so consumers still get an icon
    return <FaQuestionCircle size={size} color={color} className={className} />
  }

  return <IconComponent size={size} color={color} className={className} />
}
