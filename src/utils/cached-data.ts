import { cache } from "react"
import {
  getAllPostsWithTags,
  getTagsFromDatasource,
} from "@/lib/storyblok/data"

/**
 * Cached version of getAllPostsWithTags using React's cache()
 * This ensures the function is only called once per request across all components
 */
export const getCachedPostsWithTags = cache(getAllPostsWithTags)

/**
 * Cached version of getTagsFromDatasource using React's cache()
 * This ensures the function is only called once per request across all components
 */
export const getCachedTags = cache(getTagsFromDatasource)
