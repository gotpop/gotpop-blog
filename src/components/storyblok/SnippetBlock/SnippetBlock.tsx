import SnippetTextAlign from "@/components/snippets/SnippetTextAlign/SnippetTextAlign"
import type { SnippetBlockStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"

interface SnippetBlockProps {
  blok: SnippetBlockStoryblok
}

function renderSnippet(snippetType?: string) {
  switch (snippetType) {
    case "text-align":
      return <SnippetTextAlign />
    default:
      return (
        <div className="snippet-placeholder">
          <p>Unknown snippet type: {snippetType || "none"}</p>
        </div>
      )
  }
}

export default function SnippetBlock({ blok }: SnippetBlockProps) {
  const { snippet } = blok
  const styles = getInlineStyles("SnippetBlock.css")

  return (
    <snippet-block>
      {styles && <style>{styles}</style>}
      {renderSnippet(snippet)}
    </snippet-block>
  )
}
