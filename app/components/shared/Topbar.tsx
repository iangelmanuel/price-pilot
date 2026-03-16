import { BellIcon } from "../dashboard/icons"

export function Topbar() {
  return (
    <header className="flex h-20 items-center border-b border-neutral-200 bg-neutral-50 px-7">
      <div className="ml-auto flex items-center gap-5 pl-6">
        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100"
        >
          <BellIcon className="h-4.5 w-4.5" />
        </button>

        <div className="h-10 w-px bg-neutral-200" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[14px] font-semibold leading-tight text-neutral-800">
              Angel De La Torre
            </p>
            <p className="text-[12px] leading-tight text-neutral-400">x</p>
          </div>

          <div className="h-10 w-10 rounded-full bg-[radial-gradient(circle_at_30%_30%,#f6c7a8_0%,#e9a47f_60%,#d98763_100%)]" />
        </div>
      </div>
    </header>
  )
}
