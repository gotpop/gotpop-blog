import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

import { PageDefaultStoryblok } from "@/types";

interface PageDefaultProps {
  blok: PageDefaultStoryblok;
}

export default function PageDefault({ blok }: PageDefaultProps) {
  return (
    <div {...storyblokEditable(blok)} className="page">
      <StoryblokComponent blok={blok.header} />
      <main>
        {blok.body?.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
      <StoryblokComponent blok={blok.footer} />
    </div>
  );
}
