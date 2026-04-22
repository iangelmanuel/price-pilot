"use client"

import { useRef } from "react"
import { Link2, Copy, ExternalLink } from "lucide-react"
import { useProduct } from "@/app/hook/useProduct"
import { parseDecimalInput } from "@/app/utils/parseDecimalInput"
import { formatCop } from "@/app/utils/formatCurrency"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Button } from "@/app/components/ui/button"
import { cn } from "@/app/lib/utils"

type Props = {
  usdPriceRef?: React.RefObject<HTMLInputElement | null>
}

export function ProductSourceForm({ usdPriceRef }: Props) {
  const {
    productLink, setProductLink,
    couponCode, setCouponCode,
    pounds, setPounds,
    businessPrice, setBusinessPrice,
    previousBusinessPrice, setPreviousBusinessPrice,
    trm, companyCommission, porcentageIncrease, deliveryCost, costByPound,
  } = useProduct()

  const base = trm + companyCommission
  const prevCop =
    previousBusinessPrice > 0 && base > 0
      ? Math.ceil(
          (previousBusinessPrice * base * porcentageIncrease + deliveryCost + costByPound * pounds) / 1000
        ) * 1000
      : 0

  const internalRef = useRef<HTMLInputElement>(null)
  const priceRef = usdPriceRef ?? internalRef

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="border-b border-border/60 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Fuente del producto
        </p>
      </div>

      <div className="space-y-4 p-4">
        {/* Link */}
        <div>
          <Label htmlFor="product-link">Enlace del producto</Label>
          <div className="mt-1.5 flex gap-2">
            <div className="relative flex-1">
              <Link2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="product-link"
                value={productLink}
                onChange={(e) => setProductLink(e.target.value)}
                placeholder="https://amazon.com/dp/..."
                className="pl-9"
              />
            </div>
            <Button
              variant="secondary"
              size="icon"
              disabled={!productLink.trim()}
              onClick={() => navigator.clipboard.writeText(productLink)}
              title="Copiar link"
            >
              <Copy className="size-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              disabled={!productLink.trim()}
              onClick={() => window.open(productLink.trim(), "_blank")}
              title="Abrir en nueva pestaña"
            >
              <ExternalLink className="size-4" />
            </Button>
          </div>
        </div>

        {/* Precio USD — actual + anterior */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="business-price">
              Precio
              <span className="ml-1.5 font-normal text-muted-foreground">(USD)</span>
            </Label>
            <div className="relative mt-1.5">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[15px] font-semibold text-muted-foreground">
                $
              </span>
              <Input
                id="business-price"
                ref={priceRef}
                type="number"
                step="any"
                inputMode="decimal"
                value={businessPrice || ""}
                onChange={(e) => setBusinessPrice(parseDecimalInput(e.target.value))}
                placeholder="0.00"
                className={cn(
                  "pl-7 text-[16px] font-semibold",
                  businessPrice > 0 && "border-primary/40 bg-primary/8 text-primary"
                )}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="prev-business-price">
              Precio anterior
              <span className="ml-1 font-normal text-muted-foreground">(USD)</span>
              {prevCop > 0 && (
                <span className="ml-2 font-normal text-primary">
                  {formatCop(prevCop)}
                </span>
              )}
            </Label>
            <div className="relative mt-1.5">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[15px] font-semibold text-muted-foreground">
                $
              </span>
              <Input
                id="prev-business-price"
                type="number"
                step="any"
                inputMode="decimal"
                value={previousBusinessPrice || ""}
                onChange={(e) => setPreviousBusinessPrice(parseDecimalInput(e.target.value))}
                placeholder="0.00"
                className="pl-7"
              />
            </div>
          </div>
        </div>

        {/* Cupón + Libras */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="coupon">
              Cupón
              <span className="ml-1 font-normal text-muted-foreground">(opcional)</span>
            </Label>
            <div className="mt-1.5 flex gap-1.5">
              <Input
                id="coupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="SAVE20OFF"
                className="font-mono text-xs"
              />
              <Button
                variant="secondary"
                size="icon-sm"
                disabled={!couponCode}
                onClick={() => navigator.clipboard.writeText(couponCode)}
                title="Copiar cupón"
                className="shrink-0"
              >
                <Copy className="size-3.5" />
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="pounds">
              Libras
              <span className="ml-1 font-normal text-muted-foreground">(opcional)</span>
            </Label>
            <Input
              id="pounds"
              type="number"
              step="any"
              inputMode="decimal"
              value={pounds || ""}
              onChange={(e) => setPounds(parseDecimalInput(e.target.value))}
              placeholder="1.5"
              className="mt-1.5"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
