"use client"

import { apiPlugin, storyblokInit } from "@storyblok/react/rsc"

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // Re-initialize on the client for Visual Editor support
  // Don't import components to avoid server-only module imports
  storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
    use: [apiPlugin],
    apiOptions: {
      region: "eu",
    },
  })

  return <>{children}</>
}
