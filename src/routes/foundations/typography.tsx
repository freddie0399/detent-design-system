import { createFileRoute } from "@tanstack/react-router"

import { FONTS } from "../../../tokens/tokens"
import { DocsPage, Section } from "@/docs/page"
import { useBrandContext } from "@/docs/providers"

export const Route = createFileRoute("/foundations/typography")({ component: TypographyPage })

const TYPE_SCALE = [
  ["text-3xl", "32 / 40", "Display"],
  ["text-2xl", "24 / 32", "Page title"],
  ["text-xl", "20 / 28", "Section heading"],
  ["text-lg", "16 / 24", "Emphasis"],
  ["text-base", "14 / 24", "Long-form body"],
  ["text-sm", "13 / 20", "UI default — controls, tables, menus"],
  ["text-xs", "12 / 16", "Labels, metadata"],
  ["text-2xs", "11 / 16", "Dense annotations"],
] as const

const fontName = (id: keyof typeof FONTS) => FONTS[id].google.replace(/_/g, " ")

function TypographyPage() {
  const { brand } = useBrandContext()
  return (
    <DocsPage
      eyebrow="Foundations"
      title="Typography"
      description={`${fontName(brand.type.ui)} for UI, ${fontName(brand.type.display)} for headings and ${fontName(brand.type.mono)} for code and IDs. A compact scale with a 13px UI default.`}
    >
      <Section title="Scale">
        <div className="divide-y rounded-xl border bg-card">
          {TYPE_SCALE.map(([cls, metrics, use]) => (
            <div key={cls} className="grid grid-cols-[6rem_1fr] items-baseline gap-4 px-4 py-3 sm:grid-cols-[8rem_5rem_1fr]">
              <code className="font-mono text-xs text-muted-foreground">{cls}</code>
              <span className="hidden font-mono text-xs text-subtle-foreground sm:block">{metrics}</span>
              <span className={`${cls} truncate font-medium`}>{use}</span>
            </div>
          ))}
          <div className="grid grid-cols-[6rem_1fr] items-baseline gap-4 px-4 py-3 sm:grid-cols-[8rem_5rem_1fr]">
            <code className="font-mono text-xs text-muted-foreground">font-mono</code>
            <span className="hidden font-mono text-xs text-subtle-foreground sm:block">13 / 20</span>
            <span className="truncate font-mono">ENG-1024 · 0O1lI · const x = 42</span>
          </div>
        </div>
      </Section>
      <Section title="Weights" description="Three weights cover the whole UI. Hierarchy comes from size and colour first, weight second.">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["400", "Regular", "Body, table cells, descriptions"],
            ["500", "Medium", "Controls, labels, emphasis"],
            ["600", "Semibold", "Headings (sans display faces)"],
          ].map(([w, name, use]) => (
            <div key={w} className="rounded-xl border bg-card p-4">
              <div className="text-2xl" style={{ fontWeight: Number(w) }}>Ag</div>
              <div className="mt-2 font-medium">{name} · {w}</div>
              <div className="text-muted-foreground">{use}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Headings" description="Headings use the display face with the brand's display weight and tracking.">
        <div className="grid gap-3 rounded-xl border bg-card p-4">
          <h1 className="text-3xl">Quarterly planning</h1>
          <h2 className="text-2xl">Roadmap for the platform team</h2>
          <h3 className="text-xl">Open questions</h3>
          <p className="max-w-prose text-base text-muted-foreground">
            Body copy sits at text-base for long-form reading and text-sm in dense UI. Keep lines under roughly 70 characters.
          </p>
        </div>
      </Section>

      <Section title="Guidance">
        <ul className="grid max-w-prose list-disc gap-1.5 pl-5 text-muted-foreground">
          <li><span className="text-foreground">UI defaults to text-sm (13px).</span> Controls, menus and tables all share it so rows align.</li>
          <li><span className="text-foreground">Use the mono face for anything machine-generated:</span> IDs, hashes, keys and code.</li>
          <li><span className="text-foreground">Use tabular-nums for numbers that change or align in columns.</span></li>
          <li><span className="text-foreground">Secondary text is a colour, not a size:</span> use muted-foreground before reaching for text-xs.</li>
        </ul>
      </Section>

      <Section title="Labels" description="Small labels (table headers, menu labels, section eyebrows) use the eyebrow utility, so their voice follows the brand.">
        <div className="flex flex-wrap items-center gap-6 rounded-xl border bg-card px-4 py-3">
          <span className="eyebrow text-muted-foreground">Issues</span>
          <span className="eyebrow text-muted-foreground">Assignee</span>
          <span className="eyebrow text-muted-foreground">Updated</span>
        </div>
      </Section>
    </DocsPage>
  )
}
