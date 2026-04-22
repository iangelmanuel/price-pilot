"use client"

import { useState } from "react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/app/components/ui/tabs"
import { cn } from "@/app/lib/utils"
import { QuickQuoteInputPanel } from "@/app/components/cotizador-rapido/QuickQuoteInputPanel"
import { QuickQuoteConfigPanel } from "@/app/components/cotizador-rapido/QuickQuoteConfigPanel"
import { QuickQuoteResultPanel } from "@/app/components/cotizador-rapido/QuickQuoteResultPanel"

type QuickTab = "datos" | "config" | "resultado"

export function QuickQuoteLayout() {
  const [mobileTab, setMobileTab] = useState<QuickTab>("datos")

  return (
    <section
      className="flex overflow-hidden rounded-2xl border border-border bg-card p-3 sm:p-4 lg:p-5"
      style={{ height: "calc(100dvh - 10rem)" }}
    >
      <div className="flex min-h-0 w-full flex-1 flex-col">
        <header className="mb-4 border-b border-border/60 pb-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
            Cotización rápida
          </p>
          <h1 className="mt-0.5 text-[24px] font-extrabold leading-none tracking-[-0.03em] text-foreground sm:text-[30px]">
            Cotizador exprés
          </h1>
          <p className="mt-1.5 text-[12px] text-muted-foreground sm:text-[13px]">
            Enfócate en lo esencial: precio, libras y ajustes clave. Todo
            visible en una sola pantalla.
          </p>
        </header>

        <div className="hidden grid-cols-3 gap-4 lg:grid items-stretch">
          <QuickQuoteInputPanel className="flex-1" />
          <QuickQuoteConfigPanel className="flex-1" />
          <QuickQuoteResultPanel className="flex-1" />
        </div>

        <Tabs
          value={mobileTab}
          onValueChange={(value) => setMobileTab(value as QuickTab)}
          className="flex min-h-0 flex-1 flex-col lg:hidden"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="datos">Datos</TabsTrigger>
            <TabsTrigger value="config">Config</TabsTrigger>
            <TabsTrigger value="resultado">Resultado</TabsTrigger>
          </TabsList>

          <TabsContent
            value="datos"
            className="min-h-0 flex-1"
          >
            <QuickQuoteInputPanel className={cn("h-full")} />
          </TabsContent>
          <TabsContent
            value="config"
            className="min-h-0 flex-1"
          >
            <QuickQuoteConfigPanel className={cn("h-full")} />
          </TabsContent>
          <TabsContent
            value="resultado"
            className="min-h-0 flex-1"
          >
            <QuickQuoteResultPanel className={cn("h-full")} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
