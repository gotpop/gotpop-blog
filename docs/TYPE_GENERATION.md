# Storyblok Type Generation

This project includes automatic TypeScript type generation from your Storyblok components.

## How it Works

The type generation system:
1. Fetches all stories from your Storyblok space
2. Extracts all unique component types used across your content
3. Generates TypeScript interfaces for each component
4. Outputs a single types file at `src/types/storyblok-components.ts`

## Usage

### Generate Types Manually

```bash
npm run generate-types
```

or

```bash
npm run types
```

### Auto-generate Types on Development

To automatically regenerate types when you make changes in Storyblok, you can add a pre-dev script or run it manually when needed.

## Generated File

The generated file (`src/types/storyblok-components.ts`) includes:

- **Base types**: `AssetStoryblok`, `MultilinkStoryblok`, `RichtextStoryblok`
- **Component union type**: `StoryblokComponent` - a union of all your component types
- **Individual interfaces**: One for each component (e.g., `PageDefaultStoryblok`, `HeroDefaultStoryblok`)

## Configuration

The type generation is configured in `scripts/generate-storyblok-types.js`:

- **Token**: Uses `STORYBLOK_ACCESS_TOKEN` from `.env.local`
- **Output path**: `src/types/storyblok-components.ts`
- **Naming convention**: Components are converted to PascalCase with "Storyblok" suffix

## Components Detected

Currently generating types for:
- page_default → `PageDefaultStoryblok`
- hero_default → `HeroDefaultStoryblok`
- cards → `CardsStoryblok`
- card → `CardStoryblok`
- footer_default → `FooterDefaultStoryblok`
- header_default → `HeaderDefaultStoryblok`
- nav_default → `NavDefaultStoryblok`
- nav_item_default → `NavItemDefaultStoryblok`
- logo_default → `LogoDefaultStoryblok`
- page_post → `PagePostStoryblok`
- And more...

## Importing Types

```typescript
import { 
  PageDefaultStoryblok, 
  HeroDefaultStoryblok,
  StoryblokComponent 
} from '@/types/storyblok-components';

interface Props {
  blok: HeroDefaultStoryblok;
}
```

## Limitations

Since we're using the CDN API (preview token), we can't access the full component schema. The generated types include:
- `component`: The component name
- `_uid`: Unique identifier
- `[k: string]: any`: Catch-all for any additional fields

For more detailed types with specific field definitions, you would need:
1. A Management API token (not preview token)
2. Access to the components endpoint with schema information

## Troubleshooting

### 401 Unauthorized
- Make sure `STORYBLOK_ACCESS_TOKEN` is set in `.env.local`
- Ensure the token has access to your space

### Missing Components
- The script only detects components that are actually used in your stories
- Create content using the component in Storyblok, then regenerate types

### Type Conflicts
- The auto-generated file should not be edited manually
- If you need custom types, create them in a separate file and extend the generated types
