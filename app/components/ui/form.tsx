import type { ChangeEvent, ReactNode } from "react"

type FieldLabelProps = {
  children: ReactNode
}

type FieldInputProps = {
  placeholder: string
  value: string
  type?: string
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
  onChange
}: FieldInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="mt-2 h-11 w-full rounded-lg border border-neutral-200 bg-neutral-100 px-3 text-[14px] text-neutral-600 placeholder:text-neutral-400"
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
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "grid h-11 w-11 place-items-center rounded-lg bg-neutral-100 text-neutral-500 transition-colors",
        "hover:bg-neutral-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
        className ?? ""
      ].join(" ")}
    >
      {children}
    </button>
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
        "rounded-full px-2 py-0.5 text-[13px] transition-colors",
        active
          ? "bg-primary-500 text-white"
          : "bg-neutral-300 text-neutral-700 hover:bg-neutral-400"
      ].join(" ")}
    >
      {children}
    </button>
  )
}
