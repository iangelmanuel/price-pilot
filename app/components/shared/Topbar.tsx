"use client"

import { Button, IconButton } from "@/app/components/ui/button"
import { useProduct } from "@/app/hook/useProduct"
import { Clipboard, Trash2 } from "lucide-react"
import { usePathname } from "next/navigation"
import { BellIcon } from "../dashboard/icons"
import { Navigation } from "./Navigation"

export function Topbar() {
  const pathname = usePathname()
  const {
    clearData,
    aiProductCode,
    aiTitle,
    aiCurrentPrice,
    aiPreviousPrice,
    aiDescription
  } = useProduct()
  const isCreateProductPage = pathname === "/crear-producto"

  const handleCopyProductData = async () => {
    const payload = [
      `Código del producto: ${aiProductCode}`,
      `Título del producto: ${aiTitle}`,
      `Precio actual: ${aiCurrentPrice ? String(aiCurrentPrice) : ""}`,
      `Precio anterior: ${aiPreviousPrice ? String(aiPreviousPrice) : ""}`,
      `Descripción: ${aiDescription}`
    ].join("\n")

    await navigator.clipboard.writeText(payload)
  }

  return (
    <header className="sticky top-0 z-20 border-b border-primary-100 bg-white/80 px-4 py-3 backdrop-blur sm:px-6 lg:h-20 lg:px-7 lg:py-0">
      <div className="flex items-center gap-3 lg:h-full">
        <div className="hidden rounded-xl border border-primary-100 bg-primary-50 px-3 py-1.5 sm:block">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-primary-700">
            Panel interno
          </p>
        </div>

        <div className="ml-auto flex items-center gap-3 sm:gap-5 sm:pl-6">
          {isCreateProductPage && (
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="md"
                onClick={handleCopyProductData}
                className="min-h-10 border-primary-200 bg-primary-50 px-4 text-primary-700 active:scale-95 hover:border-primary-300 hover:bg-primary-100 hover:text-primary-800"
              >
                <Clipboard className="h-4 w-4" />
                Copiar datos
              </Button>

              <Button
                variant="secondary"
                size="md"
                onClick={clearData}
                className="min-h-10 border-red-200 bg-red-50 px-4 text-red-700 active:scale-95 hover:border-red-300 hover:bg-red-100 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4" />
                Limpiar datos
              </Button>
            </div>
          )}

          <IconButton rounded="full">
            <BellIcon className="h-4.5 w-4.5" />
          </IconButton>

          <div className="hidden h-10 w-px bg-primary-100 sm:block" />

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-[14px] font-semibold leading-tight text-neutral-800">
                Angel De La Torre
              </p>
              <p className="text-[12px] leading-tight text-neutral-400">
                Administrador
              </p>
            </div>

            <div className="h-9 w-9 rounded-full bg-[radial-gradient(circle_at_30%_30%,#f6c7a8_0%,#e9a47f_60%,#d98763_100%)] sm:h-10 sm:w-10" />
          </div>
        </div>
      </div>

      <nav className="mt-3 grid grid-cols-2 gap-2 lg:hidden">
        <Navigation />
      </nav>
    </header>
  )
}
