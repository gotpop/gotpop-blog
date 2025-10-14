import Image from "next/image"
import { storyblokEditable } from "@storyblok/react/rsc"
import { CardStoryblok } from "@/types"

interface CardProps {
  blok: CardStoryblok
}

export default function Card({ blok }: CardProps) {
  const hasDirectContent = blok.title || blok.description || blok.image

  return (
    <div className="card" {...storyblokEditable(blok)}>
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
            {Array.isArray(blok.cards) && blok.cards.length > 0 && (
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
  )
}
