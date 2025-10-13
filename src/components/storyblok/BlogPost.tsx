import { PostStoryblok } from "@/types";
import RichText from "./RichText";
import { storyblokEditable } from "@storyblok/react";

interface BlogPostProps {
  blok: PostStoryblok;
}

export default function BlogPost({ blok }: BlogPostProps) {
  return (
    <article {...storyblokEditable(blok)} className="blog-post">
      <h1>{blok.title}</h1>
      {blok.featured_image && (
        <img
          src={blok.featured_image.filename}
          alt={blok.featured_image.alt}
          className="featured-image"
        />
      )}
      <div className="content">
        <RichText content={blok.content} />
      </div>
    </article>
  );
}
