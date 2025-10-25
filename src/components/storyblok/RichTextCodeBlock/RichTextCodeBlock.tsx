import RichText from "@/components/ui/RichText"
import type { RichTextCodeBlockStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"

interface RichTextCodeBlockProps {
  blok: RichTextCodeBlockStoryblok
}

export default function RichTextCodeBlock({ blok }: RichTextCodeBlockProps) {
  const { content } = blok
  const styles = getInlineStyles("RichTextCodeBlock.css")

  return (
    <code-block>
      {styles && <style>{styles}</style>}
      {content && <RichText content={content} />}
    </code-block>
  )
}
