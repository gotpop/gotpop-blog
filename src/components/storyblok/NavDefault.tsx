import { NavDefaultStoryblok } from "@/types";
import { StoryblokServerComponent } from "@/components/StoryblokServerComponent";
import { storyblokEditable } from "@storyblok/react";

interface NavDefaultProps {
  blok: NavDefaultStoryblok;
}

export default function NavDefault({ blok }: NavDefaultProps) {
  return (
    <nav {...storyblokEditable(blok)} className="nav">
      {blok.nav_items?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </nav>
  );
}
