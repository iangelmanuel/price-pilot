import { Sidebar } from "@/app/components/shared/Sidebar"
import { Topbar } from "@/app/components/shared/Topbar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard de cotización",
  description:
    "Panel interno de PricePilot para gestionar cotizaciones, ajustes de conversión y vista previa de mensajes para clientes."
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f5f9ff_0%,#eef4ff_28%,#f8fafc_100%)] text-neutral-900">
      <div className="flex min-h-screen">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <section className="flex min-w-0 flex-1 flex-col">
          <Topbar />

          <main className="mx-auto w-full max-w-425 px-4 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7">
            {children}
          </main>
        </section>
      </div>
    </div>
  )
}
