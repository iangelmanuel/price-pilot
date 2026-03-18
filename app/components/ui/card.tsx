import type { ReactNode } from "react"

type SectionCardProps = {
  children: ReactNode
  tone?: "default" | "success"
}

type SectionCardHeaderProps = {
  title: string
  icon?: ReactNode
  rightSlot?: ReactNode
}

export function SectionCard({ children, tone = "default" }: SectionCardProps) {
  const toneClasses =
    tone === "success"
      ? "border-primary-200 bg-[linear-gradient(180deg,#ffffff_0%,#eff6ff_100%)]"
      : "border-neutral-200 bg-white"

  return (
    <article
      className={`overflow-hidden rounded-2xl border shadow-[0_10px_30px_rgba(15,23,42,0.05)] ${toneClasses}`}
    >
      {children}
    </article>
  )
}

export function SectionCardHeader({
  title,
  icon,
  rightSlot
}: SectionCardHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3.5">
      <div className="flex items-center gap-2">
        {icon ?? <span className="h-2.5 w-2.5 rounded-full bg-primary-500" />}
        <h2 className="text-[18px] font-semibold text-neutral-900">{title}</h2>
      </div>
      {rightSlot}
    </div>
  )
}
