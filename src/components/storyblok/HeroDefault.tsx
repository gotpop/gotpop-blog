import { HeroDefaultStoryblok } from "@/types";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";

interface HeroDefaultProps {
  blok: HeroDefaultStoryblok;
}

export default function HeroDefault({ blok }: HeroDefaultProps) {
  return (
    <section {...storyblokEditable(blok)} className="hero">
      <div className="hero-content">
        <h1>{blok.title}</h1>
        {blok.subtitle && <p>{blok.subtitle}</p>}
      </div>
      {blok.image && (
        <Image
          src={blok.image.filename}
          alt={blok.image.alt}
          width={1200}
          height={600}
          className="hero-image"
          priority
        />
      )}
    </section>
  );
}
