import { RichtextStoryblok } from "@/types/storyblok-components"
import {
  richTextResolver,
  type StoryblokRichTextNode,
} from "@storyblok/richtext"

interface RichTextProps {
  content: RichtextStoryblok
  className?: string
}

export default function RichText({ content, className }: RichTextProps) {
  // Initialize the rich text resolver
  const resolver = richTextResolver()

  // Render the rich text content
  const html = resolver.render(
    content as unknown as StoryblokRichTextNode<string>
  )

  if (!html) return null

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  )
}
