import type React from "react"
import type { Metadata } from "next/metadata"
import { Merriweather, Roboto } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
})

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-merriweather",
})

export const metadata: Metadata = {
  title: "عليم",
  description: "نلخّص المعرفة، ونرسمها لك. أول تطبيق عربي يحوّل الكتب إلى ملخّصات مصوّرة بالذكاء الاصطناعي",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${roboto.variable} ${merriweather.variable} font-sans bg-white text-black`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
