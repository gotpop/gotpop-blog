import RichText from "@/components/ui/RichText"
import type { RichTextBlockStoryblok } from "@/types/storyblok-components"

interface RichTextBlockProps {
  blok: RichTextBlockStoryblok
}

export default function RichTextBlock({ blok }: RichTextBlockProps) {
  const { content } = blok

  return <box-grid>{content && <RichText content={content} />}</box-grid>
}
