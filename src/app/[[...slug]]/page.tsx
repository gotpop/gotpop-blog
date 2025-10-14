import StoryblokClient from "storyblok-js-client";
import { StoryblokServerComponent } from "@/components/StoryblokServerComponent";

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN || "",
  region: "eu",
});

export const dynamicParams = true;

export async function generateStaticParams() {
  const { data } = await Storyblok.get("cdn/stories", {
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

  // If no slug (root path), use "blog/", otherwise prepend "blog/"
  const fullPath = slug && slug.length > 0 ? `blog/${slug.join("/")}` : "blog/";

  try {
    const { data } = await Storyblok.get(`cdn/stories/${fullPath}`, {
      version: "draft",
    });

    // console.log("Story data:", JSON.stringify(data.story.content, null, 2));

    return (
      <div style={{ minHeight: "100vh" }}>
        <StoryblokServerComponent blok={data.story.content} />
      </div>
    );
  } catch (error: any) {
    // Try to get all stories to show what's available
    let availableStories = [];
    try {
      const { data } = await Storyblok.get("cdn/stories", {
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
