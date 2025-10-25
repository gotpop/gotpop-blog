import { useId } from "react"
import Hero from "@/components/ui/Hero"
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
    <Hero id={id} className="page-post-header">
      <Typography tag="h1" variant="lg" shade="dark" id={id}>
        {heading}
      </Typography>
      {publishedDate && (
        <time dateTime={publishedDate}>{formatDate(publishedDate)}</time>
      )}
    </Hero>
  )
}
