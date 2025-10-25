# Rich Text Rendering

## Overview

This project uses `storyblok-rich-text-react-renderer` v3.0.1 (latest) to properly render rich text content from Storyblok.

## RichText Component

Located at: `/src/components/ui/RichText/RichText.tsx`

### Usage

```tsx
import RichText from "@/components/ui/RichText"

// In your component
{
  blok.richTextField && <RichText content={blok.richTextField} />
}

// With custom className
{
  blok.richTextField && (
    <RichText content={blok.richTextField} className="custom-class" />
  )
}
```

### Props

- `content: RichtextStoryblok` - The rich text content from Storyblok
- `className?: string` - Optional CSS class name for the wrapper div

### How It Works

1. The component uses `render()` from `storyblok-rich-text-react-renderer`
2. It renders the Storyblok rich text structure into React components directly
3. No `dangerouslySetInnerHTML` required - returns JSX components safely

## Components Using Rich Text

### HeroDefault

- **Field**: `subheading` (RichtextStoryblok)
- **Rendering**: `<RichText content={blok.subheading} />`

### PagePost

- **Field**: `body` (RichtextStoryblok)
- **Rendering**: `<RichText content={blok.body} />`
- Also displays:
  - `Heading` as `<h1>`
  - `published_date` as `<time>` element
  - `content` array for nested bloks

## Rich Text Type

The `RichtextStoryblok` interface is defined in `/src/types/storyblok-components.ts`:

```typescript
export interface RichtextStoryblok {
  type: string
  content?: RichtextStoryblok[]
  marks?: RichtextStoryblok[]
  attrs?: any
  text?: string
  [k: string]: any
}
```

This represents the Storyblok rich text document structure with:

- **type**: Node type (paragraph, heading, etc.)
- **content**: Child nodes
- **marks**: Text formatting (bold, italic, etc.)
- **attrs**: Node attributes
- **text**: Text content for text nodes

## Customization

To customize the output, you can pass options to the `render()` function:

```tsx
import { render } from "storyblok-rich-text-react-renderer"

const renderedContent = render(content, {
  // Custom mark resolvers for inline formatting
  markResolvers: {
    link: (children, props) => (
      <a href={props.href} target={props.target}>
        {children}
      </a>
    ),
    styled: (children, props) => {
      // Custom styling logic
      return <span style={props.style}>{children}</span>
    },
  },
  // Custom node resolvers for block elements
  nodeResolvers: {
    paragraph: (children) => <p className="custom-paragraph">{children}</p>,
    heading: (children, props) => {
      const Tag = `h${props.level || 2}`
      return <Tag className="custom-heading">{children}</Tag>
    },
  },
})
```

See [storyblok-rich-text-react-renderer documentation](https://github.com/claus/storyblok-rich-text-react-renderer) for more options.
