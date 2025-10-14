"use client";

import { useEffect } from "react";

export function StoryblokBridge() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    // Check if Storyblok bridge is loaded
    const checkBridge = setInterval(() => {
      if (window.storyblok) {
        clearInterval(checkBridge);

        // Initialize the bridge
        window.storyblok.init({
          accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
        });

        // Listen to Visual Editor events
        window.storyblok.on(["input", "published", "change"], (event: any) => {
          if (event.action === "input") {
            // Reload on input for live editing
            window.location.reload();
          } else if (
            event.action === "change" ||
            event.action === "published"
          ) {
            // Reload the page on change or publish
            window.location.reload();
          }
        });

        // Load the story in the Visual Editor
        window.storyblok.pingEditor(() => {
          if (window.storyblok.inEditor) {
            window.storyblok.enterEditmode();
          }
        });
      }
    }, 100);

    // Cleanup
    return () => {
      clearInterval(checkBridge);
      if (window.storyblok) {
        window.storyblok.off(["input", "published", "change"]);
      }
    };
  }, []);

  return null;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    storyblok?: any;
  }
}
