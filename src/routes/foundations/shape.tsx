import { createFileRoute } from "@tanstack/react-router"
import { PlusIcon } from "lucide-react"

import { type Brand } from "../../../tokens/tokens"
import { DocsPage, Section } from "@/docs/page"
import { useBrandContext, useTheme } from "@/docs/providers"
import { brandStyle } from "@/explorer/use-brand"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

export const Route = createFileRoute("/foundations/shape")({ component: ShapePage })

const SPACING_STEPS = [1, 2, 3, 4, 6, 8, 12, 16]

function ShapePage() {
  const { brand, tokens } = useBrandContext()
  const spacingPx = parseFloat(tokens.root.spacing) * 16
  const roles = [
    { role: "Control", cls: "rounded-lg", px: brand.shape.control, use: "Buttons, inputs, menu items" },
    { role: "Container", cls: "rounded-xl", px: brand.shape.container, use: "Cards, menus, popovers" },
    { role: "Overlay", cls: "rounded-2xl", px: brand.shape.overlay, use: "Dialogs, sheets, board lanes" },
    { role: "Badge", cls: "rounded-4xl", px: brand.shape.badge, use: "Badges, chips" },
  ]
  return (
    <DocsPage
      eyebrow="Foundations"
      title="Shape & density"
      description="Corner radii are assigned by role, not by size, so a brand can go square or soft in one place. Spacing is a single multiplier, so density changes every gap and control height together."
    >
      <Section title="Radius roles" description="Use the Tailwind class for the role; the brand decides the value.">
        <div className="grid gap-3 sm:grid-cols-2">
          {roles.map((r) => (
            <div key={r.role} className="flex items-center gap-4 rounded-xl border bg-card p-4">
              <div className={`size-14 shrink-0 border-2 border-primary bg-primary-subtle ${r.cls}`} />
              <div className="min-w-0">
                <div className="font-medium">
                  {r.role}{" "}
                  <span className="font-mono text-xs text-muted-foreground">
                    {r.cls} · {r.px >= 999 ? "pill" : `${r.px}px`}
                  </span>
                </div>
                <div className="text-muted-foreground">{r.use}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Nesting"
        description="An inner corner should equal the outer radius minus the padding between them, so the curves stay concentric. Menus (container radius, 4px padding, control-radius items) follow this."
      >
        <div className="flex flex-wrap items-center gap-6 rounded-xl border bg-card p-6">
          <div className="rounded-2xl border bg-surface-sunken p-2">
            <div className="flex gap-2 rounded-[calc(var(--radius-overlay)-0.5rem)] bg-card p-3 shadow-sm">
              <Button size="sm">Concentric</Button>
            </div>
          </div>
          <div className="rounded-2xl border bg-surface-sunken p-2">
            <div className="flex gap-2 rounded-2xl bg-card p-3 shadow-sm">
              <Button size="sm" variant="outline">Same radius (avoid)</Button>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Spacing"
        description={`One unit is ${spacingPx}px at the current density. Every p-*, gap-* and h-* is a multiple of it.`}
      >
        <div className="grid gap-2 rounded-xl border bg-card p-4">
          {SPACING_STEPS.map((n) => (
            <div key={n} className="grid grid-cols-[3rem_4rem_1fr] items-center gap-3">
              <code className="font-mono text-xs">{n}</code>
              <span className="font-mono text-xs text-muted-foreground tabular-nums">
                {Math.round(n * spacingPx * 10) / 10}px
              </span>
              <div className="h-3 rounded-sm bg-primary/70" style={{ width: `calc(var(--spacing) * ${n})` }} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Density" description="The same interface at each density. Only the spacing multiplier changes; type sizes stay put so text never reflows.">
        <div className="grid gap-4 lg:grid-cols-3">
          {(["compact", "default", "comfortable"] as const).map((d) => (
            <DensityPreview key={d} brand={{ ...brand, density: d }} label={d} />
          ))}
        </div>
      </Section>
    </DocsPage>
  )
}

function DensityPreview({ brand, label }: { brand: Brand; label: string }) {
  const { dark } = useTheme()
  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="border-b bg-surface-sunken px-3 py-2">
        <span className="eyebrow text-muted-foreground capitalize">{label}</span>
      </div>
      <div style={brandStyle(brand, dark)} className="flex flex-col gap-3 bg-background p-4 font-sans text-foreground">
        <div className="flex gap-2">
          <Input placeholder="Search…" className="flex-1" />
          <Button size="icon" aria-label="Add"><PlusIcon /></Button>
        </div>
        <div className="divide-y rounded-lg border bg-card">
          {["Notifications", "Weekly digest", "Mentions only"].map((row, i) => (
            <div key={row} className="flex items-center justify-between px-3 py-2">
              <span>{row}</span>
              <Switch defaultChecked={i !== 2} aria-label={row} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
