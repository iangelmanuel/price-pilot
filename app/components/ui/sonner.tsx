"use client"

import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group font-sans text-sm border border-border bg-card text-card-foreground shadow-lg rounded-xl",
          title: "text-foreground font-semibold",
          description: "text-muted-foreground",
          success: "!border-emerald-500/20 !bg-emerald-500/10 !text-emerald-600 dark:!text-emerald-400",
          error: "!border-destructive/20 !bg-destructive/10 !text-destructive",
        },
      }}
    />
  )
}
