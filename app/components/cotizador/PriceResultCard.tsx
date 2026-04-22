"use client"

import { Copy, TrendingUp } from "lucide-react"
import { toast } from "sonner"
import { useProduct } from "@/app/hook/useProduct"
import { formatCop } from "@/app/utils/formatCurrency"
import { Button } from "@/app/components/ui/button"
import { Skeleton } from "@/app/components/ui/skeleton"
import { cn } from "@/app/lib/utils"

function BreakdownTile({
  label,
  value,
  highlight = false
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 rounded-xl border px-3 py-2.5",
        highlight
          ? "border-white/35 bg-white/20"
          : "border-white/20 bg-black/20"
      )}
    >
      <span
        className={cn(
          "text-[11px] font-semibold uppercase tracking-widest",
          highlight ? "text-white" : "text-zinc-300"
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "text-[14px] font-bold",
          highlight ? "text-white" : "text-zinc-100"
        )}
      >
        {value}
      </span>
    </div>
  )
}

export function PriceResultCard() {
  const {
    businessPrice,
    trm,
    companyCommission,
    deliveryCost,
    pounds,
    costByPound,
    porcentageIncrease,
    loading
  } = useProduct()

  const effectiveRate = trm + companyCommission
  const poundCost = costByPound * pounds
  const finalPrice =
    businessPrice * effectiveRate * porcentageIncrease +
    deliveryCost +
    poundCost

  const handleCopy = async () => {
    await navigator.clipboard.writeText(Math.ceil(finalPrice).toString())
    toast.success("Precio copiado")
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-primary-600/60 bg-linear-to-br from-primary-700 via-primary-800 to-primary-900 shadow-xl shadow-primary-900/35">
      {/* Main price */}
      <div className="px-5 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-300">
              Precio Final
            </p>
            {loading ? (
              <Skeleton className="mt-2 h-12 w-48 bg-white/20" />
            ) : (
              <p className="mt-1 truncate text-[42px] font-extrabold leading-none tracking-[-0.03em] text-white sm:text-[48px]">
                {formatCop(finalPrice)}
              </p>
            )}
            <div className="mt-2 flex items-center gap-1.5">
              <TrendingUp className="size-3.5 text-zinc-200" />
              <p className="text-[12px] font-medium text-zinc-200">
                Tasa efectiva:{" "}
                <span className="font-bold text-white">
                  {loading ? "—" : formatCop(effectiveRate)}/USD
                </span>
              </p>
            </div>
          </div>

          <Button
            onClick={handleCopy}
            disabled={!finalPrice || loading}
            variant="secondary"
            size="icon"
            className="mt-1 shrink-0 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            title="Copiar número"
          >
            <Copy className="size-4" />
          </Button>
        </div>
      </div>

      {/* Breakdown */}
      <div className="border-t border-white/20 bg-black/20 px-4 pb-4">
        <p className="mb-2 pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-300">
          Desglose
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <BreakdownTile
            label="Base"
            value={formatCop(businessPrice * effectiveRate)}
          />
          <BreakdownTile
            label="Envío"
            value={formatCop(deliveryCost)}
          />
          <BreakdownTile
            label="Libra"
            value={formatCop(poundCost)}
          />
          <BreakdownTile
            label="Total"
            value={formatCop(finalPrice)}
            highlight
          />
        </div>
      </div>
    </div>
  )
}
