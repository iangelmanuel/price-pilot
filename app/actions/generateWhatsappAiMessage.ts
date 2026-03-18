"use server"

import { smoothStream, streamText } from "ai"
import { createStreamableValue } from "@ai-sdk/rsc"
import { createOpenAI } from "@ai-sdk/openai"
import { z } from "zod"

const inputSchema = z.object({
  productCode: z.string().trim().min(1, "El código del producto es requerido"),
  currentPrice: z.number().positive("El precio actual debe ser mayor a 0"),
  previousPrice: z.number().nonnegative().optional(),
  title: z.string().trim().min(3, "El título debe tener al menos 3 caracteres"),
  description: z
    .string()
    .trim()
    .min(10, "La descripción debe tener al menos 10 caracteres")
})

type GenerateWhatsappAiInput = z.infer<typeof inputSchema>

type GenerateWhatsappAiResult =
  | {
      ok: true
      stream: ReturnType<typeof createStreamableValue<string>>["value"]
    }
  | { ok: false; error: string }

const DEFAULT_FALLBACK_MODELS = ["openai/gpt-oss-20b:free"]

function scoreFreeModel(modelId: string) {
  const id = modelId.toLowerCase()
  let score = 0

  if (id.includes("gpt-oss-120b")) score += 100
  if (id.includes("gpt-oss-20b")) score += 90
  if (id.includes("qwen") && id.includes("72b")) score += 85
  if (id.includes("qwen") && id.includes("32b")) score += 80
  if (id.includes("llama") && id.includes("70b")) score += 78
  if (id.includes("deepseek") && id.includes("v3")) score += 76
  if (id.includes("gemma") && id.includes("27b")) score += 72
  if (id.includes("mistral") || id.includes("mixtral")) score += 68

  if (id.includes("instruct") || id.includes("chat")) score += 8
  if (id.includes("vision")) score -= 4

  const sizeMatch = id.match(/(\d{1,3})b/)
  if (sizeMatch?.[1]) {
    score += Math.min(20, Number(sizeMatch[1]) / 5)
  }

  return score
}

async function discoverFreeModelCandidates(baseURL: string, apiKey: string) {
  try {
    const normalizedBaseURL = baseURL.replace(/\/$/, "")
    const response = await fetch(`${normalizedBaseURL}/models`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
      cache: "no-store"
    })

    if (!response.ok) return [] as string[]

    const payload = (await response.json()) as {
      data?: Array<{ id?: string }>
    }

    const freeIds = (payload.data ?? [])
      .map((model) => model.id?.trim())
      .filter((id): id is string => Boolean(id && id.endsWith(":free")))

    return Array.from(new Set(freeIds))
      .sort((a, b) => scoreFreeModel(b) - scoreFreeModel(a))
      .slice(0, 8)
  } catch {
    return [] as string[]
  }
}

const EN_TO_ES_TERMS: Array<[RegExp, string]> = [
  [/\bwireless\b/gi, "inalámbrico"],
  [/\bbluetooth\b/gi, "Bluetooth"],
  [/\bnoise cancel(?:ling|ation)?\b/gi, "cancelación de ruido"],
  [/\bwaterproof\b/gi, "resistente al agua"],
  [/\bsmart watch\b/gi, "reloj inteligente"],
  [/\bsmartwatch\b/gi, "reloj inteligente"],
  [/\bheadphones\b/gi, "audífonos"],
  [/\bearbuds\b/gi, "audífonos"],
  [/\bcharger\b/gi, "cargador"],
  [/\bfast charging\b/gi, "carga rápida"],
  [/\bbattery life\b/gi, "duración de batería"],
  [/\blaptop\b/gi, "portátil"],
  [/\bkeyboard\b/gi, "teclado"],
  [/\bmouse\b/gi, "mouse"],
  [/\bcamera\b/gi, "cámara"],
  [/\bdisplay\b/gi, "pantalla"],
  [/\bhigh quality\b/gi, "alta calidad"],
  [/\bpremium\b/gi, "premium"],
  [/\bfor kids\b/gi, "para niños"],
  [/\bfor adults\b/gi, "para adultos"],
  [/\blightweight\b/gi, "ligero"],
  [/\bportable\b/gi, "portátil"],
  [/\bnew\b/gi, "nuevo"],
  [/\bbundle\b/gi, "combo"],
  [/\bdeal\b/gi, "oferta"]
]

function localizeEcommerceText(text: string) {
  let localized = text

  for (const [pattern, replacement] of EN_TO_ES_TERMS) {
    localized = localized.replace(pattern, replacement)
  }

  return localized
}

function formatCop(value: number) {
  const formatted = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(Math.max(0, value))

  return formatted.replace(/\s/g, "")
}

function normalizeTitle(title: string) {
  return localizeEcommerceText(title).trim().replace(/\s+/g, " ").slice(0, 55)
}

function buildBullets(description: string) {
  const candidates = description
    .split(/[\n\.;•\-]+/g)
    .map((item) => localizeEcommerceText(item).trim())
    .filter((item) => item.length >= 8)

  const bullets = candidates.slice(0, 5)

  if (bullets.length > 0) {
    return bullets
  }

  return [
    "Excelente relación calidad-precio para el día a día",
    "Producto práctico y fácil de usar",
    "Diseño pensado para comodidad y rendimiento",
    "Ideal para regalo o uso personal",
    "Disponibilidad limitada por temporada"
  ]
}

function buildLocalWhatsappMessage(input: GenerateWhatsappAiInput) {
  const { productCode, currentPrice, previousPrice, title, description } = input
  const bullets = buildBullets(description)

  const lines = [
    `🆔 Código:${productCode}`,
    `✨ ${normalizeTitle(title)}`,
    `Precio Spring 🍂: ${formatCop(currentPrice)}`
  ]

  if ((previousPrice ?? 0) > 0) {
    lines.push(`❌ Antes: ${formatCop(previousPrice ?? 0)}`)
  }

  lines.push("")

  for (const bullet of bullets) {
    lines.push(`✨ ${bullet}`)
  }

  lines.push("", "🍁 Aprovecha Spring Deal Days aquí 👉 wa.link/znboo2")

  return lines.join("\n")
}

function createImmediateStream(message: string) {
  const streamable = createStreamableValue("")
  streamable.done(message)
  return streamable.value
}

export async function generateWhatsappAiMessage(
  rawInput: GenerateWhatsappAiInput
): Promise<GenerateWhatsappAiResult> {
  const parsed = inputSchema.safeParse(rawInput)

  if (!parsed.success) {
    return {
      ok: false,
      error:
        parsed.error.issues[0]?.message ??
        "Datos inválidos para generar el mensaje"
    }
  }

  const apiKey = process.env.OPENROUTER_API_KEY ?? process.env.OPENAI_API_KEY

  if (!apiKey) {
    return {
      ok: true,
      stream: createImmediateStream(buildLocalWhatsappMessage(parsed.data))
    }
  }

  const baseURL =
    process.env.OPENROUTER_BASE_URL?.trim() || "https://openrouter.ai/api/v1"

  const model = process.env.OPENROUTER_MODEL?.trim()

  const envCandidates = (process.env.OPENROUTER_MODEL_CANDIDATES ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)

  const discoveredFreeCandidates = await discoverFreeModelCandidates(
    baseURL,
    apiKey
  )

  const modelCandidates = Array.from(
    new Set([
      ...(model ? [model] : []),
      ...envCandidates,
      ...discoveredFreeCandidates,
      ...DEFAULT_FALLBACK_MODELS
    ])
  )

  const provider = createOpenAI({
    apiKey,
    baseURL,
    name: "openrouter",
    headers: {
      ...(process.env.OPENROUTER_SITE_URL
        ? { "HTTP-Referer": process.env.OPENROUTER_SITE_URL }
        : {}),
      ...(process.env.OPENROUTER_APP_NAME
        ? { "X-Title": process.env.OPENROUTER_APP_NAME }
        : {})
    }
  })

  const { productCode, currentPrice, previousPrice, title, description } =
    parsed.data

  const systemPrompt = `
Eres un redactor senior de ecommerce para WhatsApp.
Tu salida DEBE estar en español neutro/comercial para Colombia.

Regla crítica:
- Si recibes información en inglés, tradúcela y adáptala al español.
- Nunca devuelvas frases completas en inglés.
- Solo se permite mantener en inglés: marca, referencia, modelo y siglas técnicas (ej: USB-C, OLED, A17, 128GB).
- Si detectas que tu borrador tiene texto en inglés, corrígelo antes de responder.
  `.trim()

  const prompt = `
Genera SOLO el texto final con este formato y estilo:
🆔 Código:912
🔎 Monopoly Junior Super Mario Edition
✔️ Precio hoy: $65.000
❌ Antes: $110.000 (inclúyelo solo si hay precio anterior > 0)

✨ Beneficio o característica 1
✨ Beneficio o característica 2
✨ Beneficio o característica 3
✨ Beneficio o característica 4
✨ Beneficio o característica 5

💌 Aprovecha esta oferta aquí 👉 wa.link/znboo2

Reglas estrictas:
- Responde SIEMPRE en español.
- Si el título o la descripción vienen en inglés, tradúcelos al español.
- Conserva sin traducir solo nombres de marca, línea, referencia, modelo o capacidad técnica (ej: "Samsung", "Magsafe", "A17", "128GB").
- El título debe ser corto, claro y comercial, con este objetivo: "nombre del producto + detalle especial".
- El detalle especial debe incluir una referencia, modelo, tamaño o especificación clave cuando exista.
- El título final debe tener máximo 55 caracteres.
- No agregues encabezados extra, ni explicación, ni markdown.
- Usa tono comercial, claro y persuasivo.
- Genera de 4 a 5 bullets con ✨, usando las mejores características del texto de entrada.
- Embellece la redacción de los bullets para que se vean más atractivos en venta.
- No inventes especificaciones técnicas que no estén respaldadas por el título o la descripción.
- Conserva emojis y estructura.
- Usa pesos con separador de miles en formato colombiano (ej: $65.000).

Datos del producto:
- Código: ${productCode}
- Precio actual COP: ${currentPrice}
- Precio anterior COP: ${previousPrice ?? 0}
- Título original: ${title}
- Descripción original: ${description}
- Título sugerido en español (referencia): ${normalizeTitle(title)}
- Descripción sugerida en español (referencia): ${localizeEcommerceText(description)}
  `.trim()

  try {
    const streamable = createStreamableValue("")

    ;(async () => {
      let lastError: unknown

      for (const candidateModel of modelCandidates) {
        try {
          const result = streamText({
            model: provider.chat(candidateModel),
            system: systemPrompt,
            temperature: 0.2,
            maxRetries: 0,
            experimental_transform: smoothStream({
              delayInMs: 20,
              chunking: "word"
            }),
            prompt
          })

          let accumulated = ""

          for await (const textPart of result.textStream) {
            accumulated += textPart
            streamable.update(textPart)
          }

          if (accumulated.trim().length > 0) {
            streamable.done(accumulated)
            return
          }
        } catch (error) {
          lastError = error
          continue
        }
      }

      const details =
        lastError instanceof Error
          ? lastError.message
          : "No hubo respuesta de los modelos configurados"

      console.error("Fallo IA OpenRouter, usando fallback local:", details)
      streamable.done(buildLocalWhatsappMessage(parsed.data))
    })().catch((unexpectedError) => {
      const details =
        unexpectedError instanceof Error
          ? unexpectedError.message
          : "Error inesperado"

      console.error("Fallo inesperado IA, usando fallback local:", details)
      streamable.done(buildLocalWhatsappMessage(parsed.data))
    })

    return { ok: true, stream: streamable.value }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Error desconocido de IA"

    if (
      message.includes("No endpoints available") ||
      message.includes("guardrail restrictions")
    ) {
      return {
        ok: false,
        error:
          "OpenRouter bloqueó el modelo por tu política de privacidad. Ve a https://openrouter.ai/settings/privacy y permite endpoints compatibles (o desactiva temporalmente restricciones estrictas)."
      }
    }

    return {
      ok: false,
      error: `No se pudo generar el mensaje con IA. ${message}`
    }
  }
}
