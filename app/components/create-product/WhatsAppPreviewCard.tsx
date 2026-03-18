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

      <div className="h-full bg-neutral-100">
        {productLink && (
          <div className="relative bg-neutral-100 p-3 sm:p-4">
            <div className="mx-auto w-full max-w-full rounded-xl border border-primary-100 bg-primary-100 p-3 shadow-[0_8px_18px_rgba(0,0,0,0.08)] sm:max-w-105">
              <div className="mt-2 space-y-0.5 text-[13px] text-neutral-900">
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

              <p className="mt-1 flex items-center justify-end gap-1 text-right text-[11px] text-neutral-500">
                14:32
                <CheckDoubleIcon className="h-3.5 w-3.5" />
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
              className="absolute right-3 top-3 sm:right-5 sm:top-4"
            >
              <ClipboardIcon className="h-4.5 w-4.5" />
            </IconActionButton>
          </div>
        )}

        {(aiGeneratedMessage || isAiGenerating) && (
          <div className="relative bg-neutral-100 px-3 pb-3 pt-4 sm:px-4 sm:pb-4 sm:pt-5">
            <div className="mx-auto w-full max-w-full rounded-xl border border-primary-100 bg-primary-100 p-3 shadow-[0_8px_18px_rgba(0,0,0,0.08)] sm:max-w-105">
              <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-purple-500">
                Mensaje generado por IA
              </p>

              <p className="wrap-break-word whitespace-pre-line rounded-md  px-3 py-2 text-[14px] leading-7 tracking-[0.01em] text-neutral-900">
                {aiGeneratedMessage || (
                  <InlineLoader
                    className="text-neutral-500"
                    textClassName="text-neutral-500"
                    label="Pensando..."
                  />
                )}
              </p>

              <p className="mt-1 flex items-center justify-end gap-1 text-right text-[11px] text-neutral-500">
                14:32
                <CheckDoubleIcon className="h-3.5 w-3.5" />
              </p>
            </div>

            <IconActionButton
              onClick={() => navigator.clipboard.writeText(aiGeneratedMessage)}
              disabled={!aiGeneratedMessage}
              className="absolute right-3 top-4 sm:right-5 sm:top-5"
            >
              <ClipboardIcon className="h-4.5 w-4.5" />
            </IconActionButton>
          </div>
        )}
      </div>
    </SectionCard>
  )
}
