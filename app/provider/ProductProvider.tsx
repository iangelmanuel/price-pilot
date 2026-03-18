"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import { readStreamableValue } from "@ai-sdk/rsc"
import { generateWhatsappAiMessage } from "@/app/actions/generateWhatsappAiMessage"

const PRICE_SETTINGS_STORAGE_KEY = "price-pilot:price-settings:v1"

type StoredPriceSettings = {
  trm: number
  companyCommission: number
  deliveryCost: number
  costByPound: number
  porcentageIncrease: number
  isTrmChanging: boolean
}

type ProductContextType = {
  // Data
  productLink: string
  couponCode: string
  pounds: number
  businessPrice: number

  setProductLink: (link: string) => void
  setCouponCode: (code: string) => void
  setPounds: (value: number) => void
  setBusinessPrice: (price: number) => void

  // AI data
  aiProductCode: string
  aiCurrentPrice: number
  aiPreviousPrice: number
  aiTitle: string
  aiDescription: string
  aiGeneratedMessage: string
  isAiGenerating: boolean
  setAiProductCode: (value: string) => void
  setAiCurrentPrice: (value: number) => void
  setAiPreviousPrice: (value: number) => void
  setAiTitle: (value: string) => void
  setAiDescription: (value: string) => void
  generateAiMessage: () => Promise<{ ok: boolean; error?: string }>
  clearAiMessage: () => void

  // Price
  trm: number
  companyCommission: number
  deliveryCost: number
  costByPound: number
  porcentageIncrease: number
  setTrm: (trm: number) => void
  setCompanyCommission: (commission: number) => void
  setDeliveryCost: (cost: number) => void
  setCostByPound: (cost: number) => void
  setPorcentageIncrease: (value: number) => void

  // Settings
  loading: boolean
  isTrmChanging: boolean
  setLoading: (value: boolean) => void
  setIsTrmChanging: (value: boolean) => void
  clearData: () => void
}

type TrmType = {
  status_code: number
  data: {
    base: string
    target: string
    mid: number
    unit: number
    timestamp: Date
  }
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
)

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  // Data
  const [productLink, setProductLink] = useState("")
  const [couponCode, setCouponCode] = useState("")
  const [pounds, setPounds] = useState(0)
  const [businessPrice, setBusinessPrice] = useState(0)

  // AI
  const [aiProductCode, setAiProductCode] = useState("")
  const [aiCurrentPrice, setAiCurrentPrice] = useState(0)
  const [aiPreviousPrice, setAiPreviousPrice] = useState(0)
  const [aiTitle, setAiTitle] = useState("")
  const [aiDescription, setAiDescription] = useState("")
  const [aiGeneratedMessage, setAiGeneratedMessage] = useState("")
  const [isAiGenerating, setIsAiGenerating] = useState(false)

  // Price
  const [trm, setTrm] = useState(0)
  const [companyCommission, setCompanyCommission] = useState(0)
  const [deliveryCost, setDeliveryCost] = useState(0)
  const [costByPound, setCostByPound] = useState(0)
  const [porcentageIncrease, setPorcentageIncrease] = useState(1)

  // Settings
  const [loading, setLoading] = useState(false)
  const [isTrmChanging, setIsTrmChanging] = useState(false)
  const [isSettingsHydrated, setIsSettingsHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PRICE_SETTINGS_STORAGE_KEY)

      if (!raw) {
        setIsSettingsHydrated(true)
        return
      }

      const parsed = JSON.parse(raw) as Partial<StoredPriceSettings>

      if (typeof parsed.trm === "number" && Number.isFinite(parsed.trm)) {
        setTrm(parsed.trm)
      }

      if (
        typeof parsed.companyCommission === "number" &&
        Number.isFinite(parsed.companyCommission)
      ) {
        setCompanyCommission(parsed.companyCommission)
      }

      if (
        typeof parsed.deliveryCost === "number" &&
        Number.isFinite(parsed.deliveryCost)
      ) {
        setDeliveryCost(parsed.deliveryCost)
      }

      if (
        typeof parsed.costByPound === "number" &&
        Number.isFinite(parsed.costByPound)
      ) {
        setCostByPound(parsed.costByPound)
      }

      if (
        typeof parsed.porcentageIncrease === "number" &&
        Number.isFinite(parsed.porcentageIncrease)
      ) {
        setPorcentageIncrease(parsed.porcentageIncrease)
      }

      if (typeof parsed.isTrmChanging === "boolean") {
        setIsTrmChanging(parsed.isTrmChanging)
      }
    } catch (error) {
      console.error("Error hydrating price settings:", error)
    } finally {
      setIsSettingsHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!isSettingsHydrated) return

    const settings: StoredPriceSettings = {
      trm,
      companyCommission,
      deliveryCost,
      costByPound,
      porcentageIncrease,
      isTrmChanging
    }

    try {
      localStorage.setItem(PRICE_SETTINGS_STORAGE_KEY, JSON.stringify(settings))
    } catch (error) {
      console.error("Error saving price settings:", error)
    }
  }, [
    trm,
    companyCommission,
    deliveryCost,
    costByPound,
    porcentageIncrease,
    isTrmChanging,
    isSettingsHydrated
  ])

  useEffect(() => {
    if (!isSettingsHydrated) return

    if (isTrmChanging && trm > 0) {
      setLoading(false)
      return
    }

    const fetchTrm = async () => {
      setLoading(true)
      const url = "https://hexarate.paikama.co/api/rates/USD/COP/latest"
      try {
        const response = await fetch(url)
        const data: TrmType = await response.json()
        const trm = Math.ceil(data.data.mid)
        setTrm(trm)
      } catch (error) {
        console.error("Error fetching TRM:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTrm()
  }, [isSettingsHydrated, isTrmChanging, trm])

  const clearData = () => {
    setProductLink("")
    setBusinessPrice(0)
    setCouponCode("")
    setPounds(0)
    setAiProductCode("")
    setAiCurrentPrice(0)
    setAiPreviousPrice(0)
    setAiTitle("")
    setAiDescription("")
    setAiGeneratedMessage("")
    setIsAiGenerating(false)
  }

  const clearAiMessage = () => {
    setAiGeneratedMessage("")
  }

  const generateAiMessage = async () => {
    setAiGeneratedMessage("")
    setIsAiGenerating(true)

    const result = await generateWhatsappAiMessage({
      productCode: aiProductCode,
      currentPrice: aiCurrentPrice,
      previousPrice: aiPreviousPrice,
      title: aiTitle,
      description: aiDescription
    })

    if (!result.ok) {
      setIsAiGenerating(false)
      return { ok: false as const, error: result.error }
    }

    try {
      let accumulated = ""

      for await (const chunk of readStreamableValue(result.stream)) {
        if (typeof chunk === "string") {
          if (!chunk) continue

          if (chunk.startsWith(accumulated)) {
            accumulated = chunk
          } else {
            accumulated += chunk
          }

          setAiGeneratedMessage(accumulated)
        }
      }
    } finally {
      setIsAiGenerating(false)
    }

    return { ok: true as const }
  }

  const value = {
    productLink,
    couponCode,
    pounds,
    businessPrice,
    setProductLink,
    setCouponCode,
    setPounds,
    setBusinessPrice,

    aiProductCode,
    aiCurrentPrice,
    aiPreviousPrice,
    aiTitle,
    aiDescription,
    aiGeneratedMessage,
    isAiGenerating,
    setAiProductCode,
    setAiCurrentPrice,
    setAiPreviousPrice,
    setAiTitle,
    setAiDescription,
    generateAiMessage,
    clearAiMessage,

    trm,
    companyCommission,
    deliveryCost,
    costByPound,
    porcentageIncrease,
    setTrm,
    setCompanyCommission,
    setDeliveryCost,
    setCostByPound,
    setPorcentageIncrease,

    loading,
    isTrmChanging,
    setLoading,
    setIsTrmChanging,

    clearData
  }

  return <ProductContext value={value}>{children}</ProductContext>
}
