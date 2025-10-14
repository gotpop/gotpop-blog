"use client";

import { apiPlugin, storyblokInit } from "@storyblok/react";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  // Don't register components here since we're using StoryblokServerComponent
  // components are only needed for client-side rendering
  apiOptions: {
    region: "eu",
  },
});

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
