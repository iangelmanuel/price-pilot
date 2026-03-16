import { Navigation } from "./Navigation"

export function Sidebar() {
  return (
    <aside className="flex shrink-0 flex-col border-r border-neutral-200 bg-neutral-50">
      <div className="px-3 py-3">
        <div className="flex items-center justify-center gap-3">
          <div className="w-full rounded-lg bg-neutral-100 p-5">
            <p className="text-[24px] font-bold leading-none tracking-[-0.02em] text-neutral-900">
              PricePilot
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
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
