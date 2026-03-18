import type { Metadata } from "next"
import { ProductProvider } from "@/app/provider/ProductProvider"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: {
    default: "PricePilot | Sistema de cotización de productos",
    template: "%s | PricePilot"
  },
  description:
    "PricePilot es un sistema para cotizar productos en COP, calcular márgenes y generar mensajes de WhatsApp de forma rápida y precisa.",
  keywords: [
    "cotización de productos",
    "calculadora COP",
    "TRM",
    "PricePilot",
    "dashboard de productos",
    "mensajes de WhatsApp"
  ]
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`selection:bg-primary-200 selection:text-primary-900 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProductProvider>{children}</ProductProvider>
      </body>
    </html>
  )
}
