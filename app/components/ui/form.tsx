import type { ChangeEvent, ReactNode } from "react"
import { IconButton } from "@/app/components/ui/button"

type FieldLabelProps = {
  children: ReactNode
}

type FieldInputProps = {
  placeholder: string
  value: string
  type?: string
  step?: number | "any"
  inputMode?: "text" | "decimal" | "numeric"
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

type DecimalFieldInputProps = {
  placeholder: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

type IconActionButtonProps = {
  children: ReactNode
  disabled?: boolean
  onClick?: () => void
  className?: string
}

type SelectionPillProps = {
  active: boolean
  children: ReactNode
  onClick: () => void
}

export function FieldLabel({ children }: FieldLabelProps) {
  return (
    <label className="block text-[13px] font-semibold tracking-[0.01em] text-foreground">
      {children}
    </label>
  )
}

export function FieldInput({
  placeholder,
  value,
  type = "text",
  step,
  inputMode,
  onChange
}: FieldInputProps) {
  return (
    <input
      type={type}
      step={step}
      inputMode={inputMode}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="mt-2 h-11 w-full rounded-lg border border-input bg-input px-3 text-[14px] text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
    />
  )
}

export function DecimalFieldInput({
  placeholder,
  value,
  onChange
}: DecimalFieldInputProps) {
  return (
    <FieldInput
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type="number"
      step="any"
      inputMode="decimal"
    />
  )
}

export function IconActionButton({
  children,
  disabled,
  onClick,
  className
}: IconActionButtonProps) {
  return (
    <IconButton
      disabled={disabled}
      onClick={onClick}
      className={[
        "h-11 w-11 border border-input bg-muted text-muted-foreground",
        "hover:border-primary/40 hover:bg-accent hover:text-foreground active:scale-95",
        className ?? ""
      ].join(" ")}
    >
      {children}
    </IconButton>
  )
}

export function SelectionPill({
  active,
  children,
  onClick
}: SelectionPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "cursor-pointer rounded-full border px-2.5 py-1 text-[13px] transition-colors",
        active
          ? "border-primary/45 bg-primary text-primary-foreground"
          : "border-input bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
      ].join(" ")}
    >
      {children}
    </button>
  )
}
