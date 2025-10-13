import { components } from "@/components/storyblok";

export function StoryblokServerComponent({ blok }: { blok: any }) {
  // Handle null, undefined, or empty bloks
  if (!blok) {
    return null;
  }

  // If it's not a proper blok object, return null
  if (typeof blok !== "object" || !blok.component) {
    return null;
  }

  const Component = components[blok.component as keyof typeof components];

  if (!Component) {
    console.warn(`Component ${blok.component} doesn't exist.`);
    return (
      <div
        style={{ padding: "1rem", background: "#fee", border: "1px solid red" }}
      >
        Component <code>{blok.component}</code> doesn&apos;t exist.
      </div>
    );
  }

  return <Component blok={blok} />;
}
