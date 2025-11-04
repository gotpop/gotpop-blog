import { SnippetTextAlignA } from "@/components/snippets/SnippetTextAlignA/SnippetTextAlignA"
import { SnippetTextAlignB } from "@/components/snippets/SnippetTextAlignB/SnippetTextAlignB"
import type { SnippetBlockStoryblok } from "@/types/storyblok-components"
import "./SnippetBlock.css"

interface SnippetBlockProps {
  blok: SnippetBlockStoryblok
}

function renderSnippet(snippetType?: string) {
  switch (snippetType) {
    case "text-align-a":
      return <SnippetTextAlignA />
    case "text-align-b":
      return <SnippetTextAlignB />
    default:
      return (
        <div className="snippet-placeholder">
          <p>Unknown snippet type: {snippetType || "none"}</p>
        </div>
      )
  }
}

export function SnippetBlock({ blok }: SnippetBlockProps) {
  const { snippet } = blok

  return <snippet-block>{renderSnippet(snippet)}</snippet-block>
}
