# Storyblok Visual Editor Setup - Complete ✅

## What Changed

We've successfully migrated to the @storyblok/react v4+ RSC (React Server Components) pattern for full Visual Editor support.

### Key Changes Made

1. **lib/storyblok.ts** - Server-side SDK initialization
   - Uses `@storyblok/react/rsc` 
   - Registers all components for server-side rendering
   - Exports `getStoryblokApi()` for fetching data

2. **StoryblokProvider** - Client-side re-initialization  
   - Re-initializes SDK on client without component registration
   - Enables Visual Editor bridge communication

3. **page.tsx** - Uses StoryblokStory component
   - Fetches data with `getStoryblokApi()`
   - Renders with `<StoryblokStory story={data.story} />`
   - Automatic Visual Editor support

4. **All Storyblok components** - Use RSC imports
   - Changed from `@storyblok/react` to `@storyblok/react/rsc`
   - Keep `storyblokEditable(blok)` attributes for click-to-edit

## How It Works

### Server Side:
1. `lib/storyblok.ts` initializes SDK with components
2. `page.tsx` uses `getStoryblokApi()` to fetch story data
3. `StoryblokStory` component renders the content

### Client Side:
1. `StoryblokProvider` re-initializes SDK (without components)
2. Storyblok bridge script loads from layout.tsx
3. Visual Editor communicates with your Next.js app
4. Components with `storyblokEditable()` become clickable

## Testing the Visual Editor

1. **Make sure both servers are running:**
   ```bash
   npm run dev           # Port 3000
   local-ssl-proxy --source 3010 --target 3000 --cert localhost.pem --key localhost-key.pem
   ```

2. **Configure Storyblok:**
   - Go to Settings → Visual Editor in your Storyblok space
   - Set Preview URL: `https://localhost:3010/`
   - Set Real Path: `https://localhost:3010/[full_slug]`

3. **Open a story:**
   - Navigate to a story in Storyblok (e.g., `blog/posts/post-1`)
   - The Visual Editor should load the preview
   - Components should have blue outlines when you hover
   - Click on components to edit them in the sidebar

## Key Features

✅ **Live Preview** - See your content in the Visual Editor  
✅ **Click-to-Edit** - Click on components to select them  
✅ **Auto-reload** - Changes trigger page reloads  
✅ **Server Components** - Full Next.js RSC support  
✅ **Type Safety** - Auto-generated types for all components  
✅ **CSS Inlining** - Server-side CSS reading with no client-side overhead  

## Architecture

```
┌─────────────────────────────────────────────┐
│ Storyblok Visual Editor (Browser)          │
│ https://app.storyblok.com                  │
└──────────────────┬──────────────────────────┘
                   │ iframe preview
                   ↓
┌─────────────────────────────────────────────┐
│ Your Next.js App                            │
│ https://localhost:3010                      │
│                                             │
│  ┌─────────────────────────────────┐       │
│  │ Storyblok Bridge Script         │       │
│  │ (loaded in layout.tsx)          │       │
│  └─────────────┬───────────────────┘       │
│                │                            │
│                ↓                            │
│  ┌─────────────────────────────────┐       │
│  │ StoryblokProvider (Client)      │       │
│  │ Re-initializes SDK              │       │
│  └─────────────┬───────────────────┘       │
│                │                            │
│                ↓                            │
│  ┌─────────────────────────────────┐       │
│  │ StoryblokStory Component        │       │
│  │ (renders story content)         │       │
│  └─────────────┬───────────────────┘       │
│                │                            │
│                ↓                            │
│  ┌─────────────────────────────────┐       │
│  │ Individual Components           │       │
│  │ (with storyblokEditable)        │       │
│  │ - HeaderDefault                 │       │
│  │ - HeroDefault                   │       │
│  │ - etc.                          │       │
│  └─────────────────────────────────┘       │
└─────────────────────────────────────────────┘
```

## Troubleshooting

### Visual Editor shows "Loading..."
- Check browser console for errors
- Verify HTTPS proxy is running on port 3010
- Ensure preview URL in Storyblok is correct

### Components not clickable
- Verify all components have `{...storyblokEditable(blok)}`
- Check that `storyblokEditable` is imported from `@storyblok/react/rsc`
- Ensure story data includes `_uid` and `component` fields

### "Cannot read properties of undefined"
- Check that the story path matches your folder structure in Storyblok
- Verify the story exists under the `blog/` folder
- Check that the slug handling in page.tsx is correct

## Next Steps

- ✅ Visual Editor is ready to use
- Test creating new content in Storyblok
- Customize component styles
- Add more content types as needed
