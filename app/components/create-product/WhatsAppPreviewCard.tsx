"use client"

import { useProduct } from "@/app/hook/useProduct"
import { CheckDoubleIcon, ClipboardIcon } from "../dashboard/icons"
import { copyProductPrivData } from "@/app/utils/copyProductPrivData"
import { SectionCard, SectionCardHeader } from "@/app/components/ui/card"
import { IconActionButton } from "@/app/components/ui/form"
import { InlineLoader } from "@/app/components/ui/loader"

export function WhatsAppPreviewCard() {
  const {
    productLink,
    couponCode,
    pounds,
    businessPrice,
    aiGeneratedMessage,
    isAiGenerating
  } = useProduct()

  return (
    <SectionCard>
      <SectionCardHeader title="Vista previa de WhatsApp" />

      <div className="h-full bg-[url('/garabato-wsp.jpg')] bg-cover bg-center">
        {productLink && (
          <div className="relative p-3 sm:p-4">
            <div className="mx-auto w-full max-w-full rounded-2xl rounded-tr-sm bg-[#d9fdd3] p-3 shadow-[0_1px_1px_rgba(0,0,0,0.15)] sm:max-w-105">
              <div className="mt-1 space-y-0.5 text-[13px] text-[#111b21]">
                <p className="flex items-center gap-1.5">
                  <strong>Link:</strong> {productLink}
                </p>

                {couponCode && (
                  <p className="flex items-center gap-1.5">
                    <strong>Cupón:</strong> {couponCode}
                  </p>
                )}

                {businessPrice > 0 && (
                  <p className="flex items-center gap-1.5">
                    <strong>Precio:</strong> ${businessPrice}
                  </p>
                )}

                {pounds > 0 && (
                  <p className="flex items-center gap-1.5">
                    <strong>Libras:</strong> {pounds} lbs
                  </p>
                )}
              </div>

              <p className="mt-1 flex items-center justify-end gap-1 text-right text-[11px] text-[#667781]">
                14:32
                <CheckDoubleIcon className="h-3.5 w-3.5 text-[#667781]" />
              </p>
            </div>

            <IconActionButton
              onClick={() =>
                navigator.clipboard.writeText(
                  copyProductPrivData({
                    link: productLink,
                    coupon: couponCode,
                    price: businessPrice,
                    pounds: pounds
                  })
                )
              }
              className="absolute right-3 top-3 border-primary-200 bg-white text-primary-800 shadow-[0_6px_14px_rgba(15,23,42,0.16)] hover:border-primary-300 hover:bg-primary-50 hover:text-primary-900 sm:right-5 sm:top-4"
            >
              <ClipboardIcon className="h-5 w-5" />
            </IconActionButton>
          </div>
        )}

        {(aiGeneratedMessage || isAiGenerating) && (
          <div className="relative px-3 pb-3 pt-4 sm:px-4 sm:pb-4 sm:pt-5">
            <div className="mx-auto w-full max-w-full rounded-2xl rounded-tr-sm bg-[#d9fdd3] p-3 shadow-[0_1px_1px_rgba(0,0,0,0.15)] sm:max-w-105">
              <p className="mb-1 text-[11px] font-medium tracking-[0.02em] text-[#2f7a36]">
                Mensaje generado por IA
              </p>

              <p className="wrap-break-word whitespace-pre-line text-[14px] leading-6 tracking-[0.01em] text-[#111b21]">
                {aiGeneratedMessage || (
                  <InlineLoader
                    className="text-[#667781]"
                    textClassName="text-[#667781]"
                    label="Pensando..."
                  />
                )}
              </p>

              <p className="mt-1 flex items-center justify-end gap-1 text-right text-[11px] text-[#667781]">
                14:32
                <CheckDoubleIcon className="h-3.5 w-3.5 text-[#667781]" />
              </p>
            </div>

            <IconActionButton
              onClick={() => navigator.clipboard.writeText(aiGeneratedMessage)}
              disabled={!aiGeneratedMessage}
              className="absolute right-3 top-4 border-primary-200 bg-white text-primary-800 shadow-[0_6px_14px_rgba(15,23,42,0.16)] hover:border-primary-300 hover:bg-primary-50 hover:text-primary-900 sm:right-5 sm:top-5"
            >
              <ClipboardIcon className="h-5 w-5" />
            </IconActionButton>
          </div>
        )}
      </div>
    </SectionCard>
  )
}
