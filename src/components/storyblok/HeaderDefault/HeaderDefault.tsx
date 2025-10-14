import { HeaderDefaultStoryblok } from "@/types/storyblok-components";
import { StoryblokServerComponent } from "@/components/StoryblokServerComponent";
import { getInlineStyles } from "@/utils/inline-styles";
import { storyblokEditable } from "@storyblok/react/rsc";

interface HeaderDefaultProps {
  blok: HeaderDefaultStoryblok | null;
}

export default function HeaderDefault({ blok }: HeaderDefaultProps) {
  const styles = getInlineStyles("HeaderDefault.css");

  if (!blok) {
    return null;
  }

  const { nav, logo } = blok;

  return (
    <header {...storyblokEditable(blok)} className="header">
      <style>{styles}</style>
      {logo && logo[0] && <StoryblokServerComponent blok={logo[0]} />}
      {nav && nav[0] && <StoryblokServerComponent blok={nav[0]} />}
    </header>
  );
}
