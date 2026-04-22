"use client"

import { useRef, useState } from "react"

import { ShippingModeSelector } from "./ShippingModeSelector"
import { CategorySelector } from "./CategorySelector"
import { ProductSourceForm } from "./ProductSourceForm"
import { AIAssistantForm } from "./AIAssistantForm"
import { PriceResultCard } from "./PriceResultCard"
import { PriceConfigCard } from "./PriceConfigCard"
import { WhatsAppPreview } from "./WhatsAppPreview"
import { CopyButtons } from "./CopyButtons"

import { cn } from "@/app/lib/utils"
import { useProduct } from "@/app/hook/useProduct"
import { useCopyPayloadActions } from "@/app/hook/useCopyPayloadActions"
import { useKeyboardShortcuts } from "@/app/hook/useKeyboardShortcuts"

type MobileTab = "cotizar" | "preview"

export function CotizadorLayout() {
  const usdPriceRef = useRef<HTMLInputElement>(null)
  const [mobileTab, setMobileTab] = useState<MobileTab>("cotizar")
  const { clearData } = useProduct()
  const { copyGemini, copyAdmin } = useCopyPayloadActions()

  useKeyboardShortcuts({
    onFocusUsdPrice: () => usdPriceRef.current?.focus(),
    onCopyGemini: copyGemini,
    onCopyAdmin: copyAdmin,
    onClearData: clearData,
    onSwitchToCotizarTab: () => setMobileTab("cotizar"),
    onSwitchToPreviewTab: () => setMobileTab("preview")
  })

  const LeftPanel = (
    <div className="space-y-4">
      <ShippingModeSelector />
      <CategorySelector />
      <ProductSourceForm usdPriceRef={usdPriceRef} />
      <AIAssistantForm />
    </div>
  )

  const RightPanel = (
    <div className="space-y-4">
      <PriceResultCard />
      <PriceConfigCard />
      <WhatsAppPreview />
      <CopyButtons />
    </div>
  )

  return (
    <>
      {/* ── Desktop split view ── */}
      <div className="hidden lg:flex lg:items-start lg:gap-5">
        <div className="min-w-0 flex-1 pb-8">{LeftPanel}</div>

        <div
          className="w-[400px] shrink-0 lg:sticky lg:top-[88px] lg:max-h-[calc(100vh-88px)] lg:overflow-y-auto xl:w-[440px]"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="space-y-4 pb-8">{RightPanel}</div>
        </div>
      </div>

      {/* ── Mobile: tab switcher ── */}
      <div className="lg:hidden">
        <div className="sticky top-0 z-10 -mx-4 flex border-b border-border bg-background/95 backdrop-blur sm:-mx-6">
          {(["cotizar", "preview"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setMobileTab(tab)}
              className={cn(
                "flex-1 py-3 text-[14px] font-semibold transition-colors",
                mobileTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab === "cotizar" ? "Cotizar" : "Precio y Preview"}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {mobileTab === "cotizar" ? LeftPanel : RightPanel}
        </div>
      </div>
    </>
  )
}
