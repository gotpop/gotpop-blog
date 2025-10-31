import { getInlineStyles } from "@/utils/inline-styles"
import ButtonToggleMenuClient from "./ButtonToggleMenuClient"

// Server Component: Handles CSS loading at build time
export default function ButtonToggleMenu() {
  const styles = getInlineStyles("ButtonToggleMenu.css")

  // Pass styles to client component for hydration
  return <ButtonToggleMenuClient styles={styles} />
}
