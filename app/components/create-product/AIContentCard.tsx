"use client"

import { useState } from "react"
import { useProduct } from "@/app/hook/useProduct"
import { SparklesIcon } from "../dashboard/icons"
import { SectionCard, SectionCardHeader } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { InlineLoader } from "@/app/components/ui/loader"
import {
  DecimalFieldInput,
  FieldInput,
  FieldLabel
} from "@/app/components/ui/form"
import { parseDecimalInput } from "@/app/utils/parseDecimalInput"

export function AIContentCard() {
  const {
    aiProductCode,
    aiCurrentPrice,
    aiPreviousPrice,
    aiTitle,
    aiDescription,
    isAiGenerating,
    setAiProductCode,
    setAiCurrentPrice,
    setAiPreviousPrice,
    setAiTitle,
    setAiDescription,
    generateAiMessage,
    clearAiMessage
  } = useProduct()

  const [error, setError] = useState("")

  const canGenerate =
    aiProductCode.trim().length > 0 &&
    aiTitle.trim().length > 0 &&
    aiDescription.trim().length > 0 &&
    aiCurrentPrice > 0

  const handleGenerate = async () => {
    setError("")

    const result = await generateAiMessage()

    if (!result.ok) {
      setError(result.error ?? "No se pudo generar el mensaje")
    }
  }

  const handleClear = () => {
    setError("")
    clearAiMessage()
  }

  return (
    <SectionCard>
      <SectionCardHeader
        title="Asistente IA para WhatsApp"
        icon={<SparklesIcon className="h-4 w-4 text-primary-600" />}
      />

      <div className="space-y-4 p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <FieldLabel>Número del producto</FieldLabel>
            <FieldInput
              value={aiProductCode}
              onChange={(e) => setAiProductCode(e.target.value)}
              placeholder="912"
            />
          </div>

          <div>
            <FieldLabel>Título del producto</FieldLabel>
            <FieldInput
              value={aiTitle}
              onChange={(e) => setAiTitle(e.target.value)}
              placeholder="Monopoly Junior Super Mario Edition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <FieldLabel>Precio actual (COP)</FieldLabel>
            <DecimalFieldInput
              value={aiCurrentPrice ? String(aiCurrentPrice) : ""}
              onChange={(e) =>
                setAiCurrentPrice(parseDecimalInput(e.target.value))
              }
              placeholder="65000"
            />
          </div>

          <div>
            <FieldLabel>Precio anterior (COP)</FieldLabel>
            <DecimalFieldInput
              value={aiPreviousPrice ? String(aiPreviousPrice) : ""}
              onChange={(e) =>
                setAiPreviousPrice(parseDecimalInput(e.target.value))
              }
              placeholder="110000"
            />
          </div>
        </div>

        <div>
          <FieldLabel>Descripción para IA (una idea por línea)</FieldLabel>
          <textarea
            value={aiDescription}
            onChange={(e) => setAiDescription(e.target.value)}
            placeholder="Juego de mesa Junior inspirado en el mundo de Super Mario"
            className="mt-2 min-h-28 w-full resize-y rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-[14px] text-neutral-700 placeholder:text-neutral-400 outline-none transition-colors focus:border-primary-300 focus:ring-2 focus:ring-primary-200"
          />
        </div>

        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
          <Button
            variant="primary"
            onClick={handleGenerate}
            disabled={!canGenerate || isAiGenerating}
          >
            {isAiGenerating ? (
              <InlineLoader
                className="text-white"
                textClassName="text-white"
                label="Generando mensaje..."
              />
            ) : (
              "Generar mensaje con IA"
            )}
          </Button>

          <Button
            variant="secondary"
            onClick={handleClear}
          >
            Limpiar mensaje
          </Button>
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </div>
    </SectionCard>
  )
}
