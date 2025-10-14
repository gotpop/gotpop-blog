import "server-only";
import fs from "fs";
import path from "path";

/**
 * Read a CSS file from the file system (server-side only)
 * Returns the CSS content as a string to be used in a <style> tag
 *
 * @param cssFileName - The CSS filename (e.g., "NavDefault.css")
 * @returns The CSS content as a string
 */
export function getInlineStyles(cssFileName: string): string {
  try {
    const cssPath = path.join(
      process.cwd(),
      "src",
      "components",
      "storyblok",
      cssFileName
    );
    const cssContent = fs.readFileSync(cssPath, "utf-8");
    return cssContent;
  } catch (error) {
    console.warn(`Failed to read CSS file: ${cssFileName}`, error);
    return "";
  }
}
