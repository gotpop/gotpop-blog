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

  const formattedDate = formatDate(publishedDate)

  return (
    <box-grid aria-labelledby={id}>
      <Typography tag="h1" variant="text-lg" shade="dark" id={id}>
        {heading}
      </Typography>
      <Typography
        tag="time"
        variant="text-base"
        shade="dark"
        dateTime={publishedDate}
      >
        {formattedDate}
      </Typography>
    </box-grid>
  )
}
