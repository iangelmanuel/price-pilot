"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import { readStreamableValue } from "@ai-sdk/rsc"
import { generateWhatsappAiMessage } from "@/app/actions/generateWhatsappAiMessage"

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
  setTrm: (trm: number) => void
  setCompanyCommission: (commission: number) => void
  setDeliveryCost: (cost: number) => void
  setCostByPound: (cost: number) => void

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

  // Settings
  const [loading, setLoading] = useState(false)
  const [isTrmChanging, setIsTrmChanging] = useState(false)

  useEffect(() => {
    const fetchTrm = async () => {
      setLoading(true)
      const url = "https://hexarate.paikama.co/api/rates/USD/COP/latest"
      try {
        const response = await fetch(url)
        const data: TrmType = await response.json()
        setTrm(data.data.mid)
      } catch (error) {
        console.error("Error fetching TRM:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTrm()
  }, [])

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
    setTrm,
    setCompanyCommission,
    setDeliveryCost,
    setCostByPound,

    loading,
    isTrmChanging,
    setLoading,
    setIsTrmChanging,

    clearData
  }

  return <ProductContext value={value}>{children}</ProductContext>
}
