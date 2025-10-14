import "server-only"
import fs from "fs"
import path from "path"

/**
 * Read a CSS file from the file system (server-side only)
 * Returns the CSS content as a string to be used in a <style> tag
 *
 * Supports both flat and directory structures:
 * - Flat: src/components/storyblok/NavDefault.css
 * - Directory: src/components/storyblok/NavDefault/NavDefault.css
 *
 * @param cssFileName - The CSS filename (e.g., "NavDefault.css")
 * @returns The CSS content as a string
 */
export function getInlineStyles(cssFileName: string): string {
  try {
    const basePath = path.join(process.cwd(), "src", "components", "storyblok")

    // Try flat structure first (file in storyblok directory)
    let cssPath = path.join(basePath, cssFileName)

    if (!fs.existsSync(cssPath)) {
      // Try directory structure (file in component subdirectory)
      const componentName = cssFileName.replace(".css", "")
      cssPath = path.join(basePath, componentName, cssFileName)
    }

    if (!fs.existsSync(cssPath)) {
      console.warn(`CSS file not found: ${cssFileName}`)
      return ""
    }

    const cssContent = fs.readFileSync(cssPath, "utf-8")
    return cssContent
  } catch (error) {
    console.warn(`Failed to read CSS file: ${cssFileName}`, error)
    return ""
  }
}
