"use client"

import { Bot, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import { useProduct } from "@/app/hook/useProduct"
import { buildGeminiPayload, buildAdminPayload } from "@/app/utils/buildGeminiPayload"
import { Button } from "@/app/components/ui/button"

export function CopyButtons() {
  const {
    aiProductCode, aiTitle,
    productLink, couponCode,
    businessPrice, pounds,
    productCategory, shippingMode,
    aiCurrentPrice, aiPreviousPrice, aiDescription,
  } = useProduct()

  const hasEnough = Boolean(aiProductCode || productLink || aiTitle)

  const copyGemini = async () => {
    const payload = buildGeminiPayload({
      aiProductCode, aiTitle,
      productLink, couponCode,
      businessPrice, pounds,
      productCategory, shippingMode,
      aiCurrentPrice, aiPreviousPrice, aiDescription,
    })
    await navigator.clipboard.writeText(payload)
    toast.success("Payload Gemini copiado", {
      description: "Listo para pegar en Gemini",
    })
  }

  const copyAdmin = async () => {
    const payload = buildAdminPayload({ productLink, couponCode, businessPrice, pounds })
    await navigator.clipboard.writeText(payload)
    toast.success("Info administrativa copiada")
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={copyGemini}
        disabled={!hasEnough}
        className="h-12 w-full text-[15px] font-semibold shadow-[0_8px_24px_rgba(138,111,194,0.4)]"
        title="Ctrl+C (sin selección)"
      >
        <Bot className="size-5" />
        Copiar para Gemini
      </Button>

      <Button
        variant="secondary"
        onClick={copyAdmin}
        disabled={!productLink}
        className="w-full"
        title="Ctrl+Shift+C"
      >
        <ShieldCheck className="size-4" />
        Copiar info administrativa
      </Button>
    </div>
  )
}
