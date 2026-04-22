import { CotizadorLayout } from "@/app/components/cotizador/CotizadorLayout"

export default function CrearProductoPage() {
  return (
    <>
      <header className="mb-6 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
          Importex · Panel interno
        </p>
        <h1 className="mt-1 text-[28px] font-extrabold leading-none tracking-[-0.03em] text-foreground sm:text-[34px]">
          Cotizador de productos
        </h1>
        <p className="mt-2 text-[14px] text-muted-foreground sm:text-[15px]">
          Calcula el precio final en COP y genera el mensaje para WhatsApp.
        </p>
      </header>

      <CotizadorLayout />
    </>
  )
}
