import { FooterDefaultStoryblok } from "@/types/storyblok-components";
import { StoryblokServerComponent } from "@/components/StoryblokServerComponent";
import { storyblokEditable } from "@storyblok/react";

interface FooterDefaultProps {
  blok: FooterDefaultStoryblok;
}

export default function FooterDefault({ blok }: FooterDefaultProps) {
  if (!blok) {
    return null;
  }

  const { nav, logo } = blok;

  return (
    <footer {...storyblokEditable(blok)} className="footer">
      {logo && logo[0] && <StoryblokServerComponent blok={logo[0]} />}
      {nav && nav[0] && <StoryblokServerComponent blok={nav[0]} />}
    </footer>
  );
}
