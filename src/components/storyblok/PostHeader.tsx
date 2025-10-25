import { useId } from "react"
import { formatDate } from "@/utils/date-formatter"
import Typography from "./Typography"

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
      <box-grid>
        <Typography tag="h1" variant="lg" shade="dark" id={id}>
          {heading}
        </Typography>
        <Typography
          tag="time"
          variant="base"
          shade="dark"
          dateTime={publishedDate}
        >
          {formatDate(publishedDate)}
        </Typography>
      </box-grid>
    </box-hero>
  )
}
