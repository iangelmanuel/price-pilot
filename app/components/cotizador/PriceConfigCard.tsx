"use client"

import { useProduct } from "@/app/hook/useProduct"
import { parseDecimalInput } from "@/app/utils/parseDecimalInput"
import { formatCop } from "@/app/utils/formatCurrency"
import { Switch } from "@/app/components/ui/switch"
import { Skeleton } from "@/app/components/ui/skeleton"
import { Separator } from "@/app/components/ui/separator"
import { cn } from "@/app/lib/utils"

const COMMISSION_OPTIONS = [
  { label: "+0", value: 0 },
  { label: "+150", value: 150 },
  { label: "+200", value: 200 },
  { label: "+300", value: 300 }
]

const INCREMENT_OPTIONS = [
  { label: "0%", value: 1 },
  { label: "+15%", value: 1.15 },
  { label: "+20%", value: 1.2 }
]

const POUND_OPTIONS = [
  { label: "+0", value: 0 },
  { label: "+18.000", value: 18000 },
  { label: "+30.000", value: 30000 }
]

function Pill({
  label,
  active,
  onClick
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg border px-2.5 py-1 text-[12px] font-semibold transition-all",
        active
          ? "border-primary/30 bg-primary/10 text-primary"
          : "border-border bg-secondary/40 text-muted-foreground hover:border-border/80 hover:bg-secondary hover:text-foreground"
      )}
    >
      {label}
    </button>
  )
}

function SwitchRow({
  label,
  checked,
  onChange,
  disabled
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center justify-between rounded-xl border border-border bg-secondary/30 px-3 py-2.5",
        disabled && "cursor-not-allowed opacity-40"
      )}
    >
      <span className="text-[13px] font-medium text-foreground">{label}</span>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
      />
    </label>
  )
}

export function PriceConfigCard() {
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
    loading,
    shippingMode
  } = useProduct()

  const isAmazon = shippingMode === "amazon"

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {/* TRM */}
      <div className="border-b border-border/60 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          TRM · Comisión
        </p>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/30 px-3 py-2.5">
          <span className="text-[13px] font-semibold text-muted-foreground">
            1 USD =
          </span>
          {loading ? (
            <Skeleton className="h-5 w-24" />
          ) : (
            <input
              type="number"
              step="any"
              disabled={!isTrmChanging}
              value={trm || ""}
              onChange={(e) => setTrm(parseDecimalInput(e.target.value))}
              placeholder="4150"
              className={cn(
                "flex-1 bg-transparent text-[14px] font-bold text-foreground outline-none",
                "disabled:text-muted-foreground",
                "focus:text-primary"
              )}
            />
          )}
          <label className="flex cursor-pointer items-center gap-1.5 text-[12px] text-muted-foreground">
            <span>Manual</span>
            <Switch
              checked={isTrmChanging}
              onCheckedChange={setIsTrmChanging}
            />
          </label>
        </div>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {COMMISSION_OPTIONS.map((opt) => (
            <Pill
              key={opt.value}
              label={opt.label}
              active={companyCommission === opt.value}
              onClick={() => setCompanyCommission(opt.value)}
            />
          ))}
        </div>

        <p className="mt-2 text-[12px] text-muted-foreground">
          Tasa efectiva:{" "}
          <strong className="text-primary">
            {loading ? "…" : formatCop(trm + companyCommission)}
          </strong>
          /USD
        </p>
      </div>

      <Separator />

      {/* Adjustments */}
      <div className="border-b border-border/60 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Ajustes rápidos
        </p>
      </div>

      <div className="p-4">
        <div className="space-y-2">
          <SwitchRow
            label="Envío +$10.000"
            checked={deliveryCost > 0}
            onChange={(v) => setDeliveryCost(v ? 10000 : 0)}
          />

          <div className="space-y-1.5">
            <p className="text-[12px] font-semibold text-muted-foreground">
              Incremento
            </p>
            <div className="flex flex-wrap gap-1.5">
              {INCREMENT_OPTIONS.map((opt) => (
                <Pill
                  key={opt.value}
                  label={opt.label}
                  active={porcentageIncrease === opt.value}
                  onClick={() => setPorcentageIncrease(opt.value)}
                />
              ))}
            </div>
          </div>

          <div className={cn("space-y-1.5", isAmazon && "opacity-40")}>
            <p className="text-[12px] font-semibold text-muted-foreground">
              Costo por libra
              {isAmazon && (
                <span className="ml-1 font-normal">(Casillero only)</span>
              )}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {POUND_OPTIONS.map((opt) => (
                <Pill
                  key={opt.value}
                  label={opt.label}
                  active={costByPound === opt.value}
                  onClick={() => !isAmazon && setCostByPound(opt.value)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
