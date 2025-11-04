import type { NextConfig } from "next"

// Keep the Next.js configuration minimal and avoid a custom webpack override so
// the project uses Next.js's default bundler behavior (Turbopack in dev where
// supported). If you need custom webpack behavior later, re-introduce the
// `webpack` field here.
const nextConfig: NextConfig = {}

export default nextConfig
