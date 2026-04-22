"use client"

import { useEffect } from "react"

type Handlers = {
  onFocusUsdPrice: () => void
  onCopyGemini: () => Promise<void> | void
  onCopyAdmin: () => Promise<void> | void
}

export function useKeyboardShortcuts({ onFocusUsdPrice, onCopyGemini, onCopyAdmin }: Handlers) {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const mod = e.ctrlKey || e.metaKey
      const inField =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement

      if (mod && e.key === "k") {
        e.preventDefault()
        onFocusUsdPrice()
        return
      }

      if (mod && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault()
        void onCopyAdmin()
        return
      }

      // Ctrl+C with no text selected and not in a field
      if (
        mod &&
        !e.shiftKey &&
        e.key === "c" &&
        !inField &&
        !window.getSelection()?.toString()
      ) {
        e.preventDefault()
        void onCopyGemini()
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onFocusUsdPrice, onCopyGemini, onCopyAdmin])
}
