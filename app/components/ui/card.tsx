import * as React from "react"
import { cn } from "@/app/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-[0_10px_30px_rgba(15,23,42,0.06)] text-card-foreground",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between border-b border-border bg-white px-4 py-3.5", className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-[17px] font-semibold leading-none text-neutral-900", className)}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-4", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center border-t border-border px-4 py-3", className)} {...props} />
  )
)
CardFooter.displayName = "CardFooter"

/* Legacy aliases used by old components */
type SectionCardProps = React.HTMLAttributes<HTMLElement> & {
  tone?: "default" | "success"
}

function SectionCard({ tone = "default", className, ...props }: SectionCardProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border shadow-[0_10px_30px_rgba(15,23,42,0.05)]",
        tone === "success"
          ? "border-primary-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7f5fb_100%)]"
          : "border-neutral-200 bg-white",
        className
      )}
      {...props}
    />
  )
}

type SectionCardHeaderProps = {
  title: string
  icon?: React.ReactNode
  rightSlot?: React.ReactNode
}

function SectionCardHeader({ title, icon, rightSlot }: SectionCardHeaderProps) {
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

export { Card, CardHeader, CardTitle, CardContent, CardFooter, SectionCard, SectionCardHeader }
