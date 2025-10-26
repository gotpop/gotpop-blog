import { getInlineStyles } from "@/utils/inline-styles"

export default function SnippetTextAlign() {
  const styles = getInlineStyles("SnippetTextAlign.css")

  return (
    <div className="snippet-text-align">
      {styles && <style>{styles}</style>}
      <h1>Example aligned text</h1>
    </div>
  )
}
