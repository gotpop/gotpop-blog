import { getAvailableStoriesForError } from "@gotpop/storyblok"
import Link from "next/link"

export default async function NotFound() {
  const availableStories = await getAvailableStoriesForError()

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>

      <div style={{ marginTop: "2rem" }}>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            backgroundColor: "#0070f3",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          Go Home
        </Link>
      </div>

      {availableStories && availableStories.length > 0 && (
        <div style={{ marginTop: "3rem" }}>
          <h2>Available Pages:</h2>
          <ul>
            {availableStories.map((slug) => (
              <li key={slug}>
                <Link href={`/${slug}`}>{slug}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
