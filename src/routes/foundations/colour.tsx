import { createFileRoute } from "@tanstack/react-router"

import { auditContrast } from "../../../tokens/contrast"
import { DocsPage, Section } from "@/docs/page"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useBrandContext, useTheme } from "@/docs/providers"

export const Route = createFileRoute("/foundations/colour")({ component: ColourPage })

const SEMANTIC_GROUPS: Record<string, string[]> = {
  Surfaces: ["background", "surface-sunken", "card", "popover", "muted", "accent"],
  Text: ["foreground", "muted-foreground", "subtle-foreground", "primary-subtle-foreground"],
  Borders: ["border", "border-strong", "input", "ring"],
  Intent: ["primary", "destructive", "success", "warning", "info"],
  Charts: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5", "chart-6", "chart-7", "chart-8"],
}

const NEUTRAL_STEPS = ["background", "surface-sunken", "muted", "border", "input", "subtle-foreground", "muted-foreground", "foreground"]
const ACCENT_STEPS = ["primary-subtle", "ring", "primary", "primary-hover", "primary-subtle-foreground"]

function Ramp({ name, keys }: { name: string; keys: string[] }) {
  return (
    <div>
      <div className="mb-2 eyebrow text-muted-foreground">{name}</div>
      <div className="flex overflow-hidden rounded-xl ring-1 ring-border">
        {keys.map((k) => (
          <div key={k} className="h-12 flex-1" style={{ background: `var(--${k})` }} title={k} />
        ))}
      </div>
    </div>
  )
}

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="size-8 shrink-0 rounded-md ring-1 ring-border ring-inset" style={{ background: `var(--${name})` }} />
      <div className="min-w-0">
        <div className="truncate font-mono text-xs">{name}</div>
        <div className="truncate font-mono text-2xs text-subtle-foreground">{value}</div>
      </div>
    </div>
  )
}

function ColourPage() {
  const { tokens } = useBrandContext()
  const { dark } = useTheme()
  const values = dark ? tokens.dark : tokens.light
  return (
    <DocsPage
      eyebrow="Foundations"
      title="Colour"
      description="The accent and neutral tint are generated in OKLCH from a few brand numbers. Components only use semantic tokens, so every direction is a token swap away."
    >
      <Section title="Ramps">
        <div className="flex flex-col gap-6">
          <Ramp name="Neutral" keys={NEUTRAL_STEPS} />
          <Ramp name="Accent" keys={ACCENT_STEPS} />
        </div>
      </Section>
      <Section
        title="Contrast"
        description="Every foreground/background pairing the components render, checked against WCAG 2 for the live brand in both themes. Text needs 4.5:1; non-text UI (focus rings, icons, borders) needs 3:1. The token build warns when a pair fails."
      >
        <ContrastAudit />
      </Section>

      <Section title="Semantic tokens" description="Values shown for the current theme.">
        <div className="grid gap-8 sm:grid-cols-2">
          {Object.entries(SEMANTIC_GROUPS).map(([group, names]) => (
            <div key={group}>
              <div className="mb-3 eyebrow text-muted-foreground">{group}</div>
              <div className="grid gap-3">
                {names.map((n) => (
                  <Swatch key={n} name={n} value={values[n]} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </DocsPage>
  )
}

function Ratio({ ratio, min }: { ratio: number; min: number }) {
  return (
    <Badge variant={ratio >= min ? "success" : "destructive"} className="font-mono tabular-nums">
      {ratio.toFixed(2)}
    </Badge>
  )
}

function ContrastAudit() {
  const { tokens } = useBrandContext()
  const light = auditContrast(tokens.light)
  const dark = auditContrast(tokens.dark)
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Use</TableHead>
            <TableHead className="hidden xl:table-cell">Pair</TableHead>
            <TableHead>Needs</TableHead>
            <TableHead>Light</TableHead>
            <TableHead className="pr-4">Dark</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {light.map((r, i) => (
            <TableRow key={r.use}>
              <TableCell className="pl-4">
                <span
                  className="mr-2 inline-grid size-6 place-items-center rounded-md align-middle text-xs font-semibold ring-1 ring-border"
                  style={{ background: `var(--${r.bg})`, color: `var(--${r.fg})` }}
                  aria-hidden
                >
                  Aa
                </span>
                {r.use}
              </TableCell>
              <TableCell className="hidden font-mono text-2xs text-muted-foreground xl:table-cell">
                {r.fg} / {r.bg}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground tabular-nums">{r.min}:1</TableCell>
              <TableCell><Ratio ratio={r.ratio} min={r.min} /></TableCell>
              <TableCell className="pr-4"><Ratio ratio={dark[i].ratio} min={dark[i].min} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
