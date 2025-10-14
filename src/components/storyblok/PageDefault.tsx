import HeaderDefault from "./HeaderDefault";
import { StoryblokServerComponent } from "@/components/StoryblokServerComponent";
import { storyblokEditable } from "@storyblok/react";

interface PageDefaultProps {
  blok: any;
}

export default async function PageDefault({ blok }: PageDefaultProps) {
  let headerData = null;
  let footerTitle = null;

  // Fetch header story if UUID exists
  if (blok.Header) {
    try {
      const response: any = await fetch(
        `https://api.storyblok.com/v2/cdn/stories?token=${process.env.STORYBLOK_ACCESS_TOKEN}&by_uuids=${blok.Header}&version=draft`
      );
      const data = await response.json();

      if (data.stories && data.stories[0]) {
        headerData = data.stories[0].content; // Pass just the content
      }
    } catch (e) {
      console.error("Failed to fetch header");
    }
  }

  // Fetch footer story if UUID exists
  if (blok.Footer) {
    try {
      const response: any = await fetch(
        `https://api.storyblok.com/v2/cdn/stories?token=${process.env.STORYBLOK_ACCESS_TOKEN}&by_uuids=${blok.Footer}&version=draft`
      );
      const data = await response.json();
      if (data.stories && data.stories[0]) {
        footerTitle = data.stories[0].name;
      }
    } catch (e) {
      console.error("Failed to fetch footer");
    }
  }

  return (
    <div {...storyblokEditable(blok)} className="page">
      <HeaderDefault blok={headerData} />
      <main>
        {blok.body?.map((nestedBlok: any) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
      {footerTitle && (
        <footer className="footer">
          <p>{footerTitle}</p>
        </footer>
      )}
    </div>
  );
}
