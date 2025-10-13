import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

import { HeaderDefaultStoryblok } from "@/types";

interface HeaderDefaultProps {
  blok: HeaderDefaultStoryblok;
}

export default function HeaderDefault({ blok }: HeaderDefaultProps) {
  return (
    <header {...storyblokEditable(blok)} className="header">
      <StoryblokComponent blok={blok.logo} />
      <StoryblokComponent blok={blok.navigation} />
    </header>
  );
}
