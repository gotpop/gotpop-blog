import { getInlineStyles } from "@/utils/inline-styles"

export default function SnippetTextAlignA() {
  const styles = getInlineStyles("SnippetTextAlignA.css")

  return (
    <div className="snippet-text-align-a">
      {styles && <style>{styles}</style>}
      <h1>Example aligned text</h1>
    </div>
  )
}
