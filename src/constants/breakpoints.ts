export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  large: 1480,
  xlarge: 1920,
} as const

export const MEDIA_QUERIES = {
  mobile: `(width >= ${BREAKPOINTS.mobile}px)`,
  tablet: `(width >= ${BREAKPOINTS.tablet}px)`,
  desktop: `(width >= ${BREAKPOINTS.desktop}px)`,
  large: `(width >= ${BREAKPOINTS.large}px)`,
  xlarge: `(width >= ${BREAKPOINTS.xlarge}px)`,
} as const

export type BreakpointKey = keyof typeof BREAKPOINTS
export type MediaQueryKey = keyof typeof MEDIA_QUERIES
