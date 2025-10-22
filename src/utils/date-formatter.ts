/**
 * Formats a date string or Date object into a human-readable format
 * @param date - The date to format (string or Date object)
 * @param locale - The locale to use for formatting (defaults to "en-GB")
 * @returns Formatted date string
 */
export function formatDate(
  date: string | Date,
  locale: string = "en-GB"
): string {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
