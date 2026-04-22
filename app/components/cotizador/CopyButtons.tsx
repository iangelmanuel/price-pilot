"use client"

import { Bot, ShieldCheck } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Shortcut } from "@/app/components/ui/shortcut"
import { useCopyPayloadActions } from "@/app/hook/useCopyPayloadActions"

export function CopyButtons() {
  const { copyGemini, copyAdmin, canCopyGemini, canCopyAdmin } =
    useCopyPayloadActions()

  return (
    <div className="space-y-2">
      <Button
        onClick={copyGemini}
        disabled={!canCopyGemini}
        className="h-12 w-full justify-between text-[15px] font-semibold shadow-[0_8px_24px_rgba(138,111,194,0.4)]"
        title="Ctrl+C (sin selección)"
      >
        <span className="inline-flex items-center gap-2">
          <Bot className="size-5" />
          Copiar para Gemini
        </span>
        <Shortcut
          keys={["Ctrl", "C"]}
          className="hidden sm:inline-flex"
        />
      </Button>

      <Button
        variant="secondary"
        onClick={copyAdmin}
        disabled={!canCopyAdmin}
        className="w-full justify-between"
        title="Ctrl+Shift+C"
      >
        <span className="inline-flex items-center gap-2">
          <ShieldCheck className="size-4" />
          Copiar info administrativa
        </span>
        <Shortcut
          keys={["Ctrl", "Shift", "C"]}
          className="hidden sm:inline-flex"
        />
      </Button>
    </div>
  )
}
