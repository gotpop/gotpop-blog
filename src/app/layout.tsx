import "@gotpop/system/styles"
import { inter, monaspace } from "@gotpop/system/fonts"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - gotpop.io",
  description: "Personal blog built with Next.js and Storyblok",
  icons: {
    icon: "/logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${monaspace.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
