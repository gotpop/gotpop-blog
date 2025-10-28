import { render } from "storyblok-rich-text-react-renderer"
import BaselineStatusBlock from "@/components/storyblok/BaselineStatusBlock"
import { Card, Cards } from "@/components/storyblok/Cards"
import FilterContent from "@/components/storyblok/FilterContent"
import HeroDefault from "@/components/storyblok/HeroDefault"
import LogoDefault from "@/components/storyblok/LogoDefault"
import RichTextBlock from "@/components/storyblok/RichTextBlock"
import RichTextCodeBlock from "@/components/storyblok/RichTextCodeBlock"
import SnippetBlock from "@/components/storyblok/SnippetBlock"
import type {
  BaselineStatusBlockStoryblok,
  CardStoryblok,
  CardsStoryblok,
  HeroDefaultStoryblok,
  LogoDefaultStoryblok,
  RichTextBlockStoryblok,
  RichTextCodeBlockStoryblok,
  RichtextStoryblok,
  SnippetBlockStoryblok,
} from "@/types/storyblok-components"

interface RichTextProps {
  content: RichtextStoryblok
  className?: string
}

export default function RichText({ content }: RichTextProps) {
  if (!content) return null

  const renderedContent = render(content, {
    blokResolvers: {
      // This enables embedded Storyblok components in rich text
      baseline_status_block: (props) => (
        <BaselineStatusBlock blok={props as BaselineStatusBlockStoryblok} />
      ),
      card: (props) => <Card blok={props as CardStoryblok} />,
      cards: (props) => <Cards blok={props as CardsStoryblok} />,
      filter_content: () => <FilterContent />,
      hero_default: (props) => (
        <HeroDefault blok={props as HeroDefaultStoryblok} />
      ),
      logo_default: (props) => (
        <LogoDefault blok={props as LogoDefaultStoryblok} />
      ),
      rich_text_block: (props) => (
        <RichTextBlock blok={props as RichTextBlockStoryblok} />
      ),
      rich_text_code_block: (props) => (
        <RichTextCodeBlock blok={props as RichTextCodeBlockStoryblok} />
      ),
      snippet_block: (props) => (
        <SnippetBlock blok={props as SnippetBlockStoryblok} />
      ),
    },
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
      textStyle: (children) => <>{children}</>,
      styled: (children) => <>{children}</>,
      bold: (children) => <strong>{children}</strong>,
      italic: (children) => <em>{children}</em>,
      underline: (children) => <u>{children}</u>,
      strike: (children) => <del>{children}</del>,
      code: (children) => <code>{children}</code>,
    },
    nodeResolvers: {
      heading: (children, props) => {
        const level = props.level || 2
        switch (level) {
          case 1:
            return (
              <h1 className="typography-text typography-h1 dark variant-lg">
                {children}
              </h1>
            )
          case 2:
            return (
              <h2 className="typography-text typography-h3 dark variant-md">
                {children}
              </h2>
            )
          case 3:
            return (
              <h3 className="typography-text typography-h3 dark variant-md">
                {children}
              </h3>
            )
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
      paragraph: (children) => (
        <p className="typography-text typography-p dark variant-base">
          {children}
        </p>
      ),
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

  return renderedContent
}
