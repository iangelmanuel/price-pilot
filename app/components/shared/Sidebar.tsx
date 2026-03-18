import { Navigation } from "./Navigation"

export function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r border-primary-100/80 bg-white/90 backdrop-blur">
      <div className="px-3 py-3">
        <div className="flex items-center justify-center gap-3">
          <div className="w-full rounded-2xl border border-primary-100 bg-[linear-gradient(180deg,#ffffff_0%,#f2f7ff_100%)] p-5 shadow-sm">
            <p className="text-[24px] font-bold leading-none tracking-[-0.02em] text-neutral-900">
              PricePilot
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-700/80">
              Administración interna
            </p>
          </div>
        </div>

        <nav className="mt-5 space-y-1.5">
          <Navigation />
        </nav>
      </div>
    </aside>
  )
}
