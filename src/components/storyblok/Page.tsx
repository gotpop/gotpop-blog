import { StoryblokComponent } from "@/types";
import { storyblokEditable } from "@storyblok/react";

export default function Page({ blok }: StoryblokComponent) {
  return (
    <main {...storyblokEditable(blok)} className="page">
      {blok.body?.map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}
