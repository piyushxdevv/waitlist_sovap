import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import localFont from "next/font/local"
import { Suspense } from "react"
import "./globals.css"

const customFont = localFont({
  src: "../public/fonts/custom-font.woff2",
  variable: "--font-custom",
  display: "swap",
})

const headlineFont = localFont({
  src: "../public/fonts/headline-font.woff2",
  variable: "--font-headline",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#111827",
}

export const metadata: Metadata = {
  title: "SOVAP - Your Personalized AI Tutor",
  description: "A 24/7 smart mentor that adapts to your level, speed, and goals—taking you from beginner to cybersecurity engineer. Join our waitlist for early access.",
  keywords: "cybersecurity, AI tutor, personalized learning, ethical hacking, penetration testing, cybersecurity education, CEH, OSCP, CISSP",
  authors: [{ name: "SOVAP Team" }],
  creator: "SOVAP",
  publisher: "SOVAP",
  robots: "index, follow",
  openGraph: {
    title: "SOVAP - Your Personalized AI Tutor for Cybersecurity",
    description: "A 24/7 smart mentor that adapts to your level, speed, and goals—taking you from beginner to engineer.",
    url: "https://sovap.com",
    siteName: "SOVAP",
    type: "website",
    images: [
      {
        url: "/placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "SOVAP - AI-Powered Cybersecurity Learning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOVAP - Your Personalized AI Tutor for Cybersecurity",
    description: "A 24/7 smart mentor that adapts to your level, speed, and goals—taking you from beginner to cybersecurity engineer.",
    images: ["/placeholder.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${customFont.variable} ${headlineFont.variable} antialiased`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
