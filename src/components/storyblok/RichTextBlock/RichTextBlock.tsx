import { storyblokEditable } from "@storyblok/react/rsc"
import RichText from "@/components/ui/RichText"
import type { RichTextBlockStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"

interface RichTextBlockProps {
  blok: RichTextBlockStoryblok
}

export default function RichTextBlock({ blok }: RichTextBlockProps) {
  const styles = getInlineStyles("RichTextBlock")

  return (
    <>
      {styles && <style>{styles}</style>}
      <div {...storyblokEditable(blok)} className="rich-text-block">
        {blok.content && <RichText content={blok.content} />}
      </div>
    </>
  )
}
