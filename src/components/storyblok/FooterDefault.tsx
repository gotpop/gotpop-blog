import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

import { FooterDefaultStoryblok } from "@/types";

interface FooterDefaultProps {
  blok: FooterDefaultStoryblok;
}

export default function FooterDefault({ blok }: FooterDefaultProps) {
  return (
    <footer {...storyblokEditable(blok)} className="footer">
      {blok.content?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </footer>
  );
}
