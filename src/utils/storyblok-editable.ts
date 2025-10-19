import { type SbBlokData, storyblokEditable } from "@storyblok/react/rsc"

/**
 * Returns storyblok editable props only in development
 * In production, returns an empty object to disable Visual Editor
 */
export function getEditableProps(blok: SbBlokData) {
  if (process.env.NODE_ENV === "development") {
    return storyblokEditable(blok)
  }
  return {}
}
