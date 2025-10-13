import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

import { NavDefaultStoryblok } from "@/types";

interface NavDefaultProps {
  blok: NavDefaultStoryblok;
}

export default function NavDefault({ blok }: NavDefaultProps) {
  return (
    <nav {...storyblokEditable(blok)} className="nav">
      {blok.nav_items?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </nav>
  );
}
