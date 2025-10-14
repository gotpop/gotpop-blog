import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import type { Metadata } from "next";
import StoryblokProvider from "@/components/StoryblokProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog - gotpop.io",
  description: "Personal blog built with Next.js and Storyblok",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoryblokProvider>{children}</StoryblokProvider>
        {/* Storyblok Bridge for Visual Editor */}
        <Script
          src="//app.storyblok.com/f/storyblok-v2-latest.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
