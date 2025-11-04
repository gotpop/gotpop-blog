// TypeScript declarations for raw CSS imports.
// Support both `raw-loader`-style imports (e.g. `!!raw-loader!...`) and the
// `?raw` query approach (e.g. `import css from './file.css?raw'`).
// These declarations let TypeScript treat raw CSS/text imports as strings.

// Support for !!raw-loader! syntax
declare module "!!raw-loader!*" {
  const content: string
  export default content
}

// More specific declarations for CSS files
declare module "!!raw-loader!*.css" {
  const content: string
  export default content
}

declare module "!!raw-loader!*.scss" {
  const content: string
  export default content
}

declare module "!!raw-loader!*.sass" {
  const content: string
  export default content
}

// Also support the query parameter approach as fallback
declare module "*.css?raw" {
  const content: string
  export default content
}

declare module "*.scss?raw" {
  const content: string
  export default content
}

declare module "*.sass?raw" {
  const content: string
  export default content
}

// Export an empty object to make this file a module
export {}
