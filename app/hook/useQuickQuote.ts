"use client"

import { useMemo } from "react"
import { useProduct } from "@/app/hook/useProduct"

export function useQuickQuote() {
  const {
    businessPrice,
    pounds,
    trm,
    companyCommission,
    deliveryCost,
    costByPound,
    porcentageIncrease
  } = useProduct()

  return useMemo(() => {
    const usd = Math.max(0, businessPrice)
    const safePounds = Math.max(0, pounds)
    const effectiveRate = Math.max(0, trm + companyCommission)
    const baseCop = usd * effectiveRate
    const subtotal = baseCop * Math.max(0, porcentageIncrease)
    const poundCost = costByPound * safePounds
    const finalPrice = subtotal + Math.max(0, deliveryCost) + poundCost

    return {
      usd,
      safePounds,
      effectiveRate,
      baseCop,
      subtotal,
      poundCost,
      finalPrice
    }
  }, [
    businessPrice,
    pounds,
    trm,
    companyCommission,
    deliveryCost,
    costByPound,
    porcentageIncrease
  ])
}
