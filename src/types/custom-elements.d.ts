// Custom HTML Elements Type Declarations
// This allows TypeScript to recognize custom element tags

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "box-hero": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >
      "box-grid": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >
    }
  }
}

export {}
