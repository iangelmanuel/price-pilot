import { BellIcon } from "../dashboard/icons"
import { IconButton } from "@/app/components/ui/button"
import { Navigation } from "./Navigation"

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-primary-100 bg-white/80 px-4 py-3 backdrop-blur sm:px-6 lg:h-20 lg:px-7 lg:py-0">
      <div className="flex items-center gap-3">
        <div className="hidden rounded-xl border border-primary-100 bg-primary-50 px-3 py-1.5 sm:block">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-primary-700">
            Panel interno
          </p>
        </div>

        <div className="ml-auto flex items-center gap-3 sm:gap-5 sm:pl-6">
          <IconButton rounded="full">
            <BellIcon className="h-4.5 w-4.5" />
          </IconButton>

          <div className="hidden h-10 w-px bg-primary-100 sm:block" />

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-[14px] font-semibold leading-tight text-neutral-800">
                Angel De La Torre
              </p>
              <p className="text-[12px] leading-tight text-neutral-400">
                Administrador
              </p>
            </div>

            <div className="h-9 w-9 rounded-full bg-[radial-gradient(circle_at_30%_30%,#f6c7a8_0%,#e9a47f_60%,#d98763_100%)] sm:h-10 sm:w-10" />
          </div>
        </div>
      </div>

      <nav className="mt-3 grid grid-cols-2 gap-2 lg:hidden">
        <Navigation />
      </nav>
    </header>
  )
}
