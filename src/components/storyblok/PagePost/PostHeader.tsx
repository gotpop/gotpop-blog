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

  return (
    <section aria-labelledby={id} className="page-post-header">
      <Typography tag="h1" variant="lg" shade="dark" id={id}>
        {heading}
      </Typography>
      {publishedDate && (
        <time dateTime={publishedDate}>{formatDate(publishedDate)}</time>
      )}
    </section>
  )
}
