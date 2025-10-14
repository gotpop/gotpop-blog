# GitHub Copilot Instructions

## Project Overview

This is a Next.js 15.5.4 blog built with:

- **Framework**: Next.js 15 with App Router and Turbopack
- **CMS**: Storyblok with React Server Components
- **Language**: TypeScript (strict mode)
- **Styling**: CSS modules colocated with components

## Architecture

### Storyblok Integration

- **SDK**: `@storyblok/react` v5+ with RSC support
- **Components**: Server components with `storyblokEditable()` from `@storyblok/react/rsc`
- **Data Fetching**: Use `getStoryblokApi()` from `src/lib/storyblok.ts`
- **Rendering**: Use `<StoryblokStory story={data.story} />` in pages
- **Visual Editor**: Enabled via HTTPS proxy on port 3010

### Component Structure

```
src/components/storyblok/
├── ComponentName/
│   ├── ComponentName.tsx      # Component logic
│   ├── ComponentName.css      # Colocated styles
│   └── index.ts               # Barrel export
```

### Type System

- **Auto-generated types**: Run `npm run generate-types` to update Storyblok types
- **Location**: `src/types/storyblok-components.ts`
- **Type naming**: `ComponentNameStoryblok` (e.g., `HeroDefaultStoryblok`)

### CSS and Styling

- **CSS Files**: Colocated with components (e.g., `HeroDefault/HeroDefault.css`)
- **Inline Styles**: Use `getInlineStyles()` from `src/utils/inline-styles.ts` (server-only)
- **No CSS-in-JS**: Avoid styled-components, emotion, etc.
- **Pattern**:
  ```tsx
  const styles = getInlineStyles("HeroDefault")
  return (
    <>
      {styles && <style>{styles}</style>}
      <section className="hero">...</section>
    </>
  )
  ```

## Coding Standards

### Debugging

- **Console logs for objects**: Always use JSON.stringify with formatting:
  ```tsx
  console.log("Header data:", JSON.stringify(data, null, 2))
  ```
- This makes objects readable in the console
- Use descriptive labels before the colon

### TypeScript

- Use strict type checking
- Avoid `any` - use proper types or `unknown`
- Import types from `@/types/storyblok-components`
- Use interface for component props

### React/Next.js

- **Default to Server Components** - only use `"use client"` when necessary
- **Server-only utilities**: Mark with `import "server-only"` at the top
- **Client Components**: Use for interactivity, state, effects
- **Data Fetching**: Use `getStoryblokApi()` in server components

### Storyblok Components

When creating new Storyblok components:

1. Create folder structure: `src/components/storyblok/ComponentName/`
2. Add TypeScript component with `storyblokEditable(blok)`
3. Import `storyblokEditable` from `@storyblok/react/rsc`
4. Add optional CSS file (colocated)
5. Create barrel export (`index.ts`)
6. Register in `src/lib/storyblok.ts` components object
7. Run `npm run generate-types` to update types

### Example Component Template

```tsx
import { ComponentNameStoryblok } from "@/types/storyblok-components"
import { storyblokEditable } from "@storyblok/react/rsc"
import { getInlineStyles } from "@/utils/inline-styles"

interface ComponentNameProps {
  blok: ComponentNameStoryblok
}

export default function ComponentName({ blok }: ComponentNameProps) {
  const styles = getInlineStyles("ComponentName")

  return (
    <>
      {styles && <style>{styles}</style>}
      <div {...storyblokEditable(blok)} className="component-name">
        {/* Component content */}
      </div>
    </>
  )
}
```

## Important Patterns

### Path Handling

- Stories are under `blog/` folder in Storyblok
- Use `getStoryPath(fullSlug)` from `src/lib/storyblok-utils.ts` to convert `full_slug` to clean URL paths
- Automatically removes "blog/" prefix and ensures leading "/"
- Use `normalizeStoryblokPath(slug)` for incoming route slugs
- Home path ("home" or "blog") maps to `blog/`

### Link Handling

- Use `getStoryblokLinkProps()` from `src/utils/storyblok.ts` for multilink fields
- Use `getStoryPath()` from `src/lib/storyblok-utils.ts` for `full_slug` → URL conversion
- Automatically converts "home" → "/"
- Handles internal vs external links
- Sets proper `target` and `rel` attributes

### Rich Text

- Rich text fields have type `RichtextStoryblok`
- Use the `<RichText>` component from `@/components/RichText` for rendering
- Example: `{blok.body && <RichText content={blok.body} />}`
- Powered by `@storyblok/richtext` package with `richTextResolver()`

## Development Workflow

### Commands

```bash
npm run dev              # Start dev server (port 3000)
npm run dev:https        # Start with HTTPS proxy (port 3010)
npm run generate-types   # Generate Storyblok types
npm run kill-ports       # Kill processes on ports 3000 and 3010
```

### HTTPS Setup (for Visual Editor)

1. Certificates in project root: `localhost.pem`, `localhost-key.pem`
2. Proxy forwards `https://localhost:3010` → `http://localhost:3000`
3. Storyblok Preview URL: `https://localhost:3010/[full_slug]`

## Don't Do This

❌ Import server-only modules in client components  
❌ Use `dangerouslySetInnerHTML` (use inline styles pattern instead)  
❌ Import from `@storyblok/react` (use `@storyblok/react/rsc`)  
❌ Register components in `StoryblokProvider` (causes client/server issues)  
❌ Pass full story object to components (pass `story.content` or specific blok)

## Do This Instead

✅ Use server components by default  
✅ Import `storyblokEditable` from `@storyblok/react/rsc`  
✅ Register components in `src/lib/storyblok.ts`  
✅ Use `getStoryblokApi()` for data fetching  
✅ Colocate CSS files with components  
✅ Use type-safe props with auto-generated types

## Environment Variables

```bash
# .env.local
STORYBLOK_ACCESS_TOKEN=         # Server-side token
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=  # Client-side token (same value)
```

## Resources

- [Storyblok React SDK Docs](https://github.com/storyblok/storyblok-react)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/reference/rsc/server-components)
