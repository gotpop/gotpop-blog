import { RichText } from "@/components/ui/RichText"
import type { RichTextCodeBlockStoryblok } from "@/types/storyblok-components"
import "./RichTextCodeBlock.css"

interface RichTextCodeBlockProps {
  blok: RichTextCodeBlockStoryblok
}

export function RichTextCodeBlock({ blok }: RichTextCodeBlockProps) {
  const { content } = blok

  return <code-block>{content && <RichText content={content} />}</code-block>
}
