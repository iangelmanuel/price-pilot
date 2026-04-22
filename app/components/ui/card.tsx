import * as React from "react"
import { cn } from "@/app/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "overflow-hidden rounded-2xl border border-input bg-card text-card-foreground shadow-[0_10px_30px_rgba(0,0,0,0.16)]",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between border-b border-input bg-card px-4 py-3.5",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-[17px] font-semibold leading-none text-foreground",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4", className)}
    {...props}
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center border-t border-border px-4 py-3",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

/* Legacy aliases used by old components */
type SectionCardProps = React.HTMLAttributes<HTMLElement> & {
  tone?: "default" | "success"
}

function SectionCard({
  tone = "default",
  className,
  ...props
}: SectionCardProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border shadow-[0_10px_30px_rgba(0,0,0,0.14)]",
        tone === "success"
          ? "border-primary/35 bg-linear-to-b from-card to-primary/10"
          : "border-input bg-card",
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
    <div className="flex items-center justify-between border-b border-input bg-card px-4 py-3.5">
      <div className="flex items-center gap-2">
        {icon ?? <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
        <h2 className="text-[18px] font-semibold text-foreground">{title}</h2>
      </div>
      {rightSlot}
    </div>
  )
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  SectionCard,
  SectionCardHeader
}
