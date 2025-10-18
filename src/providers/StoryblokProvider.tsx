"use client"

import { apiPlugin, storyblokInit } from "@storyblok/react/rsc"

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode
}) {
  if (process.env.NODE_ENV === "development") {
    const accessToken = process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN

    storyblokInit({
      accessToken,
      use: [apiPlugin],
      apiOptions: {
        region: "eu",
      },
    })
  }

  return <>{children}</>
}
