import Link from "next/link"
import type { ReactNode } from "react"

type ActionIconButtonProps = {
  label: string
  children: ReactNode
}

type PaginationLinkProps = {
  href: string
  disabled?: boolean
  active?: boolean
  children: ReactNode
}

type ProductTypeBadgeProps = {
  type: "Physical" | "Digital"
}

type ProductStatusBadgeProps = {
  status: "Published" | "Pending"
}

export function ActionIconButton({ label, children }: ActionIconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid h-7 w-7 place-items-center rounded-lg transition-colors hover:bg-neutral-100"
    >
      {children}
    </button>
  )
}

export function PaginationLink({
  href,
  disabled,
  active,
  children
}: PaginationLinkProps) {
  return (
    <Link
      href={href}
      aria-disabled={disabled}
      className={[
        "grid h-8 w-8 place-items-center rounded-lg border text-[13px] font-medium",
        active
          ? "border-primary-500 bg-primary-400 font-semibold text-primary-900"
          : "border-neutral-200 text-neutral-700",
        disabled ? "pointer-events-none opacity-50" : ""
      ].join(" ")}
    >
      {children}
    </Link>
  )
}

export function ProductTypeBadge({ type }: ProductTypeBadgeProps) {
  return (
    <span
      className={[
        "inline-flex rounded-full px-2 py-1 text-[12px] font-semibold",
        type === "Physical"
          ? "bg-primary-100 text-primary-700"
          : "bg-neutral-200 text-neutral-700"
      ].join(" ")}
    >
      {type === "Physical" ? "Físico" : "Digital"}
    </span>
  )
}

export function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
  const published = status === "Published"

  return (
    <span className="inline-flex items-center gap-2 text-[14px] text-neutral-900">
      <span
        className={[
          "h-1.5 w-1.5 rounded-full",
          published ? "bg-primary-500" : "bg-neutral-400"
        ].join(" ")}
      />
      {published ? "Publicado" : "Pendiente"}
    </span>
  )
}
