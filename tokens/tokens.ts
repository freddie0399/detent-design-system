/**
 * Single source of truth for the design system's tokens.
 *
 * Everything is generated from a small `Brand` description, so the whole
 * visual language — colour, type, shape, elevation, voice, density — can be
 * re-tuned by changing a handful of numbers. The playground's Direction
 * explorer uses the same `createTokens` at runtime.
 *
 * `npm run tokens` compiles the active brand into:
 *   - src/styles/tokens.css   (consumed by the playground)
 *   - registry.json → "theme" (consumed by apps via `npx shadcn add`)
 *
 * Output layers:
 *   root      – brand-wide variables: fonts, radii, elevation, label voice, density
 *   light/dark – role-based semantic colours (same keys in both)
 *   theme     – Tailwind `@theme` mappings from utilities to the variables above
 */

import { contrast, parseOklch } from "./contrast.ts"

// --- Brand description -------------------------------------------------------

export type FontId = keyof typeof FONTS

export interface Brand {
  name: string
  /** Primary colour. `light`/`dark` are the OKLCH lightness of `primary` per theme. */
  accent: { hue: number; chroma: number; light: number; dark: number }
  /** Neutral tint. `chroma` is a multiplier: 0 = pure grey, 1 = subtle, 3 = strongly tinted. */
  neutral: { hue: number; chroma: number }
  type: { ui: FontId; mono: FontId; display: FontId }
  /** Corner radii in px. */
  shape: { control: number; container: number; overlay: number; badge: number }
  /**
   * Material of controls and surfaces.
   *   flat    – borders only
   *   soft    – hairlines + layered shadow
   *   tactile – lit from above: raised objects with top highlights, recessed
   *             wells, glossy fills, physical knobs, jelly tints
   */
  elevation: "flat" | "soft" | "tactile"
  /** Floating layers (menus, popovers, dialogs): opaque, or translucent glass with backdrop blur. */
  overlays: "solid" | "glass"
  /** Voice of small labels: table headers, menu labels, eyebrows. */
  labels: "sentence" | "mono-caps"
  density: "compact" | "default" | "comfortable"
}

export const FONTS = {
  inter: { family: "'Inter Variable'", pkg: "@fontsource-variable/inter", google: "Inter", kind: "sans" },
  "ibm-plex-sans": { family: "'IBM Plex Sans Variable'", pkg: "@fontsource-variable/ibm-plex-sans", google: "IBM_Plex_Sans", kind: "sans" },
  geist: { family: "'Geist Variable'", pkg: "@fontsource-variable/geist", google: "Geist", kind: "sans" },
  "mona-sans": { family: "'Mona Sans Variable'", pkg: "@fontsource-variable/mona-sans", google: "Mona_Sans", kind: "sans" },
  "instrument-sans": { family: "'Instrument Sans Variable'", pkg: "@fontsource-variable/instrument-sans", google: "Instrument_Sans", kind: "sans" },
  "host-grotesk": { family: "'Host Grotesk Variable'", pkg: "@fontsource-variable/host-grotesk", google: "Host_Grotesk", kind: "sans" },
  "instrument-serif": { family: "'Instrument Serif'", pkg: "@fontsource/instrument-serif", google: "Instrument_Serif", kind: "serif" },
  fraunces: { family: "'Fraunces Variable'", pkg: "@fontsource-variable/fraunces", google: "Fraunces", kind: "serif" },
  "jetbrains-mono": { family: "'JetBrains Mono Variable'", pkg: "@fontsource-variable/jetbrains-mono", google: "JetBrains_Mono", kind: "mono" },
  "ibm-plex-mono": { family: "'IBM Plex Mono'", pkg: "@fontsource/ibm-plex-mono", google: "IBM_Plex_Mono", kind: "mono" },
  "geist-mono": { family: "'Geist Mono Variable'", pkg: "@fontsource-variable/geist-mono", google: "Geist_Mono", kind: "mono" },
  "martian-mono": { family: "'Martian Mono Variable'", pkg: "@fontsource-variable/martian-mono", google: "Martian_Mono", kind: "mono" },
} as const

const FALLBACK = {
  sans: "ui-sans-serif, system-ui, -apple-system, sans-serif",
  serif: "ui-serif, Georgia, serif",
  mono: "ui-monospace, SFMono-Regular, monospace",
}
const stack = (id: FontId) => `${FONTS[id].family}, ${FALLBACK[FONTS[id].kind]}`

// --- Presets -----------------------------------------------------------------

export const PRESETS = {
  /** The original balanced hybrid: dense structure, quiet polish, blue accent. */
  baseline: {
    name: "Baseline",
    accent: { hue: 262, chroma: 0.215, light: 0.545, dark: 0.61 },
    neutral: { hue: 264, chroma: 1 },
    type: { ui: "inter", mono: "jetbrains-mono", display: "inter" },
    shape: { control: 4, container: 6, overlay: 8, badge: 999 },
    elevation: "soft",
    overlays: "solid",
    labels: "sentence",
    density: "default",
  },
  /** Precise, technical, a little industrial: square, compact, signal-orange accent, paper neutrals. */
  instrument: {
    name: "Instrument",
    accent: { hue: 45, chroma: 0.2, light: 0.62, dark: 0.68 },
    neutral: { hue: 75, chroma: 1.4 },
    type: { ui: "ibm-plex-sans", mono: "ibm-plex-mono", display: "ibm-plex-sans" },
    shape: { control: 0, container: 0, overlay: 0, badge: 0 },
    elevation: "flat",
    overlays: "solid",
    labels: "mono-caps",
    density: "compact",
  },
  /** Dark-first and electric: an acid-lime signal on green-black with softer geometry. */
  graphite: {
    name: "Graphite",
    accent: { hue: 128, chroma: 0.2, light: 0.8, dark: 0.86 },
    neutral: { hue: 160, chroma: 1.2 },
    type: { ui: "geist", mono: "geist-mono", display: "geist" },
    shape: { control: 6, container: 10, overlay: 14, badge: 999 },
    elevation: "soft",
    overlays: "solid",
    labels: "sentence",
    density: "default",
  },
  /** Calm and editorial. Warm stone, deep teal, a serif voice for headings. */
  field: {
    name: "Field",
    accent: { hue: 190, chroma: 0.1, light: 0.48, dark: 0.72 },
    neutral: { hue: 70, chroma: 1.8 },
    type: { ui: "instrument-sans", mono: "martian-mono", display: "instrument-serif" },
    shape: { control: 8, container: 12, overlay: 16, badge: 999 },
    elevation: "soft",
    overlays: "solid",
    labels: "mono-caps",
    density: "comfortable",
  },
  /** The chosen direction: Graphite's lime-on-green-black with IBM Plex, tactile controls and glass overlays. */
  detent: {
    name: "Detent",
    accent: { hue: 128, chroma: 0.2, light: 0.8, dark: 0.86 },
    neutral: { hue: 160, chroma: 1.2 },
    type: { ui: "ibm-plex-sans", mono: "ibm-plex-mono", display: "ibm-plex-sans" },
    shape: { control: 6, container: 10, overlay: 14, badge: 999 },
    elevation: "tactile",
    overlays: "glass",
    labels: "sentence",
    density: "default",
  },
} satisfies Record<string, Brand>

export type PresetId = keyof typeof PRESETS

/** The brand compiled by `npm run tokens`. */
export const brand: Brand = PRESETS.detent

// --- Generator ---------------------------------------------------------------

const r = (n: number, d = 4) => Number(n.toFixed(d))
const oklch = (l: number, c: number, h: number, a?: number) =>
  `oklch(${r(l, 3)} ${r(c)} ${r(h, 1)}${a === undefined ? "" : ` / ${a}%`})`

/**
 * Categorical chart palette: eight hues in a fixed, CVD-validated order, the
 * same for every brand. Deriving series colours from the accent hue (as this
 * did before) can put two hues side by side that collapse under deuteranopia,
 * so the order is the safety mechanism and must not be regenerated or cycled.
 * Values are the dataviz reference palette, re-validated against our card
 * surfaces in both modes. A 9th series folds into "Other" or small multiples.
 */
export const CHART = {
  light: ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300", "#4a3aa7", "#e34948"],
  dark: ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181", "#008300", "#9085e9", "#e66767"],
} as const

// Fixed-hue status colours; kept apart from the accent so meaning never shifts.
const STATUS = {
  red: 25,
  amber: 70,
  green: 152,
} as const

export interface Tokens {
  root: Record<string, string>
  light: Record<string, string>
  dark: Record<string, string>
  /** Per-theme material variables (not colours, so not mapped to colour utilities). */
  effects: { light: Record<string, string>; dark: Record<string, string> }
  theme: Record<string, string>
  fonts: FontId[]
}

const NONE = "0 0 #0000"

/**
 * Motion vocabulary. Durations are chosen by what moves:
 *   press   – a control sinking under the pointer (must feel instant)
 *   default – colour, shadow and highlight changes (hover, focus)
 *   panel   – things that open: collapsibles, overlays entering
 *   spring  – physical objects travelling: knobs, indicators, lifted cards
 */
export const MOTION = {
  durations: { press: 40, default: 110, panel: 200, spring: 300 },
  easings: {
    standard: "cubic-bezier(0.2, 0, 0.38, 0.9)",
    deliberate: "cubic-bezier(0.4, 0.14, 0.3, 1)",
    enter: "cubic-bezier(0, 0, 0.38, 0.9)",
    exit: "cubic-bezier(0.2, 0, 1, 0.9)",
    // Damped spring (~7% overshoot) as a CSS linear() easing.
    spring:
      "linear(0, 0.009, 0.035 2.1%, 0.141 4.4%, 0.723 12.9%, 0.938 16.7%, 1.017 20.3%, 1.061, 1.077 25.9%, 1.071 28.8%, 1.039 33.9%, 0.995 42.9%, 0.988, 0.986 52.2%, 1.001 72.3%, 1)",
  },
} as const
const SPRING = MOTION.easings.spring
const white = (a: number) => `oklch(1 0 0 / ${a}%)`
const black = (a: number) => `oklch(0 0 0 / ${a}%)`

export function createTokens(b: Brand): Tokens {
  const { hue: nh, chroma: nk } = b.neutral
  const n = (l: number, c: number, alpha?: number) => oklch(l, c * nk, nh, alpha)
  const { hue: ah, chroma: ac } = b.accent
  // Accent ramp: chroma tapers towards the light end so tints stay clean.
  const a = (l: number, k: number, alpha?: number) => oklch(l, ac * k, ah, alpha)
  const accent = {
    50: a(0.97, 0.09),
    100: a(0.935, 0.19),
    300: a(0.79, 0.55),
    400: a(0.69, 0.78),
    600: a(0.545, 1),
    700: a(0.47, 0.92),
  }
  const primary = (l: number) => a(l, 1)
  // Text on the accent fill: whichever of white or near-black reads better.
  const onPrimary = (l: number) => {
    const fill = parseOklch(primary(l))
    const light = oklch(1, 0, 0)
    const dark = n(0.18, 0.012)
    return contrast(parseOklch(light), fill) >= contrast(parseOklch(dark), fill) ? light : dark
  }
  // Rings need contrast against the page, so very light accents fall back to a deeper step.
  const lightRing = b.accent.light > 0.7 ? accent[700] : primary(b.accent.light)
  const lightAccentText = b.accent.light > 0.7 ? accent[700] : a(Math.min(b.accent.light, 0.5), 1)

  const s = (hue: number, l: number, c: number, alpha?: number) => oklch(l, c, hue, alpha)

  const light: Record<string, string> = {
    // shadcn contract
    background: n(0.99, 0.002),
    foreground: n(0.16, 0.006),
    card: oklch(1, 0, 0),
    "card-foreground": n(0.16, 0.006),
    popover: oklch(1, 0, 0),
    "popover-foreground": n(0.16, 0.006),
    primary: primary(b.accent.light),
    "primary-foreground": onPrimary(b.accent.light),
    secondary: n(0.958, 0.004),
    "secondary-foreground": n(0.205, 0.008),
    muted: n(0.958, 0.004),
    "muted-foreground": n(0.48, 0.013),
    accent: n(0.958, 0.004),
    "accent-foreground": n(0.16, 0.006),
    destructive: s(STATUS.red, 0.565, 0.205),
    border: n(0.918, 0.006),
    input: n(0.868, 0.008),
    ring: lightRing,
    ...Object.fromEntries(CHART.light.map((c, i) => [`chart-${i + 1}`, c])),
    sidebar: n(0.978, 0.003),
    "sidebar-foreground": n(0.205, 0.008),
    "sidebar-primary": primary(b.accent.light),
    "sidebar-primary-foreground": onPrimary(b.accent.light),
    "sidebar-accent": n(0.938, 0.005),
    "sidebar-accent-foreground": n(0.16, 0.006),
    "sidebar-border": n(0.918, 0.006),
    "sidebar-ring": lightRing,

    // Additions
    "surface-sunken": n(0.978, 0.003),
    "surface-raised": oklch(1, 0, 0),
    "surface-overlay": oklch(1, 0, 0),
    "border-strong": n(0.868, 0.008),
    "subtle-foreground": n(0.585, 0.013),
    "primary-hover": primary(b.accent.light - 0.06),
    "primary-subtle": accent[50],
    "primary-subtle-foreground": lightAccentText,
    "destructive-foreground": oklch(1, 0, 0),
    "destructive-subtle": s(STATUS.red, 0.97, 0.015),
    "destructive-subtle-foreground": s(STATUS.red, 0.565, 0.205),
    success: s(STATUS.green, 0.54, 0.13),
    "success-subtle": s(STATUS.green, 0.975, 0.02),
    "success-subtle-foreground": s(STATUS.green, 0.5, 0.13),
    warning: s(STATUS.amber, 0.77, 0.16),
    "warning-subtle": s(STATUS.amber, 0.98, 0.025),
    "warning-subtle-foreground": s(STATUS.amber, 0.52, 0.12),
    info: s(262, 0.545, 0.215),
    "info-subtle": s(262, 0.97, 0.018),
    "info-subtle-foreground": s(262, 0.47, 0.195),
    selection: a(0.6, 1, 20),
  }

  const fg = n(0.955, 0.003)
  const dark: Record<string, string> = {
    background: n(0.14, 0.005),
    foreground: fg,
    card: n(0.16, 0.006),
    "card-foreground": fg,
    popover: n(0.18, 0.007),
    "popover-foreground": fg,
    primary: primary(b.accent.dark),
    "primary-foreground": onPrimary(b.accent.dark),
    secondary: n(0.235, 0.009),
    "secondary-foreground": fg,
    muted: n(0.205, 0.008),
    "muted-foreground": n(0.7, 0.01),
    accent: n(0.235, 0.009),
    "accent-foreground": fg,
    destructive: s(STATUS.red, 0.58, 0.2),
    border: oklch(1, 0, 0, 8),
    input: oklch(1, 0, 0, 12),
    ring: accent[400],
    ...Object.fromEntries(CHART.dark.map((c, i) => [`chart-${i + 1}`, c])),
    sidebar: n(0.125, 0.005),
    "sidebar-foreground": n(0.87, 0.006),
    "sidebar-primary": primary(b.accent.dark),
    "sidebar-primary-foreground": onPrimary(b.accent.dark),
    "sidebar-accent": n(0.205, 0.008),
    "sidebar-accent-foreground": fg,
    "sidebar-border": oklch(1, 0, 0, 6),
    "sidebar-ring": accent[400],

    "surface-sunken": n(0.12, 0.005),
    "surface-raised": n(0.16, 0.006),
    "surface-overlay": n(0.18, 0.007),
    "border-strong": oklch(1, 0, 0, 16),
    "subtle-foreground": n(0.56, 0.012),
    "primary-hover": primary(Math.min(b.accent.dark + 0.06, 0.95)),
    "primary-subtle": a(0.6, 1, 14),
    "primary-subtle-foreground": accent[300],
    "destructive-foreground": oklch(1, 0, 0),
    "destructive-subtle": s(STATUS.red, 0.63, 0.2, 14),
    "destructive-subtle-foreground": s(STATUS.red, 0.7, 0.17),
    success: s(STATUS.green, 0.67, 0.15),
    "success-subtle": s(STATUS.green, 0.67, 0.15, 14),
    "success-subtle-foreground": s(STATUS.green, 0.75, 0.15),
    warning: s(STATUS.amber, 0.77, 0.16),
    "warning-subtle": s(STATUS.amber, 0.77, 0.16, 14),
    "warning-subtle-foreground": s(STATUS.amber, 0.82, 0.15),
    info: s(262, 0.61, 0.2),
    "info-subtle": s(262, 0.61, 0.2, 14),
    "info-subtle-foreground": s(262, 0.79, 0.115),
    selection: a(0.6, 1, 30),
  }

  const glass = b.overlays === "glass"
  if (glass) {
    // Frosted rather than white, so raised highlight chips can lift off it.
    light.popover = light["surface-overlay"] = n(0.965, 0.005, 76)
    dark.popover = dark["surface-overlay"] = n(0.19, 0.007, 72)
  }

  if (b.elevation === "tactile") {
    // Tactile hover is lighting, not colour: the fill brightens slightly and the
    // material utilities lift the highlight and shadow.
    light["primary-hover"] = primary(Math.min(b.accent.light + 0.025, 0.97))
    dark["primary-hover"] = primary(Math.min(b.accent.dark + 0.03, 0.97))
  }

  const effects = createEffects(b, n)

  const serifDisplay = FONTS[b.type.display].kind === "serif"
  const monoCaps = b.labels === "mono-caps"
  const soft = b.elevation !== "flat"
  const tactile = b.elevation === "tactile"

  const root: Record<string, string> = {
    "font-ui": stack(b.type.ui),
    "font-code": stack(b.type.mono),
    "font-display": stack(b.type.display),
    "display-weight": serifDisplay ? "400" : "600",
    "display-tracking": serifDisplay ? "-0.005em" : "-0.02em",

    "radius-control": `${b.shape.control}px`,
    "radius-container": `${b.shape.container}px`,
    "radius-overlay": `${b.shape.overlay}px`,
    "radius-badge": `${b.shape.badge}px`,
    // shadcn components sometimes reference --radius directly; alias it to the control role.
    radius: "var(--radius-control)",

    "elevation-xs": tactile ? `0 1px 1px ${black(6)}` : soft ? `0 1px 1px ${black(4)}` : NONE,
    "elevation-sm": tactile
      ? `0 0 0 0.5px ${black(4)}, 0 1px 2px ${black(5)}, 0 6px 16px -6px ${black(12)}`
      : soft
        ? `0 1px 2px ${black(6)}, 0 0 0 1px ${black(3)}`
        : NONE,
    "elevation-md": tactile
      ? `0 2px 4px -1px ${black(8)}, 0 12px 28px -6px ${black(18)}`
      : soft
        ? `0 4px 12px -2px ${black(10)}, 0 2px 4px -2px ${black(6)}`
        : `0 2px 6px ${black(8)}`,
    "elevation-lg": tactile
      ? `0 4px 8px -2px ${black(10)}, 0 28px 56px -12px ${black(30)}`
      : soft
        ? `0 16px 32px -8px ${black(18)}, 0 4px 8px -4px ${black(8)}`
        : `0 4px 12px ${black(12)}`,
    "elevation-control": soft ? `inset 0 1px 0 ${white(14)}, 0 1px 1px ${black(8)}` : NONE,

    "label-font": monoCaps ? "var(--font-code)" : "var(--font-ui)",
    "label-size": monoCaps ? "0.6875rem" : "0.75rem",
    "label-transform": monoCaps ? "uppercase" : "none",
    "label-tracking": monoCaps ? "0.06em" : "0",
    "label-weight": "500",

    spacing: { compact: "0.225rem", default: "0.25rem", comfortable: "0.28rem" }[b.density],

    // Motion as real variables, for transitions written outside utilities.
    ...Object.fromEntries(Object.entries(MOTION.easings).map(([k, v]) => [`motion-ease-${k}`, v])),
    ...Object.fromEntries(Object.entries(MOTION.durations).map(([k, v]) => [`motion-duration-${k}`, `${v}ms`])),
  }

  const theme: Record<string, string> = {
    ...Object.fromEntries(Object.keys(light).map((k) => [`color-${k}`, `var(--${k})`])),

    "font-sans": "var(--font-ui)",
    "font-mono": "var(--font-code)",
    "font-heading": "var(--font-display)",

    // Type scale: compact, on a 4px baseline
    "text-2xs": "0.6875rem",
    "text-2xs--line-height": "1rem",
    "text-xs": "0.75rem",
    "text-xs--line-height": "1rem",
    "text-sm": "0.8125rem",
    "text-sm--line-height": "1.25rem",
    "text-base": "0.875rem",
    "text-base--line-height": "1.5rem",
    "text-lg": "1rem",
    "text-lg--line-height": "1.5rem",
    "text-xl": "1.25rem",
    "text-xl--line-height": "1.75rem",
    "text-2xl": "1.5rem",
    "text-2xl--line-height": "2rem",
    "text-3xl": "2rem",
    "text-3xl--line-height": "2.5rem",

    // Radius roles: lg = control, xl = container, 2xl = overlay, 4xl = badge
    "radius-xs": "min(2px, var(--radius-control))",
    "radius-sm": "calc(var(--radius-control) * 0.75)",
    "radius-md": "var(--radius-control)",
    "radius-lg": "var(--radius-control)",
    "radius-xl": "var(--radius-container)",
    "radius-2xl": "var(--radius-overlay)",
    "radius-3xl": "calc(var(--radius-overlay) * 1.5)",
    "radius-4xl": "var(--radius-badge)",

    "shadow-xs": "var(--elevation-xs)",
    "shadow-sm": "var(--elevation-sm)",
    "shadow-md": "var(--elevation-md)",
    "shadow-lg": "var(--elevation-lg)",
    "shadow-control": "var(--elevation-control)",

    // Motion: fast curves, no bounce (the spring is the one exception)
    "ease-standard": "var(--motion-ease-standard)",
    "ease-deliberate": "var(--motion-ease-deliberate)",
    "ease-enter": "var(--motion-ease-enter)",
    "ease-exit": "var(--motion-ease-exit)",
    // Damped spring (~7% overshoot) for physical objects: knobs, sliding indicators.
    "ease-spring": "var(--motion-ease-spring)",
    "default-transition-duration": `${MOTION.durations.default}ms`,
    "default-transition-timing-function": MOTION.easings.standard,
  }

  const fonts = [...new Set([b.type.ui, b.type.mono, b.type.display])]
  return { root, light, dark, effects, theme, fonts }
}

/**
 * Material variables consumed by the `material-*` utilities. Every mode defines
 * the same keys, so components never branch on the mode themselves.
 *
 * Tactile assumes one light source from above: raised things catch a highlight
 * on their top edge and cast a shadow; recessed things take an inner shadow on
 * their top edge and catch light on their bottom lip.
 */
function createEffects(
  b: Brand,
  n: (l: number, c: number, alpha?: number) => string,
): Tokens["effects"] {
  const glassy = b.overlays === "glass"
  const overlay = (highlight: string) => ({
    "overlay-filter": glassy ? "blur(24px) saturate(1.8)" : "none",
    "overlay-highlight": glassy || b.elevation === "tactile" ? `inset 0 1px 0 ${highlight}` : NONE,
  })

  if (b.elevation === "tactile") {
    // Rest / hover / pressed lists keep the same shape (same count, same inset
    // positions) so box-shadow interpolates smoothly between states.
    return {
      light: {
        "mat-raised-fill": `linear-gradient(to bottom, ${white(0)}, ${black(2.5)})`,
        "mat-raised-edge": black(9),
        "mat-raised-shadow": `inset 0 1px 0 ${white(90)}, 0 1px 2px ${black(7)}, 0 2px 6px -2px ${black(8)}`,
        "mat-raised-shadow-hover": `inset 0 1px 0 ${white(100)}, 0 1px 3px ${black(9)}, 0 4px 10px -3px ${black(12)}`,
        "mat-pressed-shadow": `inset 0 1px 2px ${black(10)}, ${NONE}, ${NONE}`,
        "mat-raised-hover-bg": "var(--card)",
        "mat-solid-fill": `linear-gradient(to bottom, ${white(24)}, ${white(0)} 70%)`,
        "mat-solid-edge": black(12),
        "mat-solid-shadow": `inset 0 1px 0 ${white(40)}, inset 0 -1px 0 ${black(8)}, 0 1px 2px ${black(12)}`,
        "mat-solid-shadow-hover": `inset 0 1px 0 ${white(60)}, inset 0 -1px 0 ${black(8)}, 0 2px 4px ${black(14)}`,
        "mat-solid-pressed": `inset 0 1px 3px ${black(20)}, inset 0 0 0 #0000, ${NONE}`,
        "mat-glow": "45%",
        "mat-glow-hover": "60%",
        "mat-press-depth": "1px",
        "mat-recessed-bg": n(0.955, 0.004),
        "mat-track-bg": n(0.955, 0.004),
        "mat-recessed-edge": black(5),
        "mat-recessed-shadow": `inset 0 1px 2px ${black(7)}, 0 1px 0 ${white(80)}`,
        "mat-latched-bg": n(0.935, 0.005),
        "mat-latched-shadow": `inset 0 1px 3px ${black(12)}, 0 1px 0 ${white(80)}`,
        "mat-highlight-bg": "oklch(1 0 0)",
        "mat-highlight-shadow": `inset 0 1px 0 oklch(1 0 0), 0 0 0 0.5px ${black(10)}, 0 1px 2px ${black(8)}, 0 2px 5px -2px ${black(10)}`,
        "mat-lift": "-2px",
        "mat-tilt": "1deg",
        "mat-pickup-scale": "1.02",
        "mat-track-off": n(0.9, 0.006),
        "mat-knob-bg": "oklch(1 0 0)",
        "mat-knob-fill": "linear-gradient(to bottom, oklch(1 0 0), oklch(0.955 0 0))",
        "mat-knob-shadow": `inset 0 1px 0 oklch(1 0 0), 0 0 0 0.5px ${black(8)}, 0 2px 4px ${black(16)}, 0 5px 12px -3px ${black(16)}`,
        "mat-tint-top": "6%",
        "mat-tint-bottom": "14%",
        "mat-tint-edge": "22%",
        "mat-tint-shadow": `inset 0 1px 0 ${white(55)}`,
        ...overlay(white(70)),
      },
      dark: {
        "mat-raised-fill": `linear-gradient(to bottom, ${white(5)}, ${white(1)})`,
        "mat-raised-edge": white(9),
        "mat-raised-shadow": `inset 0 1px 0 ${white(7)}, 0 1px 2px ${black(45)}, 0 3px 8px -2px ${black(35)}`,
        "mat-raised-shadow-hover": `inset 0 1px 0 ${white(12)}, 0 2px 4px ${black(50)}, 0 6px 14px -3px ${black(40)}`,
        "mat-pressed-shadow": `inset 0 1px 3px ${black(45)}, ${NONE}, ${NONE}`,
        "mat-raised-hover-bg": "var(--card)",
        "mat-solid-fill": `linear-gradient(to bottom, ${white(22)}, ${white(0)} 70%)`,
        "mat-solid-edge": black(30),
        "mat-solid-shadow": `inset 0 1px 0 ${white(35)}, inset 0 -1px 0 ${black(12)}, 0 1px 2px ${black(50)}`,
        "mat-solid-shadow-hover": `inset 0 1px 0 ${white(50)}, inset 0 -1px 0 ${black(12)}, 0 2px 4px ${black(55)}`,
        "mat-solid-pressed": `inset 0 1px 3px ${black(35)}, inset 0 0 0 #0000, ${NONE}`,
        "mat-glow": "30%",
        "mat-glow-hover": "45%",
        "mat-press-depth": "1px",
        "mat-recessed-bg": n(0.115, 0.005),
        "mat-track-bg": n(0.115, 0.005),
        "mat-recessed-edge": white(6),
        "mat-recessed-shadow": `inset 0 1px 3px ${black(45)}, 0 1px 0 ${white(5)}`,
        "mat-latched-bg": n(0.1, 0.005),
        "mat-latched-shadow": `inset 0 1px 3px ${black(55)}, 0 1px 0 ${white(5)}`,
        "mat-highlight-bg": white(9),
        "mat-highlight-shadow": `inset 0 1px 0 ${white(10)}, 0 0 0 0.5px ${black(50)}, 0 1px 3px ${black(40)}`,
        "mat-lift": "-2px",
        "mat-tilt": "1deg",
        "mat-pickup-scale": "1.02",
        "mat-track-off": n(0.27, 0.01),
        "mat-knob-bg": "oklch(0.97 0 0)",
        "mat-knob-fill": "linear-gradient(to bottom, oklch(1 0 0), oklch(0.88 0 0))",
        "mat-knob-shadow": `inset 0 1px 0 oklch(1 0 0), 0 0 0 0.5px ${black(40)}, 0 2px 5px ${black(50)}`,
        "mat-tint-top": "10%",
        "mat-tint-bottom": "18%",
        "mat-tint-edge": "26%",
        "mat-tint-shadow": `inset 0 1px 0 ${white(8)}`,
        ...overlay(white(8)),
      },
    }
  }

  const soft = b.elevation === "soft"
  const common = (dark: boolean) => {
    const raised = soft ? `0 1px 1px ${black(dark ? 20 : 4)}` : NONE
    const solid = soft ? `inset 0 1px 0 ${white(14)}, 0 1px 1px ${black(8)}` : NONE
    return {
      "mat-raised-fill": "none",
      "mat-raised-edge": "var(--border)",
      "mat-raised-shadow": raised,
      "mat-raised-shadow-hover": raised,
      "mat-pressed-shadow": raised,
      "mat-raised-hover-bg": "var(--accent)",
      "mat-solid-fill": "none",
      "mat-solid-edge": "transparent",
      "mat-solid-shadow": solid,
      "mat-solid-shadow-hover": solid,
      "mat-solid-pressed": solid,
      "mat-glow": "0%",
      "mat-glow-hover": "0%",
      "mat-press-depth": "0px",
      "mat-recessed-bg": dark ? white(3) : "transparent",
      "mat-track-bg": "var(--muted)",
      "mat-recessed-edge": "var(--input)",
      "mat-recessed-shadow": NONE,
      "mat-latched-bg": "var(--muted)",
      "mat-latched-shadow": NONE,
      "mat-highlight-bg": "var(--accent)",
      "mat-highlight-shadow": NONE,
      "mat-lift": soft ? "-1px" : "0px",
      "mat-tilt": "0deg",
      "mat-pickup-scale": "1",
      "mat-track-off": "var(--input)",
      "mat-knob-bg": dark ? "oklch(0.95 0 0)" : "oklch(1 0 0)",
      "mat-knob-fill": "none",
      "mat-knob-shadow": soft ? `0 1px 2px ${black(dark ? 40 : 18)}` : `0 0 0 0.5px ${black(12)}`,
      "mat-tint-top": "0%",
      "mat-tint-bottom": "0%",
      "mat-tint-edge": "0%",
      "mat-tint-shadow": NONE,
      ...overlay(white(dark ? 8 : 70)),
    }
  }
  return { light: common(false), dark: common(true) }
}

/** Serialise the runtime variables (root + light + dark + effects) as CSS. */
export function tokensToCss(t: Pick<Tokens, "root" | "light" | "dark" | "effects">) {
  const block = (sel: string, vars: Record<string, string>) =>
    `${sel} {\n${Object.entries(vars)
      .map(([k, v]) => `  --${k}: ${v};`)
      .join("\n")}\n}`
  return `${block(":root", { ...t.root, ...t.light, ...t.effects.light })}\n\n${block(".dark", {
    ...t.dark,
    ...t.effects.dark,
  })}`
}

type Rules = { [prop: string]: string | Rules }

/** Base-layer rules shipped with the theme. */
export const base: Record<string, Rules> = {
  "*": { "@apply border-border outline-ring/50": "" },
  html: {
    "@apply font-sans antialiased": "",
    "text-rendering": "optimizeLegibility",
  },
  body: { "@apply bg-background text-foreground text-sm": "" },
  "h1, h2, h3": {
    "font-family": "var(--font-display)",
    "font-weight": "var(--display-weight)",
    "letter-spacing": "var(--display-tracking)",
  },
  "::selection": { "background-color": "var(--selection)" },
  "code, kbd, samp, pre": { "font-feature-settings": '"zero"' },
  "@keyframes progress-indeterminate": {
    from: { translate: "-100% 0" },
    to: { translate: "300% 0" },
  },
  "@media (prefers-reduced-motion: reduce)": {
    "*, ::before, ::after": {
      "transition-duration": "0.01ms !important",
      "animation-duration": "0.01ms !important",
      // Without this, infinite animations (spinners, pulses, carets) would
      // cycle every 0.01ms — a flicker, not stillness.
      "animation-iteration-count": "1 !important",
    },
  },
}

// Tailwind's box-shadow composition, so materials coexist with ring-* focus styles.
const SHADOW_STACK = [
  "--tw-inset-shadow",
  "--tw-inset-ring-shadow",
  "--tw-ring-offset-shadow",
  "--tw-ring-shadow",
  "--tw-shadow",
]
  .map((v) => `var(${v}, ${NONE})`)
  .join(", ")

// Latched toggles (aria-pressed) are excluded: once on, they stay pushed in.
const INTERACTIVE = "&:is(button, [role='button'], [role='tab'], a):not(:disabled, [data-disabled], [aria-pressed='true'])"
const HOVER = "@media (hover: hover)"
// `data-preview` pins a state for documentation specimens (rest / hover / pressed side by side).
const hovered = `${INTERACTIVE}:hover, &[data-preview='hover']`
const active = `${INTERACTIVE}:active, &[data-preview='active']`
const pressed = (shadow: string): Rules => ({
  "--tw-shadow": shadow,
  "background-image": "none",
  "transition-duration": `${MOTION.durations.press}ms`,
  "@media (prefers-reduced-motion: no-preference)": { translate: "0 var(--mat-press-depth)" },
})

/** Custom utilities shipped with the theme. */
export const utilities: Record<string, Rules> = {
  eyebrow: {
    "font-family": "var(--label-font)",
    "font-size": "var(--label-size)",
    "line-height": "1rem",
    "font-weight": "var(--label-weight)",
    "text-transform": "var(--label-transform)",
    "letter-spacing": "var(--label-tracking)",
  },
  /** An object sitting on the surface: secondary buttons, keycaps, active segments, triggers. */
  "material-raised": {
    "background-image": "var(--mat-raised-fill)",
    "border-color": "var(--mat-raised-edge)",
    "--tw-shadow": "var(--mat-raised-shadow)",
    "box-shadow": SHADOW_STACK,
    [HOVER]: { [hovered]: { "--tw-shadow": "var(--mat-raised-shadow-hover)" } },
    [active]: pressed("var(--mat-pressed-shadow)"),
  },
  /** A glossy coloured fill. Glow follows `--material-tint` (defaults to primary). */
  "material-solid": {
    "background-image": "var(--mat-solid-fill)",
    "background-clip": "border-box",
    "border-color": "var(--mat-solid-edge)",
    "--tw-shadow":
      "var(--mat-solid-shadow), 0 3px 10px -3px color-mix(in oklch, var(--material-tint, var(--primary)) var(--mat-glow), transparent)",
    "box-shadow": SHADOW_STACK,
    [HOVER]: {
      [hovered]: {
        "--tw-shadow":
          "var(--mat-solid-shadow-hover), 0 6px 16px -4px color-mix(in oklch, var(--material-tint, var(--primary)) var(--mat-glow-hover), transparent)",
      },
    },
    [active]: pressed("var(--mat-solid-pressed), 0 0 0 0 transparent"),
  },
  /** A well pressed into the surface: inputs, tracks, segmented-control trays. */
  "material-recessed": {
    "background-color": "var(--mat-recessed-bg)",
    "border-color": "var(--mat-recessed-edge)",
    "--tw-shadow": "var(--mat-recessed-shadow)",
    "box-shadow": SHADOW_STACK,
  },
  /**
   * A borderless trough: slider and progress tracks, tab trays, skeletons.
   * Same well as material-recessed in tactile brands, but always has a fill,
   * because without a border a transparent track would be invisible.
   */
  "material-track": {
    "background-color": "var(--mat-track-bg)",
    "--tw-shadow": "var(--mat-recessed-shadow)",
    "box-shadow": SHADOW_STACK,
  },
  /** A toggle that is on: pushed into the surface and held there. */
  "material-latched": {
    "background-color": "var(--mat-latched-bg)",
    "background-image": "none",
    "border-color": "var(--mat-recessed-edge)",
    "--tw-shadow": "var(--mat-latched-shadow)",
    "box-shadow": SHADOW_STACK,
  },
  /** The highlighted row in a menu or listbox: a small raised chip above the (glass) surface. */
  "material-highlight": {
    "background-color": "var(--mat-highlight-bg)",
    "--tw-shadow": "var(--mat-highlight-shadow)",
    "box-shadow": SHADOW_STACK,
  },
  /**
   * Something you can pick up: lifts on hover, and while held rises further,
   * scales and tilts. Distances come from the brand (flat brands stay still).
   */
  "material-lift": {
    "transition-property": "translate, scale, rotate, box-shadow",
    "transition-duration": `${MOTION.durations.spring}ms`,
    "transition-timing-function": SPRING,
    [HOVER]: { "&:hover": { translate: "0 var(--mat-lift)", "--tw-shadow": "var(--elevation-md)" } },
    "&:active, &[data-dragging]": {
      translate: "0 calc(var(--mat-lift) * 2)",
      scale: "var(--mat-pickup-scale)",
      rotate: "var(--mat-tilt)",
      "--tw-shadow": "var(--elevation-lg)",
      cursor: "grabbing",
    },
  },
  /** A lit, physical thumb: switch and slider knobs. */
  "material-knob": {
    "background-color": "var(--mat-knob-bg)",
    "background-image": "var(--mat-knob-fill)",
    "--tw-shadow": "var(--mat-knob-shadow)",
    "box-shadow": SHADOW_STACK,
  },
  /** A jelly tint derived from the current text colour: status badges, subtle buttons. Scale with `--tint-strength`. */
  "material-tint": {
    "background-image":
      "linear-gradient(to bottom, color-mix(in oklch, currentColor calc(var(--mat-tint-top) * var(--tint-strength, 1)), transparent), color-mix(in oklch, currentColor calc(var(--mat-tint-bottom) * var(--tint-strength, 1)), transparent))",
    "border-color": "color-mix(in oklch, currentColor calc(var(--mat-tint-edge) * var(--tint-strength, 1)), transparent)",
    "--tw-shadow": "var(--mat-tint-shadow)",
    "box-shadow": SHADOW_STACK,
  },
  /** Floating layers. Adds glass blur and an edge highlight when the brand asks for them. */
  "material-overlay": {
    "-webkit-backdrop-filter": "var(--overlay-filter)",
    "backdrop-filter": "var(--overlay-filter)",
    "--tw-inset-shadow": "var(--overlay-highlight)",
  },
}
