import "./globals.css"

import type { Metadata } from "next"
import localFont from "next/font/local"
import Script from "next/script"
import StoryblokProvider from "@/providers/StoryblokProvider"

const inter = localFont({
  src: "../../node_modules/@gotpop/system/src/fonts/inter/Inter.woff2",
  variable: "--font-inter",
  display: "swap",
})

const monaspace = localFont({
  src: "../../node_modules/@gotpop/system/src/fonts/monaspace/Monaspace.woff2",
  variable: "--font-monaspace",
  display: "swap",
})

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
        <StoryblokProvider>{children}</StoryblokProvider>
      </body>
    </html>
  )
}
