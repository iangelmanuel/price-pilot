type InlineLoaderProps = {
  label?: string
  className?: string
  textClassName?: string
}

export function InlineLoader({
  label = "Cargando",
  className,
  textClassName
}: InlineLoaderProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 text-neutral-500",
        className ?? ""
      ].join(" ")}
    >
      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600" />
      <span
        className={["text-[12px] font-medium", textClassName ?? ""].join(" ")}
      >
        {label}
      </span>
    </span>
  )
}
