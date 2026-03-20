import type { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonVariant = "primary" | "secondary" | "ghost"
type ButtonSize = "sm" | "md" | "icon"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

type IconButtonProps = Omit<ButtonProps, "size"> & {
  size?: "sm" | "md"
  rounded?: "full" | "lg"
}

export function Button({
  variant = "secondary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const variantClasses =
    variant === "primary"
      ? "bg-primary-500 text-white shadow-[0_8px_20px_rgba(124,58,237,0.25)] hover:bg-primary-600"
      : variant === "ghost"
        ? "bg-transparent text-neutral-600 hover:bg-primary-50 hover:text-primary-700"
        : "border border-neutral-200 bg-white text-neutral-700 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-800"

  const sizeClasses =
    size === "icon"
      ? "h-10 w-10 rounded-lg p-0"
      : size === "sm"
        ? "rounded-lg px-3 py-1.5 text-[13px]"
        : "rounded-lg px-4 py-2 text-[14px]"

  return (
    <button
      type="button"
      className={[
        "inline-flex cursor-pointer items-center justify-center gap-1.5 font-medium transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses,
        sizeClasses,
        className ?? ""
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  )
}

export function IconButton({
  size = "md",
  rounded = "lg",
  className,
  children,
  ...props
}: IconButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={[
        size === "sm" ? "h-7 w-7" : "h-9 w-9",
        rounded === "full" ? "rounded-full" : "rounded-lg",
        className ?? ""
      ].join(" ")}
      {...props}
    >
      {children}
    </Button>
  )
}
