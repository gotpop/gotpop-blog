import { HeaderDefaultStoryblok } from "@/types/storyblok-components";
import { StoryblokServerComponent } from "@/components/StoryblokServerComponent";
import { storyblokEditable } from "@storyblok/react";

interface HeaderDefaultProps {
  blok: HeaderDefaultStoryblok | null;
}

export default function HeaderDefault({ blok }: HeaderDefaultProps) {
  if (!blok) {
    return null;
  }

  const { nav, logo } = blok;

  return (
    <header {...storyblokEditable(blok)} className="header">
      {logo && logo[0] && <StoryblokServerComponent blok={logo[0]} />}
      {nav && nav[0] && <StoryblokServerComponent blok={nav[0]} />}
    </header>
  );
}
