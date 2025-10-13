import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";

interface HeroDefaultProps {
  blok: any;
}

export default function HeroDefault({ blok }: HeroDefaultProps) {
  console.log("Hero blok:", JSON.stringify(blok, null, 2));

  return (
    <section {...storyblokEditable(blok)} className="hero">
      <div className="hero-content">
        {blok.heading && <h1>{blok.heading}</h1>}
        {blok.subheading && (
          <div>
            {/* Rich text field - we'll render it simply for now */}
            {blok.subheading.content?.[0]?.content?.[0]?.text && (
              <p>{blok.subheading.content[0].content[0].text}</p>
            )}
          </div>
        )}
        {/* Fallback for subtitle field */}
        {blok.subtitle && <p>{blok.subtitle}</p>}
      </div>
      {blok.image && (
        <Image
          src={blok.image.filename}
          alt={blok.image.alt || ""}
          width={1200}
          height={600}
          className="hero-image"
          priority
        />
      )}
    </section>
  );
}
