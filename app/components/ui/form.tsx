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
    <label className="block text-[13px] font-semibold tracking-[0.01em] text-neutral-700">
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
      className="mt-2 h-11 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-[14px] text-neutral-700 placeholder:text-neutral-400 outline-none transition-colors focus:border-primary-300 focus:ring-2 focus:ring-primary-200"
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
        "h-11 w-11 border border-transparent bg-neutral-100 text-neutral-500",
        "hover:border-primary-100 hover:bg-primary-50 hover:text-primary-700 active:scale-95",
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
        "rounded-full px-2.5 py-1 text-[13px] transition-colors",
        active
          ? "bg-primary-500 text-white"
          : "bg-neutral-200 text-neutral-700 hover:bg-primary-100 hover:text-primary-800"
      ].join(" ")}
    >
      {children}
    </button>
  )
}
