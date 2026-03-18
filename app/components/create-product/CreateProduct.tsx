"use client"

import {
  ConversionCard,
  ProductSourceCard
} from "@/app/components/create-product/FormCards"
import { AIContentCard } from "@/app/components/create-product/AIContentCard"
import { WhatsAppPreviewCard } from "./WhatsAppPreviewCard"

export function CreateProduct() {
  return (
    <section className="mt-7 grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_0.95fr]">
      <div className="space-y-4">
        <ConversionCard />
        <ProductSourceCard />
        <AIContentCard />
      </div>

      <div className="xl:sticky xl:top-24 xl:h-fit">
        <WhatsAppPreviewCard />
      </div>
    </section>
  )
}
