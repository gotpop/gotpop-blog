// Storyblok API response types

export interface StoryblokStoryResponse {
  full_slug: string
  slug: string
  content: unknown
  // Add other fields as needed
}

export interface StoryblokStoriesResponse {
  stories: StoryblokStoryResponse[]
}
