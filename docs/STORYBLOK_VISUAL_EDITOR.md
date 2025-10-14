# Storyblok Visual Editor Configuration

## Checklist for Visual Editor

### 1. SSL Certificates ✅
- [x] Created SSL certificates with mkcert
- [x] HTTPS proxy running on port 3010

### 2. Storyblok Space Configuration

Go to your Storyblok space: https://app.storyblok.com/

#### Settings → Visual Editor

1. **Preview URL (Location)**
   ```
   https://localhost:3010/
   ```

2. **Real Path**
   
   **IMPORTANT:** Since your stories are in the `blog/` folder, use one of these:
   
   **Option A** - Use full slug (recommended):
   ```
   https://localhost:3010/[full_slug]
   ```
   
   **Option B** - Strip the "blog/" prefix:
   ```
   https://localhost:3010/[slug]
   ```
   
   Note: The code now handles both formats automatically. If the slug already starts with "blog/", it won't be duplicated.

3. **Preview Token** (Optional)
   - If you have a preview token, make sure it matches your `.env.local`

#### Important Notes:

- Make sure you're editing a story under the `blog/` folder
- The Visual Editor only works when you're **inside a story** in Storyblok
- You need to click "Open in Visual Editor" button in Storyblok

### 3. Check Your Story Settings

For each story you want to edit:

1. Go to the story in Storyblok
2. Click the "Entry configuration" (gear icon)
3. Make sure:
   - ✅ "Enable preview" is checked
   - ✅ The correct template is selected

### 4. Testing the Connection

1. **Open browser console** when in Storyblok Visual Editor
2. You should see messages like:
   ```
   StoryblokBridge: Handshake successful
   ```

3. If you see CORS errors or connection errors, check:
   - Is https://localhost:3010 actually loading your site?
   - Is the Storyblok bridge script loading? (Check Network tab)
   - Are you using the correct space ID?

### 5. Common Issues

#### Visual Editor shows "Loading..." forever

**Solution 1: Check the URL format**
- Try: `https://localhost:3010/[full_slug]`
- Or: `https://localhost:3010/[slug]`

**Solution 2: Check browser console**
- Open DevTools → Console
- Look for errors about Storyblok bridge

**Solution 3: Clear cache**
- Hard refresh the Visual Editor: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

#### Certificate/SSL errors

**Solution:**
```bash
# Reinstall the certificate
mkcert -install
```

Then restart your browser completely.

#### "Connection refused" or "Can't connect"

**Solution:**
```bash
# Check if proxy is running
lsof -i :3010

# Restart the proxy
npm run kill-ports
npm run dev:https
```

### 6. Advanced Configuration

If you need to customize the preview URL per content type:

1. Go to **Settings → Story Types**
2. Select your content type (e.g., "page_default")
3. Set custom "Preview URL" if needed

### 7. Verify Your Setup

Run these checks:

```bash
# 1. Check if dev server is running
curl http://localhost:3000

# 2. Check if HTTPS proxy is running
curl -k https://localhost:3010

# 3. Check if Storyblok bridge is loaded
# Visit https://localhost:3010 and check browser console
```

### 8. Example Working Configuration

**Storyblok Space Settings:**
- Preview URL: `https://localhost:3010/`
- Real Path: `https://localhost:3010/[full_slug]`

**Story Full Slug:** `blog/posts/my-first-post`

**Expected Preview URL:**
```
https://localhost:3010/blog/posts/my-first-post
```

---

## Still Not Working?

1. Check the browser console for errors
2. Verify your Storyblok access token in `.env.local`
3. Make sure you're editing a story (not viewing the story list)
4. Try opening the preview URL directly in a new tab first
5. Check if the `storyblok-v2-latest.js` script is loading in Network tab
