import { CardStoryblok } from "@/types";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";

interface CardProps {
  blok: CardStoryblok;
}

export default function Card({ blok }: CardProps) {
  return (
    <div {...storyblokEditable(blok)} className="card">
      {blok.image && (
        <Image
          src={blok.image.filename}
          alt={blok.image.alt}
          width={400}
          height={300}
          className="card-image"
        />
      )}
      <div className="card-content">
        <h3>{blok.title}</h3>
        <p>{blok.description}</p>
        {blok.link && (
          <a
            href={blok.link.url}
            target={blok.link.target || "_self"}
            className="card-link"
          >
            Learn more
          </a>
        )}
      </div>
    </div>
  );
}
