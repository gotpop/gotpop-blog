import { render } from "storyblok-rich-text-react-renderer"
import { BaselineStatusBlock } from "@/components/storyblok/BaselineStatusBlock"
import { Card, Cards } from "@/components/storyblok/Cards"
import { FilterContent } from "@/components/storyblok/FilterContent"
import { HeroDefault } from "@/components/storyblok/HeroDefault"
import { LogoDefault } from "@/components/storyblok/LogoDefault"
import { RichTextBlock } from "@/components/storyblok/RichTextBlock"
import { RichTextCodeBlock } from "@/components/storyblok/RichTextCodeBlock"
import { SnippetBlock } from "@/components/storyblok/SnippetBlock"
import { Typography } from "@/components/storyblok/Typography"
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

export function RichText({ content }: RichTextProps) {
  if (!content) return null

  const renderedContent = render(content, {
    blokResolvers: {
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
              <Typography shade="dark" tag="h1" variant="text-lg">
                {children}
              </Typography>
            )
          case 2:
            return (
              <Typography shade="dark" tag="h2" variant="text-xl">
                {children}
              </Typography>
            )
          case 3:
            return (
              <Typography shade="dark" tag="h3" variant="text-md">
                {children}
              </Typography>
            )
          case 4:
            return (
              <Typography shade="dark" tag="h4" variant="text-md">
                {children}
              </Typography>
            )
          case 5:
            return (
              <Typography shade="dark" tag="h5" variant="text-md">
                {children}
              </Typography>
            )
          case 6:
            return (
              <Typography shade="dark" tag="h6" variant="text-md">
                {children}
              </Typography>
            )
          default:
            return (
              <Typography shade="dark" tag="h2" variant="text-xl">
                {children}
              </Typography>
            )
        }
      },
      paragraph: (children) => (
        <Typography shade="charcoal" tag="p" variant="text-base">
          {children}
        </Typography>
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
