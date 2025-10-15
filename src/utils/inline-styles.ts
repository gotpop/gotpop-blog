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
 * - Non-Storyblok: src/components/IconHamburger/IconHamburger.css
 *
 * @param cssFileName - The CSS filename (e.g., "NavDefault.css")
 * @returns The CSS content as a string
 */
export function getInlineStyles(cssFileName: string): string {
  try {
    const componentsPath = path.join(process.cwd(), "src", "components")
    const storyblokPath = path.join(componentsPath, "storyblok")
    const componentName = cssFileName.replace(".css", "")

    // Try these paths in order:
    const possiblePaths = [
      // 1. Flat in storyblok directory
      path.join(storyblokPath, cssFileName),
      // 2. Directory in storyblok
      path.join(storyblokPath, componentName, cssFileName),
      // 3. Directory in components root
      path.join(componentsPath, componentName, cssFileName),
    ]

    for (const cssPath of possiblePaths) {
      if (fs.existsSync(cssPath)) {
        const cssContent = fs.readFileSync(cssPath, "utf-8")
        return cssContent
      }
    }

    console.warn(`CSS file not found: ${cssFileName}`)
    return ""
  } catch (error) {
    console.warn(`Failed to read CSS file: ${cssFileName}`, error)
    return ""
  }
}
