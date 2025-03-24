import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ClerkProvider } from "@clerk/nextjs"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ConvexReactClient } from "convex/react"
import { useConvex } from "convex/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "StudPal - Student Resource Organization",
  description: "A centralized platform for students to digitally organize academic resources",
  icons: {
    icon: "/favicon.ico",
  },
  generator: 'v0.dev'
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClerkProvider>
            <ConvexProviderWithClerk client={convex}>
              <div className="flex h-screen bg-background">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header />
                  <main className="flex-1 overflow-y-auto">{children}</main>
                </div>
              </div>
              <Toaster />
            </ConvexProviderWithClerk>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'
