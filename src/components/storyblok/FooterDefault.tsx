import { FooterDefaultStoryblok } from "@/types";
import { StoryblokServerComponent } from "@/components/StoryblokServerComponent";
import { storyblokEditable } from "@storyblok/react";

interface FooterDefaultProps {
  blok: FooterDefaultStoryblok;
}

export default function FooterDefault({ blok }: FooterDefaultProps) {
  return (
    <footer {...storyblokEditable(blok)} className="footer">
      {blok.content?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </footer>
  );
}
