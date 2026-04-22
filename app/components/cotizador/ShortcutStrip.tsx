import { Shortcut } from "@/app/components/ui/shortcut"

const SHORTCUT_ITEMS = [
  { keys: ["Ctrl", "C"], label: "Copiar para Gemini" },
  { keys: ["Ctrl", "Shift", "C"], label: "Copiar info administrativa" },
  { keys: ["Ctrl", "X"], label: "Limpiar datos" },
  { keys: ["Ctrl", "K"], label: "Enfocar precio USD" },
  { keys: ["Ctrl", "Enter"], label: "Generar mensaje IA" },
  { keys: ["Alt", "1"], label: "Pestaña Cotizar" },
  { keys: ["Alt", "2"], label: "Pestaña Preview" }
]

export function ShortcutStrip() {
  return (
    <section className="mt-4 rounded-xl border border-border bg-muted/35 p-3 sm:p-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        Atajos de teclado
      </p>

      <div className="mt-2 flex flex-wrap gap-2">
        {SHORTCUT_ITEMS.map((item) => (
          <div
            key={`${item.keys.join("-")}-${item.label}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-background/80 px-2.5 py-1.5"
          >
            <Shortcut keys={item.keys} />
            <span className="text-[12px] text-muted-foreground">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
