"use client"

import { Copy } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/app/components/ui/button"
import { useQuickQuote } from "@/app/hook/useQuickQuote"
import { formatCop } from "@/app/utils/formatCurrency"
import { cn } from "@/app/lib/utils"

type Props = {
  className?: string
}

function Row({
  label,
  value,
  strong = false
}: {
  label: string
  value: string
  strong?: boolean
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/20 bg-black/20 px-2.5 py-2">
      <span
        className={cn("text-[11px] text-zinc-300", strong && "font-semibold")}
      >
        {label}
      </span>
      <span
        className={cn(
          "text-[12px] text-zinc-100",
          strong && "font-bold text-white"
        )}
      >
        {value}
      </span>
    </div>
  )
}

export function QuickQuoteResultPanel({ className }: Props) {
  const { effectiveRate, subtotal, poundCost, finalPrice } = useQuickQuote()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(Math.ceil(finalPrice).toString())
    toast.success("Precio copiado")
  }

  return (
    <section
      className={cn(
        "flex flex-col rounded-2xl border border-primary-600/60 bg-linear-to-br from-primary-700 via-primary-800 to-primary-900 p-4 shadow-xl shadow-primary-900/30 space-y-5",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-300">
            Paso 3
          </p>
          <h2 className="text-[20px] font-extrabold leading-none tracking-[-0.02em] text-white">
            Resultado
          </h2>
        </div>
        <Button
          variant="secondary"
          size="icon-sm"
          onClick={handleCopy}
          className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          title="Copiar precio final"
        >
          <Copy className="size-3.5" />
        </Button>
      </div>

      <div className="mt-3 rounded-xl border border-white/20 bg-black/20 px-3 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-300">
          Precio final COP
        </p>
        <p className="mt-1 truncate text-[36px] font-extrabold leading-none tracking-[-0.03em] text-white">
          {formatCop(finalPrice)}
        </p>
      </div>

      <div className="mt-3 space-y-1.5">
        <Row
          label="Tasa efectiva"
          value={`${formatCop(effectiveRate)}/USD`}
        />
        <Row
          label="Subtotal (USD x tasa x %)"
          value={formatCop(subtotal)}
        />
        <Row
          label="Costo por libras"
          value={formatCop(poundCost)}
        />
        <Row
          label="Total"
          value={formatCop(finalPrice)}
          strong
        />
      </div>

      <p className="mt-auto pt-3 text-[11px] text-zinc-300">
        Tip: Ajusta TRM, incremento y costo por libra para comparar rápido.
      </p>
    </section>
  )
}
