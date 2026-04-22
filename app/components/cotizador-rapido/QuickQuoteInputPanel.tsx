"use client"

import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Button } from "@/app/components/ui/button"
import { useProduct } from "@/app/hook/useProduct"
import { useQuickQuote } from "@/app/hook/useQuickQuote"
import { parseDecimalInput } from "@/app/utils/parseDecimalInput"
import { formatCop } from "@/app/utils/formatCurrency"
import { cn } from "@/app/lib/utils"

type Props = {
  className?: string
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-input bg-muted/50 px-3 py-2">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-[15px] font-bold leading-none text-foreground">
        {value}
      </p>
    </div>
  )
}

export function QuickQuoteInputPanel({ className }: Props) {
  const { businessPrice, setBusinessPrice, pounds, setPounds } = useProduct()
  const { baseCop, poundCost } = useQuickQuote()

  const clearQuickInputs = () => {
    setBusinessPrice(0)
    setPounds(0)
  }

  return (
    <section
      className={cn(
        "flex flex-col rounded-2xl border border-input bg-background/60 p-4 space-y-5",
        className
      )}
    >
      <div className="mb-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
          Paso 1
        </p>
        <h2 className="text-[20px] font-extrabold leading-none tracking-[-0.02em] text-foreground">
          Datos rápidos
        </h2>
        <p className="mt-1 text-[12px] text-muted-foreground">
          Solo completa precio y libras.
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <Label htmlFor="quick-price">Precio (USD)</Label>
          <div className="relative mt-1.5">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[15px] font-semibold text-muted-foreground">
              $
            </span>
            <Input
              id="quick-price"
              type="number"
              step="any"
              inputMode="decimal"
              value={businessPrice || ""}
              onChange={(e) =>
                setBusinessPrice(parseDecimalInput(e.target.value))
              }
              placeholder="49.99"
              className="h-12 pl-8 text-[20px] font-extrabold"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="quick-pounds">Libras</Label>
          <Input
            id="quick-pounds"
            type="number"
            step="any"
            inputMode="decimal"
            value={pounds || ""}
            onChange={(e) => setPounds(parseDecimalInput(e.target.value))}
            placeholder="1.5"
            className="mt-1.5 h-12 text-[20px] font-extrabold"
          />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <MiniStat
          label="Base COP"
          value={businessPrice > 0 ? formatCop(baseCop) : "-"}
        />
        <MiniStat
          label="Costo libras"
          value={pounds > 0 ? formatCop(poundCost) : "-"}
        />
      </div>

      <Button
        variant="secondary"
        className="mt-auto"
        onClick={clearQuickInputs}
      >
        Limpiar precio y libras
      </Button>
    </section>
  )
}
