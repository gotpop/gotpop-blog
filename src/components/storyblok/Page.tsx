import { storyblokEditable } from "@storyblok/react"
import { StoryblokComponent } from "@/types"

export default function Page({ blok }: StoryblokComponent) {
  return (
    <main {...storyblokEditable(blok)} className="page">
      {blok.body?.map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  )
}