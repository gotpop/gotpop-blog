export interface StatusDisplayInfo {
  label: string
  description: string
  badgeText: string | null
  color: string
}

export function getStatusDisplay(
  status?: string,
  lowDate?: string
): StatusDisplayInfo {
  switch (status) {
    case "widely":
      return {
        label: "Widely available",
        description:
          "This feature is well established and works across many devices and browser versions.",
        badgeText: null,
        color: "green",
      }
    case "newly":
      return {
        label: `${lowDate ? new Date(lowDate).getFullYear() : "Recently"}`,
        description:
          "Since this date, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.",
        badgeText: "newly available",
        color: "blue",
      }
    case "limited":
      return {
        label: "Limited availability",
        description: "This feature is available in some browsers but not all.",
        badgeText: "limited",
        color: "orange",
      }
    default:
      return {
        label: "Unknown availability",
        description:
          "We currently don't have browser support information about this feature.",
        badgeText: null,
        color: "gray",
      }
  }
}

/**
 * Normalizes a feature name by removing hyphens and converting to sentence case
 * @param name - The feature name to normalize (e.g., "container-queries")
 * @returns Normalized name (e.g., "Container Queries") or null if input is null/undefined
 */
export function normalizeFeatureName(name?: string): string | null {
  return name
    ? name
        .split("-")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    : null
}
