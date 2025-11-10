// Storyblok API response types

export interface StoryblokStoryResponse<T = unknown> {
  full_slug: string
  slug: string
  content: T
  // Add other fields as needed
}

export interface StoryblokStoriesResponse {
  stories: StoryblokStoryResponse[]
}
