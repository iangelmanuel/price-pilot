"use client"

import { useCallback } from "react"
import { toast } from "sonner"
import { useProduct } from "@/app/hook/useProduct"
import {
  buildGeminiPayload,
  buildAdminPayload
} from "@/app/utils/buildGeminiPayload"

export function useCopyPayloadActions() {
  const {
    aiProductCode,
    aiTitle,
    productLink,
    couponCode,
    businessPrice,
    pounds,
    productCategory,
    shippingMode,
    aiCurrentPrice,
    aiPreviousPrice,
    aiDescription
  } = useProduct()

  const canCopyGemini = Boolean(aiProductCode || productLink || aiTitle)
  const canCopyAdmin = Boolean(productLink)

  const copyGemini = useCallback(async () => {
    if (!canCopyGemini) return

    const payload = buildGeminiPayload({
      aiProductCode,
      aiTitle,
      productLink,
      couponCode,
      businessPrice,
      pounds,
      productCategory,
      shippingMode,
      aiCurrentPrice,
      aiPreviousPrice,
      aiDescription
    })

    await navigator.clipboard.writeText(payload)
    toast.success("Payload Gemini copiado", {
      description: "Listo para pegar en Gemini"
    })
  }, [
    aiProductCode,
    aiTitle,
    productLink,
    couponCode,
    businessPrice,
    pounds,
    productCategory,
    shippingMode,
    aiCurrentPrice,
    aiPreviousPrice,
    aiDescription,
    canCopyGemini
  ])

  const copyAdmin = useCallback(async () => {
    if (!canCopyAdmin) return

    const payload = buildAdminPayload({
      productLink,
      couponCode,
      businessPrice,
      pounds
    })

    await navigator.clipboard.writeText(payload)
    toast.success("Info administrativa copiada")
  }, [productLink, couponCode, businessPrice, pounds, canCopyAdmin])

  return {
    copyGemini,
    copyAdmin,
    canCopyGemini,
    canCopyAdmin
  }
}
