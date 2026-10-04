import { useEffect, useMemo, useState } from "react"

import { brand as compiledBrand, createTokens, tokensToCss, type Brand } from "../../tokens/tokens"

const STORAGE_KEY = "detent-brand"
const LEGACY_STORAGE_KEY = "ds-brand"
const STYLE_ID = "detent-explorer-tokens"

function load(): Brand {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      // The default brand was called "House" before the system was named Detent.
      if (parsed.name === "House") parsed.name = "Detent"
      return { ...compiledBrand, ...parsed }
    }
  } catch {
    /* storage unavailable or corrupt */
  }
  return compiledBrand
}

/**
 * Live brand state for the playground. Regenerates tokens on every change and
 * injects them after the compiled stylesheet so they take precedence.
 */
export function useBrand() {
  const [brand, setBrand] = useState<Brand>(load)
  const tokens = useMemo(() => createTokens(brand), [brand])

  useEffect(() => {
    let style = document.getElementById(STYLE_ID)
    if (!style) {
      style = document.createElement("style")
      style.id = STYLE_ID
      document.head.appendChild(style)
    }
    style.textContent = tokensToCss(tokens)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(brand))
    } catch {
      /* storage unavailable */
    }
  }, [brand, tokens])

  return { brand, setBrand, tokens, compiledBrand }
}

/** Inline-style object that scopes a brand's variables to one subtree. */
export function brandStyle(b: Brand, dark: boolean): React.CSSProperties {
  const t = createTokens(b)
  const vars = { ...t.root, ...(dark ? t.dark : t.light) }
  return Object.fromEntries(Object.entries(vars).map(([k, v]) => [`--${k}`, v])) as React.CSSProperties
}

export function brandToSource(b: Brand) {
  const body = JSON.stringify(b, null, 2).replace(/"([a-z]+)":/gi, "$1:")
  return `export const brand: Brand = ${body}`
}
