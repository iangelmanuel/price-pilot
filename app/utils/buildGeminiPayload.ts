import type { ShippingMode, ProductCategory } from "@/app/provider/ProductProvider"

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  general: "General",
  ropa: "Ropa / Calzado",
}

const MODE_LABELS: Record<ShippingMode, string> = {
  amazon: "Amazon Directo",
  casillero: "Casillero",
}

const DELIVERY_DAYS: Record<ShippingMode, string> = {
  amazon: "15 días hábiles",
  casillero: "20 días hábiles",
}

type Params = {
  aiProductCode: string
  aiTitle: string
  productLink: string
  couponCode: string
  businessPrice: number
  pounds: number
  productCategory: ProductCategory
  shippingMode: ShippingMode
  aiCurrentPrice: number
  aiPreviousPrice: number
  aiDescription: string
}

export function buildGeminiPayload(p: Params): string {
  const lines: string[] = []

  lines.push("### PRODUCTO")
  if (p.aiProductCode) lines.push(`- Código: ${p.aiProductCode}`)
  if (p.aiTitle) lines.push(`- Título: ${p.aiTitle}`)
  if (p.productLink) lines.push(`- Link: ${p.productLink}`)
  if (p.couponCode) lines.push(`- Cupón: ${p.couponCode}`)
  if (p.businessPrice > 0) lines.push(`- Precio USD: $${p.businessPrice}`)
  if (p.pounds > 0) lines.push(`- Libras: ${p.pounds}`)
  lines.push(`- Categoría: ${CATEGORY_LABELS[p.productCategory]}`)
  lines.push(`- Modo envío: ${MODE_LABELS[p.shippingMode]}`)

  lines.push("")
  lines.push("### PRECIOS COP")
  if (p.aiCurrentPrice > 0) lines.push(`- Precio de venta (hoy): $${p.aiCurrentPrice.toLocaleString("es-CO")}`)
  if (p.aiPreviousPrice > 0) lines.push(`- Precio anterior (tachado): $${p.aiPreviousPrice.toLocaleString("es-CO")}`)

  if (p.aiDescription.trim()) {
    lines.push("")
    lines.push("### DESCRIPCIÓN / BENEFICIOS")
    const bullets = p.aiDescription
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
    for (const b of bullets) lines.push(`- ${b}`)
  }

  const delivery = DELIVERY_DAYS[p.shippingMode]
  const currentFmt = p.aiCurrentPrice > 0 ? `$${p.aiCurrentPrice.toLocaleString("es-CO")}` : "{precio_actual}"
  const hasPrev = p.aiPreviousPrice > 0
  const isRopa = p.productCategory === "ropa"

  lines.push("")
  lines.push("### INSTRUCCIONES PARA GEMINI")
  lines.push("Genera un mensaje promocional para WhatsApp con el formato exacto de abajo.")
  lines.push("Devuelve el resultado dentro de un bloque de código (``` ```) para que sea fácil de copiar.")
  lines.push("Traduce todo al español (conserva nombres de marca y referencias técnicas).")
  lines.push("Tono: comercial, claro, persuasivo. Solo español salvo marcas/siglas técnicas.")
  lines.push("")
  lines.push("Formato exacto (respeta líneas en blanco entre bloques):")
  lines.push("")
  lines.push(`🆔 Código: ${p.aiProductCode || "{código}"}`)
  lines.push(`*{título traducido, máx 55 chars}*`)
  lines.push(`✔️ Precio hoy: ${currentFmt}`)
  if (hasPrev) lines.push(`❌ Antes: $${p.aiPreviousPrice.toLocaleString("es-CO")}`)
  lines.push("")
  lines.push("✨ {beneficio 1}")
  lines.push("✨ {beneficio 2}")
  lines.push("✨ {beneficio 3}")
  lines.push("✨ {beneficio 4}")
  lines.push("✨ {beneficio 5}")
  if (isRopa) {
    lines.push("")
    lines.push("⚠️ Nota: El color del producto puede variar ligeramente por la iluminación de la fotografía.")
  }
  lines.push("")
  lines.push(`💌 Aprovecha esta oferta aquí 👉 wa.link/znboo2`)
  lines.push(`🚚 Entrega: ${delivery}`)

  return lines.join("\n")
}

type AdminParams = {
  productLink: string
  couponCode: string
  businessPrice: number
  pounds: number
}

export function buildAdminPayload(p: AdminParams): string {
  const lines: string[] = []
  if (p.productLink) lines.push(`Link: ${p.productLink}`)
  if (p.couponCode) lines.push(`Cupón: ${p.couponCode}`)
  if (p.businessPrice > 0) lines.push(`Precio USD: $${p.businessPrice}`)
  if (p.pounds > 0) lines.push(`Libras: ${p.pounds} lbs`)
  return lines.join("\n")
}
