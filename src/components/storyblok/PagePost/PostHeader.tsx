import { useId } from "react"
import { formatDate } from "@/utils/date-formatter"
import Typography from "../Typography"

interface PostHeaderProps {
  heading?: string
  publishedDate?: string
}

export default function PostHeader({
  heading,
  publishedDate,
}: PostHeaderProps) {
  const id = useId()

  if (!publishedDate || !heading) return null

  return (
    <box-hero aria-labelledby={id}>
      <div className="hero-content">
        <Typography tag="h1" variant="lg" shade="dark" id={id}>
          {heading}
        </Typography>
        <time dateTime={publishedDate}>{formatDate(publishedDate)}</time>
      </div>
    </box-hero>
  )
}
