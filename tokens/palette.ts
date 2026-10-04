/**
 * Categorical chart-palette checks, run by the strict token build (CI).
 *
 * Follows the data-viz method the CHART palette was chosen with:
 *   - lightness band per mode (OKLCH L 0.43–0.77 light, 0.48–0.67 dark)
 *   - chroma floor (C >= 0.10), below which a hue reads as grey
 *   - adjacent-pair separation as Euclidean OKLab distance x100 (ΔE):
 *       • under protanopia and deuteranopia, simulated with Machado,
 *         Oliveira & Fernandes (2009) at severity 1.0: >= 8 target, 6–8 is a
 *         floor that's only legal with secondary encoding, < 6 fails
 *       • under normal vision: >= 15, a hard floor
 *   - contrast against the chart surface: < 3:1 is a warning that obliges a
 *     legend + table view (ChartFrame provides both), not a failure
 *
 * Adjacent pairs are the right test for bars, stacks and lines; scatter-like
 * charts compare all pairs and are capped at three series instead.
 */
import { contrast, parseOklch } from "./contrast.ts"

type Vec3 = [number, number, number]

const decode = (x: number) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)
const encode = (x: number) => (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055)
const clamp = (x: number) => Math.min(1, Math.max(0, x))

/** "#rrggbb" or "oklch(...)" → linear sRGB. */
function toLinear(color: string): Vec3 {
  if (color.startsWith("#")) {
    const n = parseInt(color.slice(1), 16)
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => decode(v / 255)) as Vec3
  }
  const c = parseOklch(color)
  return [decode(c.r), decode(c.g), decode(c.b)]
}

function toOklab([r, g, b]: Vec3): Vec3 {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ]
}

// Machado, Oliveira & Fernandes (2009), severity 1.0, applied in linear RGB.
const CVD: Record<"protan" | "deutan", number[][]> = {
  protan: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
  deutan: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.01182, 0.04294, 0.968881],
  ],
}
const simulate = (rgb: Vec3, m: number[][]): Vec3 =>
  m.map((row) => clamp(row[0] * rgb[0] + row[1] * rgb[1] + row[2] * rgb[2])) as Vec3

const deltaE = (a: Vec3, b: Vec3) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) * 100

export interface PaletteReport {
  failures: string[]
  warnings: string[]
  worstCvd: { pair: string; deltaE: number }
  worstNormal: { pair: string; deltaE: number }
}

export function validatePalette(colors: readonly string[], mode: "light" | "dark", surface: string): PaletteReport {
  const failures: string[] = []
  const warnings: string[] = []
  const [lo, hi] = mode === "light" ? [0.43, 0.77] : [0.48, 0.67]
  const linear = colors.map(toLinear)
  const lab = linear.map(toOklab)

  colors.forEach((c, i) => {
    const [L, a, b] = lab[i]
    const C = Math.hypot(a, b)
    if (L < lo - 0.005 || L > hi + 0.005) failures.push(`${c} lightness ${L.toFixed(3)} outside ${lo}–${hi}`)
    if (C < 0.1) failures.push(`${c} chroma ${C.toFixed(3)} below 0.10`)
    const rgb = linear[i].map(encode)
    const ratio = contrast({ r: rgb[0], g: rgb[1], b: rgb[2], a: 1 }, (() => {
      const s = toLinear(surface).map(encode)
      return { r: s[0], g: s[1], b: s[2], a: 1 }
    })())
    if (ratio < 3) warnings.push(`${c} is ${ratio.toFixed(2)}:1 on the surface (legend + table view required)`)
  })

  let worstCvd = { pair: "", deltaE: Infinity }
  let worstNormal = { pair: "", deltaE: Infinity }
  for (let i = 1; i < colors.length; i++) {
    const pair = `${colors[i - 1]}↔${colors[i]}`
    const normal = deltaE(lab[i - 1], lab[i])
    if (normal < worstNormal.deltaE) worstNormal = { pair, deltaE: normal }
    if (normal < 15) failures.push(`${pair} normal-vision ΔE ${normal.toFixed(1)} below 15`)
    for (const [kind, matrix] of Object.entries(CVD)) {
      const d = deltaE(toOklab(simulate(linear[i - 1], matrix)), toOklab(simulate(linear[i], matrix)))
      if (d < worstCvd.deltaE) worstCvd = { pair: `${pair} (${kind})`, deltaE: d }
      if (d < 6) failures.push(`${pair} ${kind} ΔE ${d.toFixed(1)} below the 6 floor`)
      else if (d < 8) warnings.push(`${pair} ${kind} ΔE ${d.toFixed(1)} in the 6–8 band (needs secondary encoding)`)
    }
  }
  return { failures, warnings, worstCvd, worstNormal }
}
