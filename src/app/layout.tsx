import type React from "react"
import { Poppins } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SocialSidebar from "@/components/social-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Adarsh Defence and Sports Academy Jodhpur</title>
        <meta name="description" content="Premier institution dedicated to empowering young minds to achieve excellence in defence and sports. Founded on principles of discipline, hard work, and teamwork." />
        <meta name="keywords" content="defence academy, sports academy, NDA preparation, Jodhpur, training, coaching, defence training, sports coaching, best academy, Rajasthan, SSB, physical fitness, leadership, academic support, sports excellence, holistic development, Adarsh Academy, Adarsh Defence, Adarsh Sports, defence career, sports career, military training, army, navy, air force, best defence academy in Jodhpur, best sports academy in Jodhpur, defence and sports academy, Adarsh Defence and Sports Academy Jodhpur" />
        <meta name="author" content="Adarsh Defence and Sports Academy" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#ea5e21" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="en" />
        {/* Open Graph */}
        <meta property="og:title" content="Adarsh Defence and Sports Academy Jodhpur" />
        <meta property="og:description" content="Premier institution for defence and sports training in Jodhpur" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://adarshedu.com/" />
        <meta property="og:site_name" content="Adarsh Defence and Sports Academy Jodhpur" />
        <meta property="og:image" content="https://adarshedu.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Adarsh Defence and Sports Academy Jodhpur" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@adarshedu" />
        <meta name="twitter:title" content="Adarsh Defence and Sports Academy Jodhpur" />
        <meta name="twitter:description" content="Premier institution for defence and sports training in Jodhpur" />
        <meta name="twitter:image" content="https://adarshedu.com/og-image.jpg" />
        {/* Canonical and alternate */}
        <link rel="canonical" href="https://adarshedu.com/" />
        <link rel="alternate" href="https://adarshedu.com/" hrefLang="en" />
        {/* Favicons */}
        <link rel="icon" href="/assets/favicons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/assets/favicons/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/assets/favicons/android-chrome-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${poppins.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <Navbar />
            {children}
            <Footer />
            <SocialSidebar />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
