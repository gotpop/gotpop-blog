import { getInlineStyles } from "@/utils/inline-styles"

export default function SnippetTextAlign() {
  const styles = getInlineStyles("SnippetTextAlign.css")

  return (
    <>
      {styles && <style>{styles}</style>}
      <div className="snippet-text-align">
        <h3>Text Align Snippet</h3>
        <div className="text-align-examples">
          <div className="align-left">
            <h4>Left Aligned Text</h4>
            <p>
              This is some dummy text that demonstrates left alignment. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="align-center">
            <h4>Center Aligned Text</h4>
            <p>
              This is some dummy text that demonstrates center alignment. Sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </div>
          <div className="align-right">
            <h4>Right Aligned Text</h4>
            <p>
              This is some dummy text that demonstrates right alignment. Ut enim
              ad minim veniam, quis nostrud.
            </p>
          </div>
          <div className="align-justify">
            <h4>Justified Text</h4>
            <p>
              This is some dummy text that demonstrates justified alignment.
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
