import { render } from "storyblok-rich-text-react-renderer"
import type { RichtextStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"

interface RichTextProps {
  content: RichtextStoryblok
  className?: string
}

export default function RichText({ content, className }: RichTextProps) {
  if (!content) return null

  const styles = getInlineStyles("RichText.css")

  const classNames = ["rich-text", className].filter(Boolean).join(" ")

  // Use React renderer with custom resolvers
  const renderedContent = render(content, {
    markResolvers: {
      link: (children, props) => (
        <a
          href={props.href}
          target={props.target}
          rel={props.target === "_blank" ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      ),
    },
    nodeResolvers: {
      heading: (children, props) => {
        const level = props.level || 2
        switch (level) {
          case 1:
            return <h1>{children}</h1>
          case 2:
            return <h2>{children}</h2>
          case 3:
            return <h3>{children}</h3>
          case 4:
            return <h4>{children}</h4>
          case 5:
            return <h5>{children}</h5>
          case 6:
            return <h6>{children}</h6>
          default:
            return <h2>{children}</h2>
        }
      },
      paragraph: (children) => <p className="variant-base">{children}</p>,
      bullet_list: (children) => <ul>{children}</ul>,
      ordered_list: (children) => <ol>{children}</ol>,
      list_item: (children) => <li>{children}</li>,
      blockquote: (children) => <blockquote>{children}</blockquote>,
      code_block: (children) => (
        <pre>
          <code>{children}</code>
        </pre>
      ),
      hard_break: () => <br />,
    },
  })

  return (
    <div className={classNames}>
      {styles && <style>{styles}</style>}
      {renderedContent}
    </div>
  )
}
