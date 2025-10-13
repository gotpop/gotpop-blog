import { renderRichText } from "@storyblok/react";

interface RichTextProps {
  content: any; // We'll type this properly once we have the Storyblok rich text type definitions
}

export default function RichText({ content }: RichTextProps) {
  return (
    <div
      className="rich-text"
      dangerouslySetInnerHTML={{ __html: renderRichText(content) }}
    />
  );
}
