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
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  shippingMode: z.enum(["amazon", "casillero"]).default("amazon"),
  productCategory: z.enum(["general", "ropa"]).default("general"),
})

type GenerateInput = z.infer<typeof inputSchema>

type Result =
  | { ok: true; stream: ReturnType<typeof createStreamableValue<string>>["value"] }
  | { ok: false; error: string }

const DEFAULT_FALLBACK_MODELS = ["openai/gpt-oss-20b:free"]

function scoreFreeModel(id: string) {
  const s = id.toLowerCase()
  let score = 0
  if (s.includes("gpt-oss-120b")) score += 100
  if (s.includes("gpt-oss-20b")) score += 90
  if (s.includes("qwen") && s.includes("72b")) score += 85
  if (s.includes("qwen") && s.includes("32b")) score += 80
  if (s.includes("llama") && s.includes("70b")) score += 78
  if (s.includes("deepseek") && s.includes("v3")) score += 76
  if (s.includes("gemma") && s.includes("27b")) score += 72
  if (s.includes("mistral") || s.includes("mixtral")) score += 68
  if (s.includes("instruct") || s.includes("chat")) score += 8
  if (s.includes("vision")) score -= 4
  const m = s.match(/(\d{1,3})b/)
  if (m?.[1]) score += Math.min(20, Number(m[1]) / 5)
  return score
}

async function discoverFreeModels(baseURL: string, apiKey: string) {
  try {
    const res = await fetch(`${baseURL.replace(/\/$/, "")}/models`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
    })
    if (!res.ok) return [] as string[]
    const payload = (await res.json()) as { data?: Array<{ id?: string }> }
    const freeIds = (payload.data ?? [])
      .map((m) => m.id?.trim())
      .filter((id): id is string => Boolean(id?.endsWith(":free")))
    return Array.from(new Set(freeIds))
      .sort((a, b) => scoreFreeModel(b) - scoreFreeModel(a))
      .slice(0, 8)
  } catch {
    return [] as string[]
  }
}

const EN_ES: Array<[RegExp, string]> = [
  [/\bwireless\b/gi, "inalámbrico"],
  [/\bnoise cancel(?:ling|ation)?\b/gi, "cancelación de ruido"],
  [/\bwaterproof\b/gi, "resistente al agua"],
  [/\bsmartwatch\b/gi, "reloj inteligente"],
  [/\bheadphones\b/gi, "audífonos"],
  [/\bearbuds\b/gi, "audífonos"],
  [/\bcharger\b/gi, "cargador"],
  [/\bfast charging\b/gi, "carga rápida"],
  [/\bbattery life\b/gi, "duración de batería"],
  [/\blaptop\b/gi, "portátil"],
  [/\bcamera\b/gi, "cámara"],
  [/\bdisplay\b/gi, "pantalla"],
  [/\bhigh quality\b/gi, "alta calidad"],
  [/\blightweight\b/gi, "ligero"],
  [/\bportable\b/gi, "portátil"],
  [/\bbundle\b/gi, "combo"],
  [/\bdeal\b/gi, "oferta"],
  [/\bfor kids\b/gi, "para niños"],
]

function localize(text: string) {
  return EN_ES.reduce((t, [p, r]) => t.replace(p, r), text)
}

function formatCop(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  })
    .format(Math.max(0, value))
    .replace(/\s/g, "")
}

function normalizeTitle(title: string) {
  return localize(title).trim().replace(/\s+/g, " ").slice(0, 55)
}

function buildBullets(description: string) {
  const candidates = description
    .split(/[\n.;•\-]+/g)
    .map((s) => localize(s).trim())
    .filter((s) => s.length >= 8)
  if (candidates.length > 0) return candidates.slice(0, 5)
  return [
    "Excelente relación calidad-precio para el día a día",
    "Producto práctico y fácil de usar",
    "Diseño pensado para comodidad y rendimiento",
    "Ideal para regalo o uso personal",
    "Disponibilidad limitada por temporada",
  ]
}

function deliveryDays(mode: string) {
  return mode === "amazon" ? "15 días hábiles" : "20 días hábiles"
}

function buildLocalMessage(input: GenerateInput) {
  const { productCode, currentPrice, previousPrice, title, description, shippingMode, productCategory } = input
  const bullets = buildBullets(description)

  const lines: string[] = [
    `🆔 Código: ${productCode}`,
    `*${normalizeTitle(title)}*`,
    `✔️ Precio hoy: ${formatCop(currentPrice)}`,
  ]
  if ((previousPrice ?? 0) > 0) lines.push(`❌ Antes: ${formatCop(previousPrice ?? 0)}`)

  lines.push("")
  for (const b of bullets) lines.push(`✨ ${b}`)

  if (productCategory === "ropa") {
    lines.push(
      "",
      "⚠️ Nota: El color del producto puede variar ligeramente por la iluminación de la fotografía."
    )
  }

  lines.push(
    "",
    `💌 Aprovecha esta oferta aquí 👉 wa.link/znboo2`,
    `🚚 Entrega: ${deliveryDays(shippingMode)}`
  )

  return lines.join("\n")
}

function immediateStream(msg: string) {
  const s = createStreamableValue("")
  s.done(msg)
  return s.value
}

export async function generateWhatsappAiMessage(rawInput: GenerateInput): Promise<Result> {
  const parsed = inputSchema.safeParse(rawInput)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos" }
  }

  const apiKey = process.env.OPENROUTER_API_KEY ?? process.env.OPENAI_API_KEY
  if (!apiKey) {
    return { ok: true, stream: immediateStream(buildLocalMessage(parsed.data)) }
  }

  const baseURL = process.env.OPENROUTER_BASE_URL?.trim() || "https://openrouter.ai/api/v1"
  const model = process.env.OPENROUTER_MODEL?.trim()
  const envCandidates = (process.env.OPENROUTER_MODEL_CANDIDATES ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  const discovered = await discoverFreeModels(baseURL, apiKey)

  const candidates = Array.from(
    new Set([...(model ? [model] : []), ...envCandidates, ...discovered, ...DEFAULT_FALLBACK_MODELS])
  )

  const provider = createOpenAI({
    apiKey,
    baseURL,
    name: "openrouter",
    headers: {
      ...(process.env.OPENROUTER_SITE_URL ? { "HTTP-Referer": process.env.OPENROUTER_SITE_URL } : {}),
      ...(process.env.OPENROUTER_APP_NAME ? { "X-Title": process.env.OPENROUTER_APP_NAME } : {}),
    },
  })

  const { productCode, currentPrice, previousPrice, title, description, shippingMode, productCategory } = parsed.data
  const delivery = deliveryDays(shippingMode)
  const hasPrev = (previousPrice ?? 0) > 0
  const ropaBlock =
    productCategory === "ropa"
      ? `\n⚠️ Nota: El color del producto puede variar ligeramente por la iluminación de la fotografía.\n`
      : ""

  const systemPrompt = `
Eres un redactor senior de ecommerce para WhatsApp. Escribe en español neutro/comercial para Colombia.
Reglas: traduce inglés a español (conserva nombres de marca, referencias técnicas como USB-C, 128GB, OLED).
Si tu borrador tiene frases en inglés, corrígelas antes de responder.
  `.trim()

  const prompt = `
Genera SOLO el texto final con este formato exacto (respeta líneas en blanco entre bloques):

🆔 Código: ${productCode}
*[título traducido al español, máx 55 chars]*
✔️ Precio hoy: ${formatCop(currentPrice)}
${hasPrev ? `❌ Antes: ${formatCop(previousPrice ?? 0)}` : "(omitir línea de precio anterior)"}

✨ [beneficio o característica 1]
✨ [beneficio o característica 2]
✨ [beneficio o característica 3]
✨ [beneficio o característica 4]
✨ [beneficio o característica 5]
${ropaBlock}
💌 Aprovecha esta oferta aquí 👉 wa.link/znboo2
🚚 Entrega: ${delivery}

Reglas estrictas:
- Solo español, salvo marcas/referencias técnicas.
- Tono comercial, claro, persuasivo.
- El título va entre asteriscos *así* (negrita WhatsApp).
- 4-5 bullets con ✨ usando las mejores características del producto.
- Formato COP: $65.000 (separador de miles con punto).
- Mantén exactamente la línea en blanco entre el bloque código/título/precio, los bullets${productCategory === "ropa" ? ", la nota de color" : ""} y el pie de página.
- No agregues texto extra, encabezados ni explicaciones.

Datos:
- Código: ${productCode}
- Precio actual COP: ${currentPrice}
- Precio anterior COP: ${previousPrice ?? 0}
- Título original: ${title}
- Descripción: ${description}
- Título sugerido ES: ${normalizeTitle(title)}
- Descripción sugerida ES: ${localize(description)}
  `.trim()

  try {
    const streamable = createStreamableValue("")

    ;(async () => {
      let lastError: unknown
      for (const candidate of candidates) {
        try {
          const result = streamText({
            model: provider.chat(candidate),
            system: systemPrompt,
            temperature: 0.2,
            maxRetries: 0,
            experimental_transform: smoothStream({ delayInMs: 20, chunking: "word" }),
            prompt,
          })
          let accumulated = ""
          for await (const part of result.textStream) {
            accumulated += part
            streamable.update(part)
          }
          if (accumulated.trim().length > 0) {
            streamable.done(accumulated)
            return
          }
        } catch (err) {
          lastError = err
          continue
        }
      }
      console.error("All AI models failed, using local fallback:", lastError)
      streamable.done(buildLocalMessage(parsed.data))
    })().catch((err) => {
      console.error("Unexpected AI error:", err)
      streamable.done(buildLocalMessage(parsed.data))
    })

    return { ok: true, stream: streamable.value }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error desconocido"
    if (msg.includes("No endpoints available") || msg.includes("guardrail")) {
      return {
        ok: false,
        error:
          "OpenRouter bloqueó el modelo. Ve a openrouter.ai/settings/privacy y permite endpoints compatibles.",
      }
    }
    return { ok: false, error: `No se pudo generar el mensaje. ${msg}` }
  }
}
