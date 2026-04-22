"use client"

import { useEffect } from "react"

type Handlers = {
  onFocusUsdPrice?: () => void
  onCopyGemini?: () => Promise<void> | void
  onCopyAdmin?: () => Promise<void> | void
  onClearData?: () => void
  onSwitchToCotizarTab?: () => void
  onSwitchToPreviewTab?: () => void
}

export function useKeyboardShortcuts({
  onFocusUsdPrice,
  onCopyGemini,
  onCopyAdmin,
  onClearData,
  onSwitchToCotizarTab,
  onSwitchToPreviewTab
}: Handlers) {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const mod = e.ctrlKey || e.metaKey
      const key = e.key.toLowerCase()
      const inField =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      const hasSelection = Boolean(window.getSelection()?.toString())

      if (mod && key === "k") {
        e.preventDefault()
        onFocusUsdPrice?.()
        return
      }

      if (mod && e.shiftKey && key === "c" && !inField) {
        e.preventDefault()
        void onCopyAdmin?.()
        return
      }

      // Ctrl+C with no text selected and not in a field
      if (mod && !e.shiftKey && key === "c" && !inField && !hasSelection) {
        e.preventDefault()
        void onCopyGemini?.()
        return
      }

      // Ctrl+X clears form data when user is not cutting text from an input/selection.
      if (mod && !e.shiftKey && key === "x" && !inField && !hasSelection) {
        e.preventDefault()
        onClearData?.()
        return
      }

      if (e.altKey && !mod && !inField && key === "1") {
        e.preventDefault()
        onSwitchToCotizarTab?.()
        return
      }

      if (e.altKey && !mod && !inField && key === "2") {
        e.preventDefault()
        onSwitchToPreviewTab?.()
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [
    onFocusUsdPrice,
    onCopyGemini,
    onCopyAdmin,
    onClearData,
    onSwitchToCotizarTab,
    onSwitchToPreviewTab
  ])
}
