import { Topbar } from "@/app/components/shared/Topbar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard de cotización",
  description: "Panel interno de PricePilot para gestionar cotizaciones y mensajes de WhatsApp.",
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Topbar />
      <main className="mx-auto w-full max-w-[1800px] px-4 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7">
        {children}
      </main>
    </div>
  )
}
