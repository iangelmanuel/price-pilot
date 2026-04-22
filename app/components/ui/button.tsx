import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/app/lib/utils"

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-md shadow-primary/30 hover:opacity-90 active:scale-[0.98] dark:bg-primary-700 dark:text-primary-50",
        secondary:
          "border border-border bg-card text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
        ghost:
          "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:opacity-90 active:scale-[0.98]",
        outline:
          "border border-border bg-transparent text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 px-6 text-base",
        icon: "h-10 w-10 rounded-lg p-0",
        "icon-sm": "h-8 w-8 rounded-md p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, type = "button", ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={type}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

/* Backward-compat wrapper used by shared components */
type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md"
  rounded?: "full" | "lg"
  variant?: "ghost" | "secondary"
}

function IconButton({
  size = "md",
  rounded = "lg",
  variant = "ghost",
  className,
  children,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <Button
      variant={variant}
      size={size === "sm" ? "icon-sm" : "icon"}
      type={type}
      className={cn(rounded === "full" && "rounded-full", className)}
      {...props}
    >
      {children}
    </Button>
  )
}

export { Button, IconButton, buttonVariants }
