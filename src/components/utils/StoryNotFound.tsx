interface StoryNotFoundProps {
  path: string
  errorMessage: string
  availableStories?: string[]
}

export function StoryNotFound({
  path,
  errorMessage,
  availableStories = [],
}: StoryNotFoundProps) {
  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>Story not found</h1>
      <p>
        Looking for: <code>{path}</code>
      </p>
      <p>Error: {errorMessage}</p>

      {availableStories.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Available stories in your blog folder:</h2>
          <ul>
            {availableStories.map((slug) => (
              <li key={slug}>
                <code>{slug}</code>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p style={{ marginTop: "2rem" }}>
        Make sure you have a story at this path in your Storyblok space under
        the &quot;blog&quot; folder.
      </p>
    </div>
  )
}
