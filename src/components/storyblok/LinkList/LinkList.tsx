import { StoryblokServerComponent } from "@/components"
import type { LinkListStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"

interface LinkListProps {
  blok: LinkListStoryblok
}

export default function LinkList({ blok }: LinkListProps) {
  const styles = getInlineStyles("LinkList.css")

  return (
    <div className="link-list">
      {styles && <style>{styles}</style>}

      {blok.heading && <h3 className="link-list-heading">{blok.heading}</h3>}

      {blok.links && blok.links.length > 0 && (
        <ul className="link-list-items">
          {blok.links.map((linkItem) => (
            <li key={linkItem._uid}>
              <StoryblokServerComponent blok={linkItem} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
