import Link from "next/link"
import type { ReactNode } from "react"
import { IconButton } from "@/app/components/ui/button"

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
    <IconButton
      size="sm"
      aria-label={label}
      className="text-muted-foreground"
    >
      {children}
    </IconButton>
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
          ? "border-primary/50 bg-primary/15 font-semibold text-primary"
          : "border-input bg-card text-muted-foreground",
        disabled
          ? "pointer-events-none opacity-50"
          : "hover:border-primary/35 hover:bg-accent hover:text-foreground"
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
        "inline-flex rounded-full border px-2 py-1 text-[12px] font-semibold",
        type === "Physical"
          ? "border-primary/45 bg-primary/15 text-primary"
          : "border-input bg-muted text-muted-foreground"
      ].join(" ")}
    >
      {type === "Physical" ? "Físico" : "Digital"}
    </span>
  )
}

export function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
  const published = status === "Published"

  return (
    <span className="inline-flex items-center gap-2 text-[14px] text-foreground">
      <span
        className={[
          "h-1.5 w-1.5 rounded-full",
          published ? "bg-primary" : "bg-muted-foreground"
        ].join(" ")}
      />
      {published ? "Publicado" : "Pendiente"}
    </span>
  )
}
