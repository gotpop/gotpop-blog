"use client"

import { apiPlugin, storyblokInit } from "@storyblok/react/rsc"

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // Use preview token in development, public token in production
  const accessToken =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN
      : process.env.NEXT_PUBLIC_STORYBLOK_PUBLIC_TOKEN

  // Initialize Storyblok for Visual Editor support
  storyblokInit({
    accessToken,
    use: [apiPlugin],
    apiOptions: {
      region: "eu",
    },
  })

  return <>{children}</>
}
