import { Fragment } from "react"
import { createFileRoute } from "@tanstack/react-router"

import { DocsPage, Example, Section } from "@/docs/page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const Route = createFileRoute("/foundations/materials")({ component: MaterialsPage })

const MATERIALS = [
  { name: "material-raised", role: "An object sitting on the surface", sample: <div className="h-10 w-24 rounded-lg border bg-card material-raised" /> },
  { name: "material-solid", role: "A glossy coloured fill", sample: <div className="h-10 w-24 rounded-lg border bg-primary material-solid" /> },
  { name: "material-recessed", role: "A well in the surface", sample: <div className="h-10 w-24 rounded-lg border material-recessed" /> },
  { name: "material-latched", role: "A toggle that is on: held in", sample: <div className="h-10 w-24 rounded-lg border material-latched" /> },
  { name: "material-knob", role: "A lit, physical thumb", sample: <div className="size-10 rounded-full material-knob" /> },
  { name: "material-tint", role: "A jelly tint from currentColor", sample: <Badge variant="info">In review</Badge> },
  { name: "material-highlight", role: "The highlighted row in a menu", sample: <div className="flex h-10 w-24 items-center rounded-lg bg-popover p-1"><div className="h-full w-full rounded-md material-highlight" /></div> },
  { name: "material-lift", role: "Something you can pick up (hover me)", sample: <Card size="sm" interactive className="h-10 w-24 py-0" /> },
]

function MaterialsPage() {
  return (
    <DocsPage
      eyebrow="Foundations"
      title="Materials"
      description="Components never hard-code fills or shadows. They use material utilities, and the brand decides whether those render flat, soft or tactile. Tactile assumes one light source, from above."
    >
      <Section title="Library">
        <div className="grid gap-3 sm:grid-cols-2">
          {MATERIALS.map((m) => (
            <Card key={m.name} size="sm">
              <CardContent className="flex items-center gap-4">
                <div className="grid h-14 w-28 shrink-0 place-items-center rounded-lg bg-background">{m.sample}</div>
                <div className="min-w-0">
                  <code className="font-mono text-xs">{m.name}</code>
                  <p className="text-muted-foreground">{m.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Elevation"
        description="Shadows for things that float above the page. Tactile brands use longer, softer shadows; flat brands use almost none."
      >
        <div className="grid grid-cols-2 gap-6 rounded-xl border bg-surface-sunken p-6 sm:grid-cols-4">
          {(["shadow-xs", "shadow-sm", "shadow-md", "shadow-lg"] as const).map((cls) => (
            <div key={cls} className="grid gap-2 text-center">
              <div className={`h-16 rounded-xl bg-card ring-1 ring-border ${cls}`} />
              <code className="font-mono text-xs text-muted-foreground">{cls}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Glass legibility"
        description="Glass overlays blur and frost whatever is behind them. This backdrop is deliberately busy; menu text should stay readable over it in both themes."
      >
        <GlassTest />
      </Section>

      <Section
        title="States"
        description="Hover is lighting, not colour: controls lift with a brighter highlight, deeper shadow and stronger glow. Pressing sinks them 1px. Pin a state with data-preview for specimens like this one."
      >
        <Example className="grid grid-cols-[5rem_repeat(3,1fr)] items-center gap-3">
          <span />
          {["Rest", "Hover", "Pressed"].map((l) => (
            <span key={l} className="eyebrow text-muted-foreground">
              {l}
            </span>
          ))}
          {(["default", "secondary", "outline", "destructive"] as const).map((variant) => (
            <Fragment key={variant}>
              <span className="text-xs text-muted-foreground capitalize">{variant === "default" ? "Primary" : variant}</span>
              {[undefined, "hover", "active"].map((state) => (
                <Button key={state ?? "rest"} variant={variant} data-preview={state} tabIndex={-1}>
                  Save
                </Button>
              ))}
            </Fragment>
          ))}
        </Example>
      </Section>
    </DocsPage>
  )
}

function GlassTest() {
  return (
    <div className="relative h-72 overflow-hidden rounded-xl border bg-background">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute -top-10 left-8 size-48 rounded-full bg-chart-1 opacity-70 blur-xl" />
        <div className="absolute top-20 right-10 size-56 rounded-full bg-chart-3 opacity-60 blur-xl" />
        <div className="absolute bottom-0 left-1/3 size-40 rounded-full bg-chart-5 opacity-60 blur-xl" />
        <div className="absolute inset-0 grid content-start gap-1 p-4 font-mono text-xs leading-5 text-foreground/70">
          {Array.from({ length: 14 }, (_, i) => (
            <div key={i} className="truncate">
              ENG-{1024 + i} · deploy pipeline · 4f2a91c · {i % 3 ? "passing" : "queued"} · region eu-west-{(i % 3) + 1} · retry {i}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-8 left-1/2 w-56 -translate-x-1/2 rounded-xl bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-border material-overlay">
        <div className="px-1.5 py-1 eyebrow text-muted-foreground">Issue</div>
        {["Assign to me", "Change status", "Copy link"].map((item, i) => (
          <div key={item} className={`rounded-md px-1.5 py-1 ${i === 1 ? "material-highlight" : ""}`}>
            {item}
          </div>
        ))}
        <div className="-mx-1 my-1 h-px bg-border" />
        <div className="rounded-md px-1.5 py-1 text-destructive-subtle-foreground">Delete</div>
      </div>
    </div>
  )
}
