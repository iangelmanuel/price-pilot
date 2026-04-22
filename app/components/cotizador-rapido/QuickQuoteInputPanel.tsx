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
    <div className="rounded-xl border border-border bg-secondary/30 px-3 py-2">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
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
        "flex flex-col overflow-hidden rounded-2xl border border-border bg-card",
        className
      )}
    >
      <div className="border-b border-border/60 px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
          Paso 1
        </p>
        <h2 className="mt-0.5 text-[18px] font-extrabold leading-none tracking-[-0.02em] text-foreground">
          Datos rápidos
        </h2>
        <p className="mt-1 text-[12px] text-muted-foreground">
          Solo completa precio y libras.
        </p>
      </div>

      <div className="flex flex-1 flex-col space-y-4 p-4">
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
                className={cn(
                  "h-12 pl-8 text-[20px] font-extrabold",
                  businessPrice > 0 && "border-primary/40 bg-primary/8 text-primary"
                )}
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

        <div className="grid grid-cols-2 gap-2">
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
      </div>
    </section>
  )
}
