// Global TypeScript declarations for raw imports (supports raw-loader and ?raw)

declare module "!!raw-loader!*" {
  const content: string
  export default content
}

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
