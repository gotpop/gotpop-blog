import { NavDefaultStoryblok } from "@/types/storyblok-components";
import { StoryblokServerComponent } from "@/components/StoryblokServerComponent";
import { storyblokEditable } from "@storyblok/react";

interface NavDefaultProps {
  blok: NavDefaultStoryblok;
}

export default function NavDefault({ blok }: NavDefaultProps) {
  // console.log("Nav data:", JSON.stringify(blok, null, 2));

  return (
    <nav {...storyblokEditable(blok)} className="nav">
      {blok.nav_items?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </nav>
  );
}
