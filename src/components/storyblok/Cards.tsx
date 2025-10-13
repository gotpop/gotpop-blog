import { CardsStoryblok } from "@/types";
import { StoryblokServerComponent } from "@/components/StoryblokServerComponent";
import { storyblokEditable } from "@storyblok/react";

interface CardsProps {
  blok: CardsStoryblok;
}

export default function Cards({ blok }: CardsProps) {
  return (
    <div {...storyblokEditable(blok)} className="cards-grid">
      {blok.cards?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}
