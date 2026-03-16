"use client"

import {
  ConversionCard,
  ProductSourceCard
} from "@/app/components/create-product/FormCards"
import { AIContentCard } from "@/app/components/create-product/AIContentCard"
import { WhatsAppPreviewCard } from "./WhatsAppPreviewCard"

export function CreateProduct() {
  return (
    <section className="grid grid-cols-[1.4fr_0.98fr] gap-5 mt-7">
      <div className="space-y-4">
        <ConversionCard />
        <ProductSourceCard />
        <AIContentCard />
      </div>

      <WhatsAppPreviewCard />
    </section>
  )
}
