import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  webpack: (config) => {
    // The !!raw-loader! syntax should work out of the box since raw-loader is installed
    // No additional configuration needed - the !! prefix bypasses all other loaders
    // Normal CSS files will continue to use Next.js built-in CSS handling

    return config
  },
}

export default nextConfig
