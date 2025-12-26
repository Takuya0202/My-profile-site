import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Header from "@/components/origin/layouts/header"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Takuya0202",
  description: "Takuya0202's portfolio site",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased
          flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black`}
      >
        <div className="w-full max-w-[1200px] mx-auto px-4">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
