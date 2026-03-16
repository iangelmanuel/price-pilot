"use client"

import { useState } from "react"
import { useProduct } from "@/app/hook/useProduct"
import { SparklesIcon } from "../dashboard/icons"
import { SectionCard, SectionCardHeader } from "@/app/components/ui/card"
import { FieldInput, FieldLabel } from "@/app/components/ui/form"

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
        <div className="grid grid-cols-2 gap-4">
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <FieldLabel>Precio actual (COP)</FieldLabel>
            <FieldInput
              value={aiCurrentPrice ? String(aiCurrentPrice) : ""}
              onChange={(e) => setAiCurrentPrice(Number(e.target.value) || 0)}
              placeholder="65000"
              type="number"
            />
          </div>

          <div>
            <FieldLabel>Precio anterior (COP)</FieldLabel>
            <FieldInput
              value={aiPreviousPrice ? String(aiPreviousPrice) : ""}
              onChange={(e) => setAiPreviousPrice(Number(e.target.value) || 0)}
              placeholder="110000"
              type="number"
            />
          </div>
        </div>

        <div>
          <FieldLabel>Descripción para IA (una idea por línea)</FieldLabel>
          <textarea
            value={aiDescription}
            onChange={(e) => setAiDescription(e.target.value)}
            placeholder="Juego de mesa Junior inspirado en el mundo de Super Mario"
            className="mt-2 min-h-28 w-full resize-y rounded-lg border border-neutral-200 bg-neutral-100 px-3 py-2 text-[14px] text-neutral-600 placeholder:text-neutral-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!canGenerate || isAiGenerating}
            className="rounded-lg bg-primary-500 px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAiGenerating ? "Generando..." : "Generar mensaje con IA"}
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-[14px] font-semibold text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            Limpiar mensaje
          </button>
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </div>
    </SectionCard>
  )
}
