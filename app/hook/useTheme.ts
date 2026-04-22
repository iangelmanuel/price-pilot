"use client"

import { useEffect, useState } from "react"

const KEY = "price-pilot:theme"

export function useTheme() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(KEY)
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isDark = saved === "dark" || (!saved && prefersDark)
    setDark(isDark)
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem(KEY, next ? "dark" : "light")
  }

  return { dark, toggle }
}
