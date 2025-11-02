import type { LinkListStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"
import { Typography } from "../Typography"

interface LinkListProps {
  blok: LinkListStoryblok
}

export function LinkList({ blok }: LinkListProps) {
  const styles = getInlineStyles("LinkList.css")

  return (
    <div>
      {styles && <style>{styles}</style>}

      <div className="link-list-heading">
        <Typography tag="h4" variant="text-xl" shade="light">
          {blok.heading}
        </Typography>
      </div>

      {blok.links && blok.links.length > 0 && (
        <ul className="link-list-items">
          {blok.links.map((linkItem) => (
            <li key={linkItem._uid}>
              <a href={linkItem.link.url} className="link-list-item">
                {linkItem.link_text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
