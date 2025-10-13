import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

import { PagePostStoryblok } from "@/types";

interface PagePostProps {
  blok: PagePostStoryblok;
}

export default function PagePost({ blok }: PagePostProps) {
  return (
    <div {...storyblokEditable(blok)} className="page-post">
      <StoryblokComponent blok={blok.header} />
      <main>
        {blok.content?.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
      <StoryblokComponent blok={blok.footer} />
    </div>
  );
}
