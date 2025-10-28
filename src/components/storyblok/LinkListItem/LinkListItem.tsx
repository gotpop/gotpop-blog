import { storyblokEditable } from "@storyblok/react/rsc"
import type { LinkListItemStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"
import { getStoryblokLinkProps } from "@/utils/storyblok"

interface LinkListItemProps {
  blok: LinkListItemStoryblok
}

export default function LinkListItem({ blok }: LinkListItemProps) {
  const styles = getInlineStyles("LinkListItem.css")
  const linkProps = getStoryblokLinkProps(blok.link)

  return (
    <>
      {styles && <style>{styles}</style>}
      <a {...storyblokEditable(blok)} {...linkProps} className="link-list-item">
        {blok.link_text}
      </a>
    </>
  )
}
