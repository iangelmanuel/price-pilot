"use client"

import { Copy, CheckCheck } from "lucide-react"
import { useProduct } from "@/app/hook/useProduct"
import { Button } from "@/app/components/ui/button"

function Bubble({
  children,
  onCopy,
  disabled,
  label
}: {
  children: React.ReactNode
  onCopy: () => void
  disabled?: boolean
  label?: string
}) {
  return (
    <div className="relative p-3">
      {label && (
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
          {label}
        </p>
      )}
      <div className="w-full rounded-2xl rounded-tr-sm border border-primary/25 bg-primary/10 p-3 shadow-sm">
        {children}
        <p className="mt-1 flex items-center justify-end gap-1 text-right text-[11px] text-muted-foreground">
          14:32
          <CheckCheck className="size-3.5 text-primary" />
        </p>
      </div>
      <Button
        variant="secondary"
        size="icon-sm"
        disabled={disabled}
        onClick={onCopy}
        className="absolute right-4 top-4 size-8 border-input bg-card text-primary shadow-md hover:bg-accent"
      >
        <Copy className="size-3.5" />
      </Button>
    </div>
  )
}

export function WhatsAppPreview() {
  const { aiGeneratedMessage, isAiGenerating } = useProduct()

  const hasMessage = Boolean(aiGeneratedMessage) || isAiGenerating

  if (!hasMessage) {
    return (
      <div className="rounded-2xl border border-input bg-card p-6 text-center">
        <p className="text-[13px] text-muted-foreground">
          Genera un mensaje con IA para ver la vista previa
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-input bg-[url('/garabato-wsp.jpg')] bg-cover bg-center">
      <Bubble
        label="Mensaje generado por IA"
        onCopy={() => navigator.clipboard.writeText(aiGeneratedMessage)}
        disabled={!aiGeneratedMessage}
      >
        <p className="whitespace-pre-line text-[14px] leading-6 tracking-[0.01em] text-foreground">
          {aiGeneratedMessage || (
            <span className="animate-pulse text-muted-foreground">
              Pensando…
            </span>
          )}
        </p>
      </Bubble>
    </div>
  )
}
