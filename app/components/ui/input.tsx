import * as React from "react"
import { cn } from "@/app/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-input bg-input px-3 py-2 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
          "placeholder:text-muted-foreground",
          "outline-none transition-colors",
          "focus:border-ring focus:ring-2 focus:ring-ring/30",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
