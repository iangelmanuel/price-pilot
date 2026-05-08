"use client"

import { useState, useEffect } from "react"
import { Minus, Plus, Sparkles, RotateCcw } from "lucide-react"
import { useProduct } from "@/app/hook/useProduct"
import { parseDecimalInput } from "@/app/utils/parseDecimalInput"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Button } from "@/app/components/ui/button"
import { Switch } from "@/app/components/ui/switch"
import { cn } from "@/app/lib/utils"

function roundCop(value: number) {
  return Math.ceil(value / 1000) * 1000
}

export function AIAssistantForm() {
  const {
    aiProductCode,
    setAiProductCode,
    aiTitle,
    setAiTitle,
    aiCurrentPrice,
    setAiCurrentPrice,
    aiPreviousPrice,
    setAiPreviousPrice,
    aiDescription,
    setAiDescription,
    isAiGenerating,
    generateAiMessage,
    clearAiMessage,
    lastProductCode,
    advanceProductCode,
    autoAdvanceCode,
    setAutoAdvanceCode,
    businessPrice,
    previousBusinessPrice,
    trm,
    companyCommission,
    porcentageIncrease,
    deliveryCost,
    costByPound,
    pounds
  } = useProduct()

  const [error, setError] = useState("")

  const base = trm + companyCommission

  /* Auto-populate COP prices from USD using company formula */
  const calcCop = (usd: number) =>
    base > 0 && usd > 0
      ? roundCop(
          usd * base * porcentageIncrease + deliveryCost + costByPound * pounds
        )
      : 0

  useEffect(() => {
    const suggested = calcCop(businessPrice)
    if (suggested > 0) setAiCurrentPrice(suggested)
    else if (businessPrice === 0) setAiCurrentPrice(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    businessPrice,
    trm,
    companyCommission,
    porcentageIncrease,
    deliveryCost,
    costByPound,
    pounds
  ])

  useEffect(() => {
    const suggested = calcCop(previousBusinessPrice)
    if (suggested > 0) setAiPreviousPrice(suggested)
    else if (previousBusinessPrice === 0) setAiPreviousPrice(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    previousBusinessPrice,
    trm,
    companyCommission,
    porcentageIncrease,
    deliveryCost,
    costByPound,
    pounds
  ])

  const canGenerate =
    aiProductCode.trim().length > 0 &&
    aiTitle.trim().length > 0 &&
    aiDescription.trim().length > 0 &&
    aiCurrentPrice > 0

  const handleGenerate = async () => {
    setError("")
    const result = await generateAiMessage()
    if (!result.ok) setError(result.error ?? "No se pudo generar el mensaje")
  }

  const decrementCode = () => {
    const current = parseInt(aiProductCode, 10)
    const prev = isNaN(current) || current <= 1 ? 9999 : current - 1
    setAiProductCode(String(prev).padStart(4, "0"))
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Asistente IA · WhatsApp
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-muted-foreground">
            Auto-avanzar código
          </span>
          <Switch
            checked={autoAdvanceCode}
            onCheckedChange={setAutoAdvanceCode}
          />
        </div>
      </div>

      <div className="space-y-4 p-4">
        {/* Code + Title */}
        <div className="grid grid-cols-[auto_1fr] gap-3">
          <div>
            <Label>Código</Label>
            <div className="mt-1.5 flex items-center gap-1">
              <Button
                variant="secondary"
                size="icon-sm"
                onClick={decrementCode}
                title="Código anterior"
              >
                <Minus className="size-3.5" />
              </Button>
              <Input
                value={aiProductCode}
                onChange={(e) => setAiProductCode(e.target.value)}
                placeholder="001"
                className="w-16 text-center font-mono font-semibold"
              />
              <Button
                variant="secondary"
                size="icon-sm"
                onClick={advanceProductCode}
                title="Siguiente código"
              >
                <Plus className="size-3.5" />
              </Button>
            </div>
            {lastProductCode > 0 && !aiProductCode && (
              <p className="mt-1 text-[11px] text-muted-foreground">
                Último: {String(lastProductCode).padStart(3, "0")}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="ai-title">Título del producto</Label>
            <Input
              id="ai-title"
              value={aiTitle}
              onChange={(e) => setAiTitle(e.target.value)}
              placeholder="Monopoly Junior Super Mario Edition"
              className="mt-1.5"
            />
          </div>
        </div>

        {/* COP prices — auto-populated from USD + formula */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="ai-current-price">
              Precio actual
              <span className="ml-1 font-normal text-muted-foreground">
                (COP)
              </span>
            </Label>
            <Input
              id="ai-current-price"
              type="number"
              step="any"
              inputMode="decimal"
              value={aiCurrentPrice || ""}
              onChange={(e) =>
                setAiCurrentPrice(parseDecimalInput(e.target.value))
              }
              placeholder="65000"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="ai-prev-price">
              Precio anterior
              <span className="ml-1 font-normal text-muted-foreground">
                (COP)
              </span>
            </Label>
            <Input
              id="ai-prev-price"
              type="number"
              step="any"
              inputMode="decimal"
              value={aiPreviousPrice || ""}
              onChange={(e) =>
                setAiPreviousPrice(parseDecimalInput(e.target.value))
              }
              placeholder="110000"
              className="mt-1.5"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="ai-description">
            Descripción para IA
            <span className="ml-1 font-normal text-muted-foreground">
              (una idea por línea)
            </span>
          </Label>
          <textarea
            id="ai-description"
            value={aiDescription}
            onChange={(e) => setAiDescription(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                e.preventDefault()
                if (canGenerate && !isAiGenerating) void handleGenerate()
              }
            }}
            placeholder="Juego de mesa inspirado en Super Mario&#10;Para niños y adultos&#10;Incluye piezas coleccionables"
            className={cn(
              "mt-1.5 min-h-24 w-full resize-y rounded-xl border border-border bg-input px-3 py-2",
              "text-sm text-foreground placeholder:text-muted-foreground/50",
              "outline-none transition-colors",
              "focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
            )}
          />
          <p className="mt-1 text-[11px] text-muted-foreground">
            Ctrl+Enter para generar
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={handleGenerate}
            disabled={!canGenerate || isAiGenerating}
            className="flex-1"
          >
            <Sparkles className="size-4" />
            {isAiGenerating ? "Generando..." : "Generar mensaje con IA"}
          </Button>
          <Button
            variant="secondary"
            onClick={clearAiMessage}
            className="sm:w-auto"
          >
            <RotateCcw className="size-4" />
            Limpiar
          </Button>
        </div>

        {error && (
          <p className="rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
