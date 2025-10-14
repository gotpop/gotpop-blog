# Rich Text Rendering

## Overview

This project uses `@storyblok/richtext` v3.8.2 to properly render rich text content from Storyblok.

## RichText Component

Located at: `/src/components/RichText/RichText.tsx`

### Usage

```tsx
import RichText from "@/components/RichText"

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

1. The component uses `richTextResolver()` from `@storyblok/richtext`
2. It renders the Storyblok rich text structure into HTML
3. The HTML is safely inserted using `dangerouslySetInnerHTML`

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

To customize the HTML output, you can pass options to `richTextResolver()`:

```tsx
const resolver = richTextResolver({
  // Custom node resolvers
  nodeResolvers: {
    // Override specific node types
  },
  // Image optimization
  optimizeImages: true,
})
```

See [@storyblok/richtext documentation](https://github.com/storyblok/richtext) for more options.
