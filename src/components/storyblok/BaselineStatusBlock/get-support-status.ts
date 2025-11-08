export function getSupportStatus(
  status: string | undefined,
  baseline: string
): "available" | "unavailable" | "no_data" {
  if (baseline === "limited") {
    if (status === "available" || status === "widely" || status === "newly")
      return "available"
    if (status === "unavailable") return "unavailable"
    return "no_data"
  }
  if (baseline === "widely" || baseline === "newly") return "available"
  return "no_data"
}
