import { PagePostStoryblok } from "@/types/storyblok-components";
import { StoryblokServerComponent } from "@/components/StoryblokServerComponent";
import { storyblokEditable } from "@storyblok/react/rsc";

interface PagePostProps {
  blok: PagePostStoryblok;
}

export default function PagePost({ blok }: PagePostProps) {
  return (
    <div {...storyblokEditable(blok)} className="page-post">
      <StoryblokServerComponent blok={blok.header} />
      <main>
        {blok.content?.map((nestedBlok) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
      <StoryblokServerComponent blok={blok.footer} />
    </div>
  );
}
