"use client"

import { Switch } from "@/app/components/ui/switch"
import { Input } from "@/app/components/ui/input"
import { Skeleton } from "@/app/components/ui/skeleton"
import { useProduct } from "@/app/hook/useProduct"
import { parseDecimalInput } from "@/app/utils/parseDecimalInput"
import {
  QUICK_COMMISSION_OPTIONS,
  QUICK_INCREMENT_OPTIONS,
  QUICK_POUND_OPTIONS
} from "@/app/components/cotizador-rapido/constants"
import { cn } from "@/app/lib/utils"

type Props = {
  className?: string
}

function OptionButton({
  active,
  label,
  onClick
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg border px-2.5 py-1.5 text-[12px] font-semibold transition-colors",
        active
          ? "border-primary/50 bg-primary/15 text-primary"
          : "border-input bg-background text-muted-foreground hover:border-primary/35 hover:bg-accent hover:text-foreground"
      )}
    >
      {label}
    </button>
  )
}

export function QuickQuoteConfigPanel({ className }: Props) {
  const {
    trm,
    setTrm,
    companyCommission,
    setCompanyCommission,
    deliveryCost,
    setDeliveryCost,
    costByPound,
    setCostByPound,
    porcentageIncrease,
    setPorcentageIncrease,
    isTrmChanging,
    setIsTrmChanging,
    loading
  } = useProduct()

  return (
    <section
      className={cn(
        "flex flex-col rounded-2xl border border-input bg-background/60 p-4 space-y-5",
        className
      )}
    >
      <div className="mb-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
          Paso 2
        </p>
        <h2 className="text-[20px] font-extrabold leading-none tracking-[-0.02em] text-foreground">
          Configuración rápida
        </h2>
      </div>

      <div className="space-y-3">
        <div className="rounded-xl border border-input bg-background p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              TRM
            </p>
            <label className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
              Manual
              <Switch
                checked={isTrmChanging}
                onCheckedChange={setIsTrmChanging}
              />
            </label>
          </div>

          {loading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Input
              type="number"
              step="any"
              value={trm || ""}
              disabled={!isTrmChanging}
              onChange={(e) => setTrm(parseDecimalInput(e.target.value))}
              placeholder="4150"
              className="h-10 text-center text-[18px] font-extrabold disabled:opacity-90"
            />
          )}
        </div>

        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Comisión COP
          </p>
          <div className="flex gap-1.5">
            {QUICK_COMMISSION_OPTIONS.map((option) => (
              <OptionButton
                key={option.value}
                active={companyCommission === option.value}
                label={option.label}
                onClick={() => setCompanyCommission(option.value)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Incremento %
          </p>
          <div className="flex gap-1.5">
            {QUICK_INCREMENT_OPTIONS.map((option) => (
              <OptionButton
                key={option.value}
                active={porcentageIncrease === option.value}
                label={option.label}
                onClick={() => setPorcentageIncrease(option.value)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Costo por libra
          </p>
          <div className="flex gap-1.5">
            {QUICK_POUND_OPTIONS.map((option) => (
              <OptionButton
                key={option.value}
                active={costByPound === option.value}
                label={option.label}
                onClick={() => setCostByPound(option.value)}
              />
            ))}
          </div>
        </div>
      </div>

      <label className="mt-auto flex items-center justify-between rounded-xl border border-input bg-background px-3 py-2">
        <span className="text-[18px] font-semibold text-foreground">
          Envío fijo +$10.000
        </span>
        <Switch
          checked={deliveryCost > 0}
          onCheckedChange={(checked) => setDeliveryCost(checked ? 10000 : 0)}
        />
      </label>
    </section>
  )
}
