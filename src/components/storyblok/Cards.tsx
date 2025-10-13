import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

import { CardsStoryblok } from "@/types";

interface CardsProps {
  blok: CardsStoryblok;
}

export default function Cards({ blok }: CardsProps) {
  return (
    <div {...storyblokEditable(blok)} className="cards-grid">
      {blok.cards?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}
