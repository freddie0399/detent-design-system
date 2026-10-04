import { Link, createFileRoute } from "@tanstack/react-router"
import { ArrowRightIcon } from "lucide-react"

import { PRESETS, type Brand, type PresetId } from "../../tokens/tokens"
import { ISSUES, STATUS } from "@/docs/data"
import { NAV } from "@/docs/nav"
import { DocsPage, Section } from "@/docs/page"
import { useBrandContext, useTheme } from "@/docs/providers"
import { brandStyle } from "@/explorer/use-brand"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export const Route = createFileRoute("/")({ component: Overview })

const PRESET_NOTES: Record<PresetId, string> = {
  baseline: "The balanced hybrid we started from. Competent, familiar and a little anonymous.",
  instrument: "Precise and industrial: square, compact, mono-caps labels and a signal-orange accent on paper-warm neutrals.",
  graphite: "Dark-first and electric: acid lime on green-black, softer geometry, Geist throughout.",
  field: "Calm and editorial: warm stone, deep teal, roomy spacing and a serif voice for headings.",
  detent: "The chosen direction: Graphite's lime on green-black set in IBM Plex, with tactile controls and glass overlays.",
}

function Overview() {
  const components = NAV.find((s) => s.title === "Components")?.items ?? []
  return (
    <DocsPage
      eyebrow="Detent"
      title="Overview"
      description="A shadcn-based design system on Base UI primitives. Every token is generated from one brand description; components only speak in semantic tokens and materials."
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { title: "Foundations", body: "Colour, type and the tactile material system.", to: "/foundations/colour" as const },
          { title: "Components", body: `${components.length} components, each with its own page.`, to: "/components/button" as const },
          { title: "Blocks", body: "Components composed into real screens.", to: "/blocks/issue-tracker" as const },
        ].map((c) => (
          <Link key={c.title} to={c.to} className="block rounded-xl">
            <Card size="sm" interactive className="h-full">
              <div className="px-(--card-spacing)">
                <div className="flex items-center justify-between font-medium">
                  {c.title} <ArrowRightIcon className="size-4 text-muted-foreground" />
                </div>
                <p className="mt-1 text-muted-foreground">{c.body}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <DirectionsSection />
    </DocsPage>
  )
}

function DirectionPreview({ preset, dark }: { preset: Brand; dark: boolean }) {
  return (
    <div style={brandStyle(preset, dark)} className="flex flex-col gap-3 bg-background p-4 font-sans text-foreground">
      <div className="flex items-center justify-between gap-2">
        <h3 className="truncate text-xl">Q3 roadmap</h3>
        <Badge variant="success">On track</Badge>
      </div>
      <div className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex h-8 items-center border-b bg-surface-sunken px-3 eyebrow text-muted-foreground">Issues</div>
        {ISSUES.slice(0, 3).map((i) => {
          const st = STATUS[i.status]
          return (
            <div key={i.id} className="flex items-center gap-2 border-b px-3 py-2 last:border-b-0">
              <st.icon className={`size-3.5 shrink-0 ${st.className}`} />
              <span className="shrink-0 font-mono text-2xs text-muted-foreground">{i.id}</span>
              <span className="truncate text-xs">{i.title}</span>
            </div>
          )
        })}
      </div>
      <div className="flex gap-2">
        <Input placeholder="Search…" className="h-8 flex-1" />
        <Button>Create</Button>
      </div>
    </div>
  )
}

function DirectionsSection() {
  const { brand, setBrand } = useBrandContext()
  const { dark } = useTheme()
  return (
    <Section
      title="Directions"
      description="The same components rendered with different brand settings. Apply one to preview it across every page, then fine-tune it in the Direction panel."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {(Object.entries(PRESETS) as [PresetId, Brand][]).map(([id, preset]) => {
          const active = JSON.stringify(preset) === JSON.stringify(brand)
          return (
            <Card key={id} className={`gap-0 py-0 ${active ? "ring-2 ring-primary" : ""}`}>
              <DirectionPreview preset={preset} dark={dark} />
              <CardFooter className="flex-col items-start gap-3">
                <div>
                  <div className="font-medium">{preset.name}</div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{PRESET_NOTES[id]}</p>
                </div>
                <Button size="sm" variant={active ? "secondary" : "outline"} onClick={() => setBrand(preset)} disabled={active}>
                  {active ? "Applied" : "Apply"}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}
