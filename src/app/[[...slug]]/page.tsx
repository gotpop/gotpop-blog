import { StoryblokComponent } from "@storyblok/react";
import { getStoryblokApi } from "@storyblok/react";

export const dynamicParams = true;

export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories", {
    version: "published",
    excluding_slugs: "config/*,global/*",
  });

  return data.stories.map((story: any) => ({
    slug: story.full_slug.split("/"),
  }));
}

interface PageParams {
  params: {
    slug: string[];
  };
}

export default async function Page({ params }: PageParams) {
  const storyblokApi = getStoryblokApi();

  const slug = params.slug ? params.slug.join("/") : "home";

  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version: "published",
  });

  return <StoryblokComponent blok={data.blok} />;
}
