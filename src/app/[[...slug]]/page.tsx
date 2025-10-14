import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/lib/storyblok";

export const dynamicParams = true;

export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories", {
    version: "published",
    starts_with: "blog/",
  });

  return data.stories
    .filter(
      (story: any) =>
        !story.full_slug.includes("/config") &&
        !story.full_slug.includes("/global") &&
        story.full_slug !== "blog/"
    )
    .map((story: any) => ({
      slug: story.full_slug.replace("blog/", "").split("/"),
    }));
}

interface PageParams {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function Page({ params }: PageParams) {
  const { slug } = await params;

  // Build the path from slug segments
  let fullPath: string;

  if (!slug || slug.length === 0) {
    // Root path - use "blog/"
    fullPath = "blog/";
  } else {
    // Join the slug segments
    const joinedSlug = slug.join("/");

    // Handle different cases:
    // 1. If slug is exactly "blog" (root page from Storyblok preview)
    if (joinedSlug === "blog") {
      fullPath = "blog/";
    }
    // 2. If the slug already starts with "blog/", use it as-is (from Storyblok preview)
    else if (joinedSlug.startsWith("blog/")) {
      fullPath = joinedSlug;
    }
    // 3. Otherwise, prepend "blog/" (normal navigation)
    else {
      fullPath = `blog/${joinedSlug}`;
    }
  }

  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get(`cdn/stories/${fullPath}`, {
      version: "draft",
    });

    // Use StoryblokStory component for automatic Visual Editor support
    return <StoryblokStory story={data.story} />;
  } catch (error: any) {
    // Try to get all stories to show what's available
    let availableStories = [];
    try {
      const storyblokApi = getStoryblokApi();
      const { data } = await storyblokApi.get("cdn/stories", {
        version: "draft",
        starts_with: "blog/",
      });
      availableStories = data.stories.map((s: any) => s.full_slug);
    } catch (e) {
      // Ignore if we can't fetch stories
    }

    return (
      <div style={{ padding: "2rem", fontFamily: "monospace" }}>
        <h1>Story not found</h1>
        <p>
          Looking for: <code>{fullPath}</code>
        </p>
        <p>Error: {error.message}</p>

        {availableStories.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <h2>Available stories in your blog folder:</h2>
            <ul>
              {availableStories.map((slug: string) => (
                <li key={slug}>
                  <code>{slug}</code>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p style={{ marginTop: "2rem" }}>
          Make sure you have a story at this path in your Storyblok space under
          the &quot;blog&quot; folder.
        </p>
      </div>
    );
  }
}
