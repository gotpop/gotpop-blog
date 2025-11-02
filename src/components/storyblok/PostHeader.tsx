import { useId } from "react"
import { formatDate } from "@/utils/date-formatter"
import { Typography } from "./Typography"

interface PostHeaderProps {
  heading?: string
  publishedDate?: string
  style?: React.CSSProperties
}

export default function PostHeader({
  heading,
  publishedDate,
  style,
}: PostHeaderProps) {
  const id = useId()

  if (!publishedDate || !heading) return null

  const formattedDate = formatDate(publishedDate)

  return (
    <box-grid aria-labelledby={id} style={style}>
      <Typography tag="h1" variant="text-xl" shade="dark" id={id}>
        {heading}
      </Typography>
      <Typography
        tag="time"
        variant="text-sm"
        shade="charcoal"
        dateTime={publishedDate}
      >
        {formattedDate}
      </Typography>
    </box-grid>
  )
}
