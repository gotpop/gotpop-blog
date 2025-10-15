import "./globals.css"

import type { Metadata } from "next"
import Script from "next/script"
import StoryblokProvider from "@/components/StoryblokProvider"
import TempScript from "@/components/TempScript"
import localFont from "next/font/local"

const inter = localFont({
  src: "../fonts/inter/Inter.woff2",
  variable: "--font-inter",
  display: "swap",
})

const monaspace = localFont({
  src: "../fonts/monaspace/Monaspace.woff2",
  variable: "--font-monaspace",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Blog - gotpop.io",
  description: "Personal blog built with Next.js and Storyblok",
  icons: {
    icon: "/favicon.ico",
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

        {/* Temporary: Load legacy JS from non-Next.js project */}
        <TempScript />

        {/* Storyblok Bridge for Visual Editor */}
        <Script
          src="//app.storyblok.com/f/storyblok-v2-latest.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}
