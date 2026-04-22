"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import { readStreamableValue } from "@ai-sdk/rsc"
import { generateWhatsappAiMessage } from "@/app/actions/generateWhatsappAiMessage"

export type ShippingMode = "amazon" | "casillero"
export type ProductCategory = "general" | "ropa"

const STORAGE_KEY_V2 = "price-pilot:price-settings:v2"
const STORAGE_KEY_V1 = "price-pilot:price-settings:v1"

type StoredV2 = {
  trm: number
  companyCommission: number
  deliveryCost: number
  costByPound: number
  porcentageIncrease: number
  isTrmChanging: boolean
  shippingMode: ShippingMode
  productCategory: ProductCategory
  lastProductCode: number
  autoAdvanceCode: boolean
}

type StoredV1 = {
  trm: number
  companyCommission: number
  deliveryCost: number
  costByPound: number
  porcentageIncrease: number
  isTrmChanging: boolean
}

type TrmResponse = { data: { mid: number } }

export type ProductContextType = {
  productLink: string
  couponCode: string
  pounds: number
  businessPrice: number
  previousBusinessPrice: number
  setProductLink: (v: string) => void
  setCouponCode: (v: string) => void
  setPounds: (v: number) => void
  setBusinessPrice: (v: number) => void
  setPreviousBusinessPrice: (v: number) => void

  aiProductCode: string
  aiCurrentPrice: number
  aiPreviousPrice: number
  aiTitle: string
  aiDescription: string
  aiGeneratedMessage: string
  isAiGenerating: boolean
  setAiProductCode: (v: string) => void
  setAiCurrentPrice: (v: number) => void
  setAiPreviousPrice: (v: number) => void
  setAiTitle: (v: string) => void
  setAiDescription: (v: string) => void
  generateAiMessage: () => Promise<{ ok: boolean; error?: string }>
  clearAiMessage: () => void

  trm: number
  companyCommission: number
  deliveryCost: number
  costByPound: number
  porcentageIncrease: number
  setTrm: (v: number) => void
  setCompanyCommission: (v: number) => void
  setDeliveryCost: (v: number) => void
  setCostByPound: (v: number) => void
  setPorcentageIncrease: (v: number) => void

  shippingMode: ShippingMode
  productCategory: ProductCategory
  lastProductCode: number
  autoAdvanceCode: boolean
  setShippingMode: (mode: ShippingMode) => void
  setProductCategory: (cat: ProductCategory) => void
  advanceProductCode: () => void
  setAutoAdvanceCode: (v: boolean) => void

  loading: boolean
  isTrmChanging: boolean
  setLoading: (v: boolean) => void
  setIsTrmChanging: (v: boolean) => void
  clearData: () => void
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  // Product source
  const [productLink, setProductLink] = useState("")
  const [couponCode, setCouponCode] = useState("")
  const [pounds, setPounds] = useState(0)
  const [businessPrice, setBusinessPrice] = useState(0)
  const [previousBusinessPrice, setPreviousBusinessPrice] = useState(0)

  // AI fields
  const [aiProductCode, setAiProductCode] = useState("")
  const [aiCurrentPrice, setAiCurrentPrice] = useState(0)
  const [aiPreviousPrice, setAiPreviousPrice] = useState(0)
  const [aiTitle, setAiTitle] = useState("")
  const [aiDescription, setAiDescription] = useState("")
  const [aiGeneratedMessage, setAiGeneratedMessage] = useState("")
  const [isAiGenerating, setIsAiGenerating] = useState(false)

  // Pricing — default: $10K shipping active for both modes
  const [trm, setTrm] = useState(0)
  const [companyCommission, setCompanyCommission] = useState(0)
  const [deliveryCost, setDeliveryCost] = useState(10000)
  const [costByPound, setCostByPound] = useState(0)
  const [porcentageIncrease, setPorcentageIncrease] = useState(1)

  // Mode + category + code
  const [shippingMode, setShippingModeState] = useState<ShippingMode>("amazon")
  const [productCategory, setProductCategoryState] = useState<ProductCategory>("general")
  const [lastProductCode, setLastProductCode] = useState(0)
  const [autoAdvanceCode, setAutoAdvanceCode] = useState(true)

  // Settings
  const [loading, setLoading] = useState(false)
  const [isTrmChanging, setIsTrmChanging] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  /* ── Hydrate from localStorage ──────────────────────────────── */
  useEffect(() => {
    try {
      const rawV2 = localStorage.getItem(STORAGE_KEY_V2)
      if (rawV2) {
        const p = JSON.parse(rawV2) as Partial<StoredV2>
        if (typeof p.trm === "number") setTrm(p.trm)
        if (typeof p.companyCommission === "number") setCompanyCommission(p.companyCommission)
        if (typeof p.deliveryCost === "number") setDeliveryCost(p.deliveryCost)
        if (typeof p.costByPound === "number") setCostByPound(p.costByPound)
        if (typeof p.porcentageIncrease === "number") setPorcentageIncrease(p.porcentageIncrease)
        if (typeof p.isTrmChanging === "boolean") setIsTrmChanging(p.isTrmChanging)
        if (p.shippingMode === "amazon" || p.shippingMode === "casillero") setShippingModeState(p.shippingMode)
        if (p.productCategory === "general" || p.productCategory === "ropa") setProductCategoryState(p.productCategory)
        if (typeof p.lastProductCode === "number") setLastProductCode(p.lastProductCode)
        if (typeof p.autoAdvanceCode === "boolean") setAutoAdvanceCode(p.autoAdvanceCode)
        setHydrated(true)
        return
      }
      // Migrate v1
      const rawV1 = localStorage.getItem(STORAGE_KEY_V1)
      if (rawV1) {
        const p = JSON.parse(rawV1) as Partial<StoredV1>
        if (typeof p.trm === "number") setTrm(p.trm)
        if (typeof p.companyCommission === "number") setCompanyCommission(p.companyCommission)
        if (typeof p.deliveryCost === "number") setDeliveryCost(p.deliveryCost)
        if (typeof p.costByPound === "number") setCostByPound(p.costByPound)
        if (typeof p.porcentageIncrease === "number") setPorcentageIncrease(p.porcentageIncrease)
        if (typeof p.isTrmChanging === "boolean") setIsTrmChanging(p.isTrmChanging)
      }
    } catch {
      // ignore
    } finally {
      setHydrated(true)
    }
  }, [])

  /* ── Persist settings ───────────────────────────────────────── */
  useEffect(() => {
    if (!hydrated) return
    const data: StoredV2 = {
      trm, companyCommission, deliveryCost, costByPound, porcentageIncrease,
      isTrmChanging, shippingMode, productCategory, lastProductCode, autoAdvanceCode,
    }
    try {
      localStorage.setItem(STORAGE_KEY_V2, JSON.stringify(data))
    } catch { /* ignore */ }
  }, [
    trm, companyCommission, deliveryCost, costByPound, porcentageIncrease,
    isTrmChanging, shippingMode, productCategory, lastProductCode, autoAdvanceCode, hydrated,
  ])

  /* ── TRM fetch ──────────────────────────────────────────────── */
  useEffect(() => {
    if (!hydrated) return
    if (isTrmChanging && trm > 0) return
    const fetch_ = async () => {
      setLoading(true)
      try {
        const res = await fetch("https://hexarate.paikama.co/api/rates/USD/COP/latest")
        const data: TrmResponse = await res.json()
        setTrm(Math.ceil(data.data.mid))
      } catch { /* keep existing */ } finally {
        setLoading(false)
      }
    }
    void fetch_()
  }, [hydrated, isTrmChanging]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Mode setter — NO auto-config of deliveryCost ───────────── */
  const setShippingMode = (mode: ShippingMode) => {
    setShippingModeState(mode)
    // Only switch pound cost visibility — delivery cost stays as user configured
    if (mode === "amazon") {
      setCostByPound(0)
    }
  }

  const setProductCategory = (cat: ProductCategory) => {
    setProductCategoryState(cat)
  }

  const advanceProductCode = () => {
    const next = lastProductCode >= 999 ? 1 : lastProductCode + 1
    setLastProductCode(next)
    setAiProductCode(String(next).padStart(3, "0"))
  }

  /* ── AI generation ──────────────────────────────────────────── */
  const generateAiMessage = async () => {
    setAiGeneratedMessage("")
    setIsAiGenerating(true)

    const result = await generateWhatsappAiMessage({
      productCode: aiProductCode,
      currentPrice: aiCurrentPrice,
      previousPrice: aiPreviousPrice,
      title: aiTitle,
      description: aiDescription,
      shippingMode,
      productCategory,
    })

    if (!result.ok) {
      setIsAiGenerating(false)
      return { ok: false as const, error: result.error }
    }

    try {
      let accumulated = ""
      for await (const chunk of readStreamableValue(result.stream)) {
        if (typeof chunk === "string" && chunk) {
          accumulated = chunk.startsWith(accumulated) ? chunk : accumulated + chunk
          setAiGeneratedMessage(accumulated)
        }
      }
    } finally {
      setIsAiGenerating(false)
      if (autoAdvanceCode) advanceProductCode()
    }

    return { ok: true as const }
  }

  const clearAiMessage = () => setAiGeneratedMessage("")

  const clearData = () => {
    setProductLink("")
    setBusinessPrice(0)
    setPreviousBusinessPrice(0)
    setCouponCode("")
    setPounds(0)
    setAiProductCode("")
    setAiCurrentPrice(0)
    setAiPreviousPrice(0)
    setAiTitle("")
    setAiDescription("")
    setAiGeneratedMessage("")
    setIsAiGenerating(false)
    setProductCategoryState("general")
  }

  const value: ProductContextType = {
    productLink, couponCode, pounds, businessPrice, previousBusinessPrice,
    setProductLink, setCouponCode, setPounds, setBusinessPrice, setPreviousBusinessPrice,

    aiProductCode, aiCurrentPrice, aiPreviousPrice, aiTitle,
    aiDescription, aiGeneratedMessage, isAiGenerating,
    setAiProductCode, setAiCurrentPrice, setAiPreviousPrice,
    setAiTitle, setAiDescription, generateAiMessage, clearAiMessage,

    trm, companyCommission, deliveryCost, costByPound, porcentageIncrease,
    setTrm, setCompanyCommission, setDeliveryCost, setCostByPound, setPorcentageIncrease,

    shippingMode, productCategory, lastProductCode, autoAdvanceCode,
    setShippingMode, setProductCategory, advanceProductCode, setAutoAdvanceCode,

    loading, isTrmChanging, setLoading, setIsTrmChanging, clearData,
  }

  return <ProductContext value={value}>{children}</ProductContext>
}
