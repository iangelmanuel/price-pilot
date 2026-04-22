"use client"

import { useProduct } from "@/app/hook/useProduct"
import type { ProductCategory } from "@/app/provider/ProductProvider"
import { cn } from "@/app/lib/utils"

const CATEGORIES: Array<{
  value: ProductCategory
  label: string
  emoji: string
  hint?: string
}> = [
  { value: "general", label: "General", emoji: "📦" },
  { value: "ropa", label: "Ropa / Calzado", emoji: "👕", hint: "Agrega nota de color en mensaje" },
]

export function CategorySelector() {
  const { productCategory, setProductCategory } = useProduct()

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        Categoría del producto
      </p>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ value, label, emoji, hint }) => {
          const active = productCategory === value
          return (
            <button
              key={value}
              type="button"
              onClick={() => setProductCategory(value)}
              title={hint}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-all",
                active
                  ? "border-primary/50 bg-primary/15 text-primary"
                  : "border-border bg-muted text-muted-foreground hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
              )}
            >
              <span>{emoji}</span>
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
