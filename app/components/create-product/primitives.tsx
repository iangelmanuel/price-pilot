import type { ReactNode } from "react"
import { SelectionPill } from "@/app/components/ui/form"

type ConfigCardProps = {
  title: string
  children: ReactNode
}

type ToggleOptionRowProps = {
  id: string
  label: string
  checked: boolean
  onChange: () => void
  variant?: "row" | "inline"
}

type BreakdownTileProps = {
  label: string
  value: ReactNode
  tone?: "default" | "highlight"
}

type SelectionOption = {
  label: string
  value: number
}

type SelectionPillGroupProps = {
  options: SelectionOption[]
  activeValue: number
  onSelect: (value: number) => void
}

export function ConfigCard({ title, children }: ConfigCardProps) {
  return (
    <div className="space-y-3 rounded-xl border border-neutral-200 bg-white p-3">
      <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-primary-700">
        {title}
      </p>
      {children}
    </div>
  )
}

export function ToggleOptionRow({
  id,
  label,
  checked,
  onChange,
  variant = "row"
}: ToggleOptionRowProps) {
  const baseClasses =
    variant === "inline"
      ? "flex items-center gap-1 text-[13px] text-neutral-500"
      : "flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-[13px] text-neutral-700"

  return (
    <label className={baseClasses}>
      <span>{label}</span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-neutral-200 bg-neutral-100 text-primary-600 focus:ring-primary-500"
      />
    </label>
  )
}

export function BreakdownTile({
  label,
  value,
  tone = "default"
}: BreakdownTileProps) {
  const toneClasses =
    tone === "highlight"
      ? "border border-primary-200 bg-primary-50 text-primary-900"
      : "bg-white text-neutral-700"

  return (
    <div className={`rounded-lg px-3 py-2 text-[13px] ${toneClasses}`}>
      {label}: <strong>{value}</strong>
    </div>
  )
}

export function SelectionPillGroup({
  options,
  activeValue,
  onSelect
}: SelectionPillGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <SelectionPill
          key={option.label}
          active={activeValue === option.value}
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </SelectionPill>
      ))}
    </div>
  )
}
