/**
 * WCAG 2 contrast for the generated OKLCH tokens. Shared by the token build
 * (which warns on failures) and the Colour docs page (which shows the audit).
 */

type RGBA = { r: number; g: number; b: number; a: number } // gamma-encoded sRGB, 0–1

const OKLCH = /^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+)(%?))?\s*\)$/

const clamp = (x: number) => Math.min(1, Math.max(0, x))
const encode = (x: number) => (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055)
const decode = (x: number) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)

export function parseOklch(value: string): RGBA {
  const m = OKLCH.exec(value.trim())
  if (!m) throw new Error(`Not an oklch() colour: ${value}`)
  const [L, C, H] = [Number(m[1]), Number(m[2]), (Number(m[3]) * Math.PI) / 180]
  const alpha = m[4] === undefined ? 1 : Number(m[4]) / (m[5] ? 100 : 1)
  const a = C * Math.cos(H)
  const b = C * Math.sin(H)
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const mm = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  // Out-of-gamut colours are clipped, as browsers do when painting to sRGB.
  return {
    r: encode(clamp(4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s)),
    g: encode(clamp(-1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s)),
    b: encode(clamp(-0.0041960863 * l - 0.7034186147 * mm + 1.707614701 * s)),
    a: alpha,
  }
}

/** Composite a (possibly translucent) colour over an opaque backdrop. */
const over = (top: RGBA, bottom: RGBA): RGBA => ({
  r: top.r * top.a + bottom.r * (1 - top.a),
  g: top.g * top.a + bottom.g * (1 - top.a),
  b: top.b * top.a + bottom.b * (1 - top.a),
  a: 1,
})

const luminance = (c: RGBA) => 0.2126 * decode(c.r) + 0.7152 * decode(c.g) + 0.0722 * decode(c.b)

export function contrast(fg: RGBA, bg: RGBA) {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x)
  return (a + 0.05) / (b + 0.05)
}

export interface Pair {
  fg: string
  bg: string
  /** Opaque surface a translucent `bg` sits on. */
  on?: string
  /** text = 4.5:1 (AA body text); ui = 3:1 (non-text: focus rings, icons, large text). */
  kind: "text" | "ui"
  use: string
}

/** The foreground/background pairings components actually render. */
export const PAIRS: Pair[] = [
  { fg: "foreground", bg: "background", kind: "text", use: "Body text" },
  { fg: "foreground", bg: "card", kind: "text", use: "Text on cards" },
  { fg: "muted-foreground", bg: "background", kind: "text", use: "Secondary text" },
  { fg: "muted-foreground", bg: "card", kind: "text", use: "Secondary text on cards" },
  { fg: "subtle-foreground", bg: "background", kind: "ui", use: "Placeholders, icons" },
  { fg: "primary-foreground", bg: "primary", kind: "text", use: "Primary button" },
  { fg: "destructive-foreground", bg: "destructive", kind: "text", use: "Destructive button" },
  { fg: "primary-subtle-foreground", bg: "background", kind: "text", use: "Links" },
  { fg: "destructive-subtle-foreground", bg: "background", kind: "text", use: "Error text, destructive menu items" },
  { fg: "destructive", bg: "background", kind: "ui", use: "Error borders and icons" },
  { fg: "primary-subtle-foreground", bg: "primary-subtle", on: "background", kind: "text", use: "Accent tint" },
  { fg: "success-subtle-foreground", bg: "success-subtle", on: "background", kind: "text", use: "Success badge / alert" },
  { fg: "warning-subtle-foreground", bg: "warning-subtle", on: "background", kind: "text", use: "Warning badge / alert" },
  { fg: "destructive-subtle-foreground", bg: "destructive-subtle", on: "background", kind: "text", use: "Error badge / alert" },
  { fg: "info-subtle-foreground", bg: "info-subtle", on: "background", kind: "text", use: "Info badge / alert" },
  { fg: "ring", bg: "background", kind: "ui", use: "Focus ring" },
  { fg: "primary-subtle-foreground", bg: "selection", on: "card", kind: "text", use: "Calendar range on a card" },
  { fg: "primary-subtle-foreground", bg: "selection", on: "popover", kind: "text", use: "Calendar range in a date picker" },
]

export interface PairResult extends Pair {
  ratio: number
  min: number
  pass: boolean
}

export function auditContrast(colors: Record<string, string>): PairResult[] {
  const page = parseOklch(colors.background)
  return PAIRS.map((p) => {
    // Glass surfaces are translucent: judge them as they appear over the page.
    const raw = parseOklch(colors[p.on ?? p.bg])
    const surface = raw.a < 1 ? over(raw, page) : raw
    const bg = p.on ? over(parseOklch(colors[p.bg]), surface) : surface
    const fg = over(parseOklch(colors[p.fg]), bg)
    const ratio = contrast(fg, bg)
    const min = p.kind === "text" ? 4.5 : 3
    return { ...p, ratio, min, pass: ratio >= min }
  })
}
