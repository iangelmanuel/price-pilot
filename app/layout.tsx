import type { Metadata } from "next"
import { ProductProvider } from "@/app/provider/ProductProvider"
import { Toaster } from "@/app/components/ui/sonner"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "PricePilot | Sistema de cotización",
    template: "%s | PricePilot",
  },
  description:
    "PricePilot: cotiza productos en COP, calcula márgenes y genera mensajes de WhatsApp.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      {/* Apply theme before first paint to avoid flash */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('price-pilot:theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t===null&&p)){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProductProvider>{children}</ProductProvider>
        <Toaster />
      </body>
    </html>
  )
}
