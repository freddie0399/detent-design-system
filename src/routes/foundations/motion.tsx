import { useState, useSyncExternalStore } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { PlayIcon, RotateCcwIcon } from "lucide-react"

import { MOTION } from "../../../tokens/tokens"
import { DocsPage, Section } from "@/docs/page"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const Route = createFileRoute("/foundations/motion")({ component: MotionPage })

const DURATION_USE: Record<keyof typeof MOTION.durations, [string, string]> = {
  press: ["A control sinking under the pointer", "Buttons, toggles, raised segments"],
  default: ["Colour, shadow and highlight changes", "Hover lift, focus, fills"],
  panel: ["Things opening", "Collapsibles, overlays entering"],
  spring: ["Physical objects travelling", "Switch knob, tab indicator, lifted cards"],
}

const EASING_USE: Record<keyof typeof MOTION.easings, string> = {
  standard: "The default. Quick to start, settles gently. Most UI transitions.",
  deliberate: "Slower to settle. Larger moves that should be noticed.",
  enter: "Decelerates in. Things appearing.",
  exit: "Accelerates out. Things leaving; they don't need to settle.",
  spring: "Overshoots slightly and settles, like a physical object.",
}

const DEMO_MS = 700

/** Points (x, y in 0–1) sampled from a cubic-bezier() or linear() easing. */
function easingPoints(easing: string): [number, number][] {
  const bezier = /cubic-bezier\(([^)]+)\)/.exec(easing)
  if (bezier) {
    const [x1, y1, x2, y2] = bezier[1].split(",").map(Number)
    return Array.from({ length: 41 }, (_, i) => {
      const t = i / 40
      const b = (p1: number, p2: number) => 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t ** 2 * p2 + t ** 3
      return [b(x1, x2), b(y1, y2)]
    })
  }
  // linear(v [p%], …): stops without a position are spaced evenly between neighbours.
  const stops = /linear\((.*)\)/.exec(easing)![1].split(",").map((part) => {
    const [v, p] = part.trim().split(/\s+/)
    return { y: Number(v), x: p === undefined ? undefined : parseFloat(p) / 100 }
  })
  stops[0].x ??= 0
  stops[stops.length - 1].x ??= 1
  for (let i = 1; i < stops.length; i++) {
    if (stops[i].x !== undefined) continue
    let j = i
    while (stops[j].x === undefined) j++
    const [from, to] = [stops[i - 1].x!, stops[j].x!]
    for (let k = i; k < j; k++) stops[k].x = from + ((to - from) * (k - i + 1)) / (j - i + 1)
  }
  return stops.map((s) => [s.x!, s.y])
}

function Curve({ easing }: { easing: string }) {
  const points = easingPoints(easing)
    .map(([x, y]) => `${(x * 100).toFixed(2)},${((1 - y) * 100).toFixed(2)}`)
    .join(" ")
  return (
    <svg viewBox="-6 -16 112 128" className="size-20 shrink-0" aria-hidden>
      <rect x="0" y="0" width="100" height="100" className="fill-none stroke-border" strokeDasharray="3 3" />
      <polyline points={points} className="fill-none stroke-primary" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)"
function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mql = matchMedia(reducedMotionQuery)
      mql.addEventListener("change", cb)
      return () => mql.removeEventListener("change", cb)
    },
    () => matchMedia(reducedMotionQuery).matches,
  )
}

function MotionPage() {
  const [played, setPlayed] = useState(false)
  const reduced = useReducedMotion()
  return (
    <DocsPage
      eyebrow="Foundations"
      title="Motion"
      description="Motion explains what happened: something pressed in, opened, or moved. Durations are chosen by what moves; physical objects travel on a spring."
    >
      {reduced && (
        <Alert variant="info">
          <AlertTitle>Reduced motion is on</AlertTitle>
          <AlertDescription>
            Your system asks for reduced motion, so transitions are effectively instant and the demos below won't animate.
          </AlertDescription>
        </Alert>
      )}

      <Section title="Durations">
        <div className="overflow-hidden rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Token</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>When</TableHead>
                <TableHead className="hidden pr-4 md:table-cell">Examples</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(Object.entries(MOTION.durations) as [keyof typeof MOTION.durations, number][]).map(([name, ms]) => (
                <TableRow key={name}>
                  <TableCell className="pl-4 font-mono text-xs">{name}</TableCell>
                  <TableCell className="font-mono text-xs tabular-nums">{ms}ms</TableCell>
                  <TableCell>{DURATION_USE[name][0]}</TableCell>
                  <TableCell className="hidden pr-4 text-muted-foreground md:table-cell">{DURATION_USE[name][1]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>

      <Section
        title="Easing"
        description={`Each curve is played over ${DEMO_MS}ms here so the differences are visible; in the UI they run at the durations above.`}
      >
        <div className="mb-3 flex gap-2">
          <Button size="sm" onClick={() => setPlayed((p) => !p)}>
            {played ? <RotateCcwIcon /> : <PlayIcon />} {played ? "Reverse" : "Play"}
          </Button>
        </div>
        <div className="divide-y rounded-xl border bg-card">
          {(Object.entries(MOTION.easings) as [keyof typeof MOTION.easings, string][]).map(([name, easing]) => (
            <div key={name} className="flex flex-wrap items-center gap-4 px-4 py-3">
              <Curve easing={easing} />
              <div className="w-48 min-w-0">
                <div className="font-mono text-xs">ease-{name}</div>
                <p className="text-muted-foreground">{EASING_USE[name]}</p>
              </div>
              <div className="relative h-6 min-w-40 flex-1 rounded-full border material-recessed">
                <div
                  className="absolute top-1/2 size-5 -translate-y-1/2 rounded-full material-knob"
                  style={{
                    left: played ? "calc(100% - 1.375rem)" : "0.125rem",
                    transition: `left ${DEMO_MS}ms ${easing}`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Reduced motion">
        <ul className="grid max-w-prose list-disc gap-1.5 pl-5 text-muted-foreground">
          <li>
            <span className="text-foreground">Transitions and animations collapse to near-instant</span> when the OS asks for
            reduced motion. State still changes; it just doesn't travel.
          </li>
          <li>
            <span className="text-foreground">Pressed controls stop sinking,</span> so nothing moves under the pointer.
          </li>
          <li>
            <span className="text-foreground">Don't use motion as the only signal.</span> Pressed, open and selected states
            must also differ in colour, depth or shape.
          </li>
        </ul>
      </Section>
    </DocsPage>
  )
}
