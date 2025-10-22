import Link from "next/link"
import { getStoryPath } from "@/lib/storyblok-utils"
import type { PostStory } from "@/utils/tags"
import Typography from "../../Typography"

interface PostCardProps {
  post: PostStory
}

export default function PostCard({ post }: PostCardProps) {
  console.log("Post data:", JSON.stringify(post, null, 2))
  const linkPath = getStoryPath(post.full_slug)
  const title = post.content?.Heading || post.name || "Untitled"
  const description = post.content?.description || ""

  // Use custom published_date field if available, fallback to published_at
  const dateToUse = post.content?.published_date || post.published_at

  const publishedDate = new Date(dateToUse).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <article className="post-card">
      <style>{`
        .post-card {
          background: white;
          border: 1px solid var(--color-border, #e2e8f0);
          border-radius: 8px;
          padding: 1.5rem;
          transition: all 0.2s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .post-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-color: var(--color-primary, #3b82f6);
        }

        .post-card-content {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .post-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .post-card-date {
          font-size: 0.875rem;
          color: var(--color-text-secondary, #64748b);
          font-weight: 500;
        }

        .post-card-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .post-card-tag {
          background: var(--color-background-secondary, #f1f5f9);
          color: var(--color-text-secondary, #64748b);
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-weight: 500;
        }

        .post-card-title {
          margin-bottom: 0.75rem;
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.3;
        }

        .post-card-title-link {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .post-card-title-link:hover {
          color: var(--color-primary, #3b82f6);
        }

        .post-card-description {
          margin-bottom: 1rem;
          flex-grow: 1;
          line-height: 1.6;
          color: var(--color-text-secondary, #64748b);
        }

        .post-card-read-more {
          color: var(--color-primary, #3b82f6);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.875rem;
          margin-top: auto;
          transition: color 0.2s ease;
        }

        .post-card-read-more:hover {
          color: var(--color-primary-dark, #2563eb);
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .post-card {
            padding: 1rem;
          }
          
          .post-card-meta {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
      <div className="post-card-content">
        <div className="post-card-meta">
          <time dateTime={dateToUse} className="post-card-date">
            {publishedDate}
          </time>
          {post.content?.tags && (
            <div className="post-card-tags">
              {post.content.tags.map((tag) => (
                <span key={tag} className="post-card-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <Typography tag="h3" variant="lg" shade="dark">
          <Link href={linkPath} className="post-card-title-link">
            {title}
          </Link>
        </Typography>

        {description && <p className="post-card-description">{description}</p>}

        <Link href={linkPath} className="post-card-read-more">
          Read more
        </Link>
      </div>
    </article>
  )
}
