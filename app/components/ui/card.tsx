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
      ? "border-primary-200 bg-primary-100"
      : "border-neutral-200 bg-white"

  return (
    <article className={`overflow-hidden rounded-xl border ${toneClasses}`}>
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
    <div className="flex items-center justify-between border-b bg-white border-neutral-200 px-4 py-3">
      <div className="flex items-center gap-2">
        {icon ?? <span className="h-2 w-2 rounded-full bg-primary-500" />}
        <h2 className="text-[18px] font-semibold text-neutral-900">{title}</h2>
      </div>
      {rightSlot}
    </div>
  )
}
