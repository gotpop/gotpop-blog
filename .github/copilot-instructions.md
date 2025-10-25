# GitHub Copilot Instructions

## Project Overview

Next.js 15.5.4 blog with Storyblok CMS, deployed to AWS EC2 via Docker + GitHub Actions.

**Stack**: Next.js 15 (App Router, Turbopack) • Storyblok CMS • TypeScript (strict) • Colocated CSS • Docker • AWS EC2

## Architecture & Data Flow

### Storyblok Content Structure

- **All content lives under `blog/` folder** in Storyblok (e.g., `blog/home`, `blog/post-title`)
- Path conversion: `blog/home` → `/` (home), `blog/post-title` → `/post-title`
- Use `getStoryPath(fullSlug)` from `src/lib/storyblok-utils.ts` for all path conversions
- **Config/global stories** (e.g., header, footer) are excluded from static generation via `shouldIncludeStory()`

### Server-Side CMS Integration

- **SDK**: `@storyblok/react/rsc` v5+ (React Server Components only)
- **Initialization**: `getStoryblokApi()` in `src/lib/storyblok.ts` registers ALL components
- **Data fetching**: Server components call `getStoryblokApi().get('cdn/stories/...')`
- **Rendering**: `<StoryblokStory story={data.story} />` dynamically renders registered components
- **Never** import from `@storyblok/react` (client bundle) - always use `/rsc` path

### Catch-All Route Pattern (`[[...slug]]`)

- Single dynamic route handles all pages: `src/app/[[...slug]]/page.tsx`
- `generateStaticParams()` pre-renders all blog stories at build time
- Runtime: slug array → `normalizeStoryblokPath()` → Storyblok API → story data
- 404 handling: Shows `StoryNotFound` with available stories list on error

## Component Registration System

**Critical**: Every Storyblok component must be registered in `src/lib/storyblok.ts` to render.

```typescript
// Component name in Storyblok = object key (snake_case)
const components = {
  page_default: PageDefault, // Storyblok: page_default
  hero_default: HeroDefault, // Storyblok: hero_default
  nav_item_default: NavItemDefault,
}
```

**New component checklist**:

1. Create `src/components/storyblok/ComponentName/` folder
2. Add `ComponentName.tsx`
3. Optional: Add `ComponentName.css` (colocated styles)
4. Ensure CSS is loaded via `getInlineStyles("ComponentName.css")`
5. Create `index.ts` barrel export
6. **Register in `src/lib/storyblok.ts`** (snake_case key)
7. Run `yarn generate-types` to update TypeScript definitions

### Type Generation System

- **Script**: `scripts/generate-storyblok-types.js` fetches live stories, infers types from actual content
- **Run**: `yarn generate-types` (auto-runs before build via `prebuild`)
- **Output**: `src/types/storyblok-components.ts` with interfaces like `ComponentNameStoryblok`
- **Inference**: Detects `RichtextStoryblok`, `MultilinkStoryblok`, `AssetStoryblok` from field structure

### Server-Only Styling Pattern

- **No CSS-in-JS**: Use plain CSS files colocated with components
- **Server injection**: `getInlineStyles("ComponentName.css")` reads CSS file at build time
- Pattern: `<style>{styles}</style>` in component (avoids client hydration issues)
- Paths tried: `ui/`, `icons/`, `utils/`, `storyblok/ComponentName/ComponentName.css`

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

## Development & Deployment

### Local Development

```bash
yarn dev              # Dev server (http://localhost:3000)
yarn dev:https        # HTTPS proxy for Storyblok Visual Editor (https://localhost:3010)
yarn generate-types   # Regenerate types from live Storyblok data
yarn kill-ports       # Kill ports 3000 & 3010
```

**Visual Editor Setup**: Certificates in `generated/`, proxy script forwards HTTPS → HTTP for live editing.

### Code Quality (enforced in CI)

```bash
yarn lint             # Biome linter (TypeScript/JSX)
yarn format:check     # Biome + Prettier (CSS only)
yarn type-check       # TypeScript compiler (strict mode)
```

**Biome config** (`biome.json`): Auto-organizes imports, semicolons as-needed, 80-char lines, 2-space indent.  
**Prettier** (CSS only): Defined in `package.json`, Biome handles JS/TS.

### Docker Deployment

**Multi-stage Dockerfile**:

1. `deps`: Install dependencies with libc6-compat for Node 22 Alpine
2. `builder`: Run `yarn build` (auto-generates types via `prebuild`)
3. `runner`: Production-only deps, non-root user `nextjs`, port 3000

**Build arg**: `STORYBLOK_ACCESS_TOKEN` required for type generation at build time.

### CI/CD Pipeline (GitHub Actions)

**Branch strategy**: `main` (dev) → PR → `master` (production)

**On PR to master**: Runs lint, format, type-check workflows in parallel  
**On merge to master**:

1. Build Docker image with Storyblok token
2. Push to AWS ECR (tag: `latest` + commit SHA)
3. SSH to EC2, pull image, restart container
4. Clean Docker cache + yarn cache on EC2

**Required secrets**: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `ECR_REPOSITORY`, `EC2_HOST`, `EC2_USERNAME`, `EC2_SSH_KEY`, `STORYBLOK_ACCESS_TOKEN`

## Critical Don'ts & Dos

❌ **Don't** import from `@storyblok/react` - always use `@storyblok/react/rsc`  
❌ **Don't** register components in `StoryblokProvider` - use `src/lib/storyblok.ts` components object  
❌ **Don't** use `dangerouslySetInnerHTML` - use server-side `getInlineStyles()` pattern  
❌ **Don't** forget to run `yarn generate-types` after adding/modifying Storyblok content types

✅ **Do** default to Server Components unless client interactivity needed  
✅ **Do** spread `{...storyblokEditable(blok)}` on root element of Storyblok components  
✅ **Do** use `getStoryPath()` for Storyblok URL conversions (handles `blog/` prefix)  
✅ **Do** use `JSON.stringify(data, null, 2)` for console.log debugging objects
