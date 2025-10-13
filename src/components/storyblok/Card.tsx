import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";

interface CardProps {
  blok: any;
}

export default function Card({ blok }: CardProps) {
  // Check if this card has direct content or just references
  const hasDirectContent = blok.title || blok.description || blok.image;

  return (
    <div {...storyblokEditable(blok)} className="card">
      {blok.image && (
        <Image
          src={blok.image.filename}
          alt={blok.image.alt || ""}
          width={400}
          height={300}
          className="card-image"
        />
      )}
      <div className="card-content">
        {blok.title && <h3>{blok.title}</h3>}
        {blok.description && <p>{blok.description}</p>}
        {blok.link && (
          <a
            href={blok.link.url}
            target={blok.link.target || "_self"}
            className="card-link"
          >
            Learn more
          </a>
        )}

        {/* Show placeholder if no direct content */}
        {!hasDirectContent && (
          <div>
            <h3>Card Placeholder</h3>
            <p>
              This card references other stories. You need to add title,
              description, and image fields to your card component in Storyblok,
              or change it to fetch the referenced story content.
            </p>
            {blok.cards && blok.cards.length > 0 && (
              <p
                style={{ fontSize: "0.8rem", color: "#888", marginTop: "1rem" }}
              >
                References {blok.cards.length} story/stories
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
