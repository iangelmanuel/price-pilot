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
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="border-b border-border/60 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Categoría del producto
        </p>
      </div>

      <div className="flex flex-wrap gap-2 p-4">
        {CATEGORIES.map(({ value, label, emoji, hint }) => {
          const active = productCategory === value
          return (
            <button
              key={value}
              type="button"
              onClick={() => setProductCategory(value)}
              title={hint}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-all",
                active
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border bg-secondary/40 text-muted-foreground hover:border-border/80 hover:bg-secondary hover:text-foreground"
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
