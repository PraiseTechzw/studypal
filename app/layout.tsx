import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "StudPal - Student Resource Organization",
  description: "A centralized platform for students to digitally organize academic resources",
  icons: {
    icon: "/favicon.ico",
  },
}

// Modify the RootLayout component to include redirect logic
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // This is a simplified example - in a real app, you would check authentication status
  // const isAuthenticated = checkAuthStatus()
  // if (isAuthenticated && pathname === '/') {
  //   redirect('/dashboard')
  // }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex h-screen bg-background">
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

