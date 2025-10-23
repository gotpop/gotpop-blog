import RichText from "@/components/ui/RichText"
import type { RichTextBlockStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"

interface RichTextBlockProps {
  blok: RichTextBlockStoryblok
}

export default function RichTextBlock({ blok }: RichTextBlockProps) {
  const { content } = blok
  const styles = getInlineStyles("RichTextBlock.css")

  return (
    <div className="rich-text-block">
      {styles && <style>{styles}</style>}
      {content && <RichText content={content} />}
    </div>
  )
}
