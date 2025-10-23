import { storyblokEditable } from "@storyblok/react/rsc"
import RichText from "@/components/ui/RichText"
import type { RichTextCodeBlockStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"

interface RichTextCodeBlockProps {
  blok: RichTextCodeBlockStoryblok
}

export default function RichTextCodeBlock({ blok }: RichTextCodeBlockProps) {
  const styles = getInlineStyles("RichTextCodeBlock")

  return (
    <>
      {styles && <style>{styles}</style>}
      <div {...storyblokEditable(blok)} className="rich-text-code-block">
        {blok.content && <RichText content={blok.content} />}
      </div>
    </>
  )
}