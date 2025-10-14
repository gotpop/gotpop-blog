import { HeaderDefaultStoryblok } from "@/types/storyblok-components";
import { StoryblokServerComponent } from "@/components/StoryblokServerComponent";
import { storyblokEditable } from "@storyblok/react";

interface HeaderDefaultProps {
  blok: HeaderDefaultStoryblok | null;
}

export default function HeaderDefault({ blok }: HeaderDefaultProps) {
  // Handle case where blok is null
  if (!blok) {
    return null;
  }

  console.log("Header content:", JSON.stringify(blok, null, 2));

  const { nav, logo } = blok;

  return (
    <header {...storyblokEditable(blok)} className="header">
      <h1>Liam Header</h1>
      {logo && logo[0] && <StoryblokServerComponent blok={logo[0]} />}
      {nav && nav[0] && <StoryblokServerComponent blok={nav[0]} />}
    </header>
  );
}
