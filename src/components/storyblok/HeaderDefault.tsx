import { HeaderDefaultStoryblok } from "@/types";
import { StoryblokServerComponent } from "@/components/StoryblokServerComponent";
import { storyblokEditable } from "@storyblok/react";

interface HeaderDefaultProps {
  blok: HeaderDefaultStoryblok;
}

export default function HeaderDefault({ blok }: HeaderDefaultProps) {
  return (
    <header {...storyblokEditable(blok)} className="header">
      <StoryblokServerComponent blok={blok.logo} />
      <StoryblokServerComponent blok={blok.navigation} />
    </header>
  );
}
