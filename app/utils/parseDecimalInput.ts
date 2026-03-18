export const parseDecimalInput = (rawValue: string) => {
  const value = rawValue.trim()

  if (!value) {
    return 0
  }

  const cleaned = value.replace(/[^\d,.-]/g, "")

  if (!cleaned) {
    return 0
  }

  const lastComma = cleaned.lastIndexOf(",")
  const lastDot = cleaned.lastIndexOf(".")

  let normalized = cleaned

  if (lastComma !== -1 && lastDot !== -1) {
    const decimalSeparator = lastComma > lastDot ? "," : "."

    normalized =
      decimalSeparator === ","
        ? cleaned.replace(/\./g, "").replace(",", ".")
        : cleaned.replace(/,/g, "")
  } else if (lastComma !== -1) {
    normalized = cleaned.replace(",", ".")
  }

  const parsed = Number(normalized)

  return Number.isFinite(parsed) ? parsed : 0
}
