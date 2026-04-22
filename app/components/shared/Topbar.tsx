"use client"

import { Trash2, Sun, Moon } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { useProduct } from "@/app/hook/useProduct"
import { useTheme } from "@/app/hook/useTheme"
import { usePathname } from "next/navigation"
import { Navigation } from "./Navigation"

export function Topbar() {
  const pathname = usePathname()
  const { clearData } = useProduct()
  const { dark, toggle } = useTheme()
  const isCrearProducto = pathname === "/crear-producto"

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 px-4 py-3 backdrop-blur sm:px-6 lg:h-[88px] lg:px-7 lg:py-0">
      <div className="flex items-center gap-3 lg:h-full">
        <div className="hidden rounded-xl border border-border bg-muted px-3 py-1.5 sm:block">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Panel interno
          </p>
        </div>

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          {isCrearProducto && (
            <Button
              variant="secondary"
              onClick={clearData}
              className="border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20"
            >
              <Trash2 className="size-4" />
              Limpiar datos
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="rounded-full"
            title={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          <div className="hidden h-9 w-px bg-border sm:block" />

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-[14px] font-semibold leading-tight text-foreground">
                Angel De La Torre
              </p>
              <p className="text-[12px] leading-tight text-muted-foreground">
                Administrador
              </p>
            </div>
            <div className="size-9 rounded-full bg-[radial-gradient(circle_at_30%_30%,#f6c7a8_0%,#e9a47f_60%,#d98763_100%)] sm:size-10" />
          </div>
        </div>
      </div>

      <nav className="mt-3 grid grid-cols-2 gap-2 lg:hidden">
        <Navigation />
      </nav>
    </header>
  )
}
