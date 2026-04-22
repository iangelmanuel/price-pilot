"use client"

import { Package, Truck } from "lucide-react"
import { useProduct } from "@/app/hook/useProduct"
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { cn } from "@/app/lib/utils"

const MODES = [
  {
    value: "amazon" as const,
    label: "Amazon Directo",
    icon: Package,
    delivery: "15 días hábiles",
    detail: "Envío estándar incluido",
    colorClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-500/10 border-amber-500/20",
  },
  {
    value: "casillero" as const,
    label: "Casillero",
    icon: Truck,
    delivery: "20 días hábiles",
    detail: "Tarifa por libra activa",
    colorClass: "text-sky-600 dark:text-sky-400",
    bgClass: "bg-sky-500/10 border-sky-500/20",
  },
]

export function ShippingModeSelector() {
  const { shippingMode, setShippingMode } = useProduct()
  const active = MODES.find((m) => m.value === shippingMode)!

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        Modo de envío
      </p>

      <Tabs
        value={shippingMode}
        onValueChange={(v) => setShippingMode(v as "amazon" | "casillero")}
      >
        <TabsList className="w-full">
          {MODES.map(({ value, label, icon: Icon }) => (
            <TabsTrigger key={value} value={value} className="flex-1 gap-1.5">
              <Icon className="size-4 shrink-0" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className={cn("mt-3 flex items-center gap-3 rounded-xl border px-3.5 py-2.5", active.bgClass)}>
        <active.icon className={cn("size-5 shrink-0", active.colorClass)} />
        <div>
          <p className={cn("text-[13px] font-semibold leading-tight", active.colorClass)}>
            {active.label}
          </p>
          <p className="text-[12px] text-muted-foreground">
            {active.detail} · {active.delivery}
          </p>
        </div>
      </div>
    </div>
  )
}
