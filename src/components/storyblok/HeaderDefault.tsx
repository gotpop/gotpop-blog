import { HeaderDefaultStoryblok } from "@/types";
import { StoryblokServerComponent } from "@/components/StoryblokServerComponent";
import { storyblokEditable } from "@storyblok/react";

interface HeaderDefaultProps {
  blok: HeaderDefaultStoryblok | { content: HeaderDefaultStoryblok } | null;
}

export default function HeaderDefault({ blok }: HeaderDefaultProps) {
  // Handle case where blok is null
  if (!blok) {
    return null;
  }

  // If blok is a story object with content, extract the content
  const headerContent = (
    "content" in blok ? blok.content : blok
  ) as HeaderDefaultStoryblok;

  console.log("Header content:", JSON.stringify(headerContent, null, 2));

  const { nav, logo } = headerContent;

  return (
    <header {...storyblokEditable(headerContent)} className="header">
      <h1>Liam Header</h1>
      {logo && <StoryblokServerComponent blok={headerContent.logo[0]} />}
      {nav && <StoryblokServerComponent blok={headerContent.nav[0]} />}
    </header>
  );
}
