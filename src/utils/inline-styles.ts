import "server-only"

import fs from "node:fs"
import path from "node:path"

/**
 * Read a CSS file from the file system (server-side only)
 * Returns the CSS content as a string to be used in a <style> tag
 *
 * Supports organized component structure:
 * - Storyblok: src/components/storyblok/ComponentName/ComponentName.css
 * - UI: src/components/ui/ComponentName/ComponentName.css
 * - Icons: src/components/icons/ComponentName/ComponentName.css
 * - Utils: src/components/utils/ComponentName/ComponentName.css
 * - Snippets: src/components/snippets/ComponentName/ComponentName.css
 * - Legacy flat: src/components/storyblok/ComponentName.css
 * - Explicit path: "DirectoryName/FileName.css" (searches in storyblok/)
 *
 * @param cssFileName - The CSS filename (e.g., "ButtonToggleMenu.css") or explicit path (e.g., "BaselineStatusBlock/BaselineStatus.css")
 * @returns The CSS content as a string
 */
export function getInlineStyles(cssFileName: string): string {
  try {
    const componentsPath = path.join(process.cwd(), "src", "components")

    // Handle explicit paths like "BaselineStatusBlock/BaselineStatus.css"
    if (cssFileName.includes("/")) {
      const explicitPath = path.join(componentsPath, "storyblok", cssFileName)
      if (fs.existsSync(explicitPath)) {
        const cssContent = fs.readFileSync(explicitPath, "utf-8")
        return cssContent
      }
    }

    const componentName = cssFileName.replace(".css", "")

    // Try these paths in order:
    const possiblePaths = [
      // 1. UI components
      path.join(componentsPath, "ui", componentName, cssFileName),
      // 2. Icon components
      path.join(componentsPath, "icons", componentName, cssFileName),
      // 3. Utils components
      path.join(componentsPath, "utils", componentName, cssFileName),
      // 4. Snippets components
      path.join(componentsPath, "snippets", componentName, cssFileName),
      // 5. Storyblok directory structure (exact match)
      path.join(componentsPath, "storyblok", componentName, cssFileName),
      // 6. Storyblok directory structure (with "Block" suffix for consistency)
      path.join(
        componentsPath,
        "storyblok",
        `${componentName}Block`,
        cssFileName
      ),
      // 7. Legacy flat storyblok
      path.join(componentsPath, "storyblok", cssFileName),
      // 8. Root components directory
      path.join(componentsPath, componentName, cssFileName),
    ]

    for (const cssPath of possiblePaths) {
      if (fs.existsSync(cssPath)) {
        const cssContent = fs.readFileSync(cssPath, "utf-8")
        return cssContent
      }
    }

    // CSS file not found - this is expected for some components
    return ""
  } catch {
    return ""
  }
}
