import BoxGrid from "@/components/ui/BoxGrid"
import RichText from "@/components/ui/RichText"
import type { RichTextBlockStoryblok } from "@/types/storyblok-components"

interface RichTextBlockProps {
  blok: RichTextBlockStoryblok
}

export default function RichTextBlock({ blok }: RichTextBlockProps) {
  const { content } = blok

  return <BoxGrid>{content && <RichText content={content} />}</BoxGrid>
}
