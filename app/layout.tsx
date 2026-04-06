import { Geist, Manrope, DM_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
})

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

const dmMono = DM_Mono({
  variable: "--font-dmMono",
  subsets: ["latin"],
  weight: ["400", "500"],
})

export const metadata = {
  title: "Zorvyn Vault",
  description:
    "A modern bento-style finance dashboard to track spending, analyze transactions, and visualize your financial health with clean UI and interactive charts.",

  keywords: [
    "finance dashboard",
    "expense tracker",
    "bento UI",
    "nextjs dashboard",
    "zorvyn vault",
  ],

  authors: [{ name: "Sahil Shangloo AKA doubleSdotdev" }],

  creator: "Sahil Shangloo",

  metadataBase: new URL("https://zorvyn-vault.vercel.app"),

  openGraph: {
    title: "Zorvyn Vault - Smart Finance Dashboard",
    description:
      "Track spending, view insights, and manage finances with a clean bento-style dashboard.",
    url: "https://zorvyn-vault.vercel.app",
    siteName: "Zorvyn Vault",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zorvyn Vault Dashboard Preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Zorvyn Vault - Smart Finance Dashboard",
    description: "Clean UI + powerful insights for your finances.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-96x96.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontSans.variable,
        "dmMono",
        dmMono.variable,
        "manrope",
        manrope.variable
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
