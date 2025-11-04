import type { LinkListStoryblok } from "@/types/storyblok-components"
import { Typography } from "../Typography"
import "./LinkList.css"

interface LinkListProps {
  blok: LinkListStoryblok
}

export function LinkList({ blok }: LinkListProps) {
  return (
    <link-list>
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
    </link-list>
  )
}
