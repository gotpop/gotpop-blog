import { NavDefaultStoryblok } from "@/types/storyblok-components";
import { StoryblokServerComponent } from "@/components/StoryblokServerComponent";
import { storyblokEditable } from "@storyblok/react";
import { getInlineStyles } from "@/utils/inline-styles";

interface NavDefaultProps {
  blok: NavDefaultStoryblok;
}

export default function NavDefault({ blok }: NavDefaultProps) {
  const styles = getInlineStyles("NavDefault.css");

  return (
    <nav className="nav" {...storyblokEditable(blok)}>
      <style>{styles}</style>
      {blok.nav_items?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </nav>
  );
}
