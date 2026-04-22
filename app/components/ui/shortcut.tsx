import * as React from "react"
import { cn } from "@/app/lib/utils"

type ShortcutProps = React.HTMLAttributes<HTMLDivElement> & {
  keys: string[]
}

export function Shortcut({ keys, className, ...props }: ShortcutProps) {
  return (
    <div
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    >
      {keys.map((key, index) => (
        <React.Fragment key={`${key}-${index}`}>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            {key}
          </kbd>
          {index < keys.length - 1 && (
            <span className="text-[10px] text-muted-foreground">+</span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
