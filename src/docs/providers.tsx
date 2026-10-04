import { createContext, useContext, useEffect, useState } from "react"

import { useBrand } from "@/explorer/use-brand"

// --- Theme -------------------------------------------------------------------

type Theme = "light" | "dark"

const ThemeContext = createContext<{ theme: Theme; dark: boolean; toggle: () => void } | null>(null)

function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem("detent-theme") ?? localStorage.getItem("ds-theme")
    if (saved === "light" || saved === "dark") return saved
  } catch {
    /* storage unavailable */
  }
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    try {
      localStorage.setItem("detent-theme", theme)
    } catch {
      /* storage unavailable */
    }
  }, [theme])
  return (
    <ThemeContext.Provider
      value={{ theme, dark: theme === "dark", toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider")
  return ctx
}

// --- Brand (live Direction explorer state) ----------------------------------

const BrandContext = createContext<ReturnType<typeof useBrand> | null>(null)

export function BrandProvider({ children }: { children: React.ReactNode }) {
  return <BrandContext.Provider value={useBrand()}>{children}</BrandContext.Provider>
}

export function useBrandContext() {
  const ctx = useContext(BrandContext)
  if (!ctx) throw new Error("useBrandContext must be used inside BrandProvider")
  return ctx
}
