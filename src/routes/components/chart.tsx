import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines, type ApiPart } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/chart")({ component: ChartPage })

const USAGE = `import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

const config = {
  opened: { label: "Opened", color: "var(--chart-1)" },
  closed: { label: "Closed", color: "var(--chart-2)" },
} satisfies ChartConfig

<ChartFrame title="Issues per week" data={data} config={config} xKey="week">
  <ChartContainer config={config} className="h-64 w-full">
    <BarChart data={data} barSize={24} barGap={2} accessibilityLayer>
      <CartesianGrid vertical={false} />
      <XAxis dataKey="week" tickLine={false} axisLine={false} />
      <ChartTooltip content={<ChartTooltipContent />} />
      <ChartLegend itemSorter={null} content={<ChartLegendContent />} />
      <Bar dataKey="opened" fill="var(--color-opened)" radius={[4, 4, 0, 0]} />
      <Bar dataKey="closed" fill="var(--color-closed)" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ChartContainer>
</ChartFrame>`

const API: ApiPart[] = [
  {
    name: "ChartFrame",
    description: "A titled chart with a Chart / Table toggle; the table is generated from the same data and config.",
    props: [
      { name: "title", type: "ReactNode", description: "Names what's plotted. With one series, the title replaces a legend." },
      { name: "description", type: "ReactNode", description: "Period or scope, e.g. \"Last 6 weeks\"." },
      { name: "data", type: "Record<string, unknown>[]", description: "The same rows the chart uses." },
      { name: "config", type: "ChartConfig", description: "Series labels and colours; also sets the table's column order." },
      { name: "xKey", type: "string", description: "The category key; the table's first column." },
      { name: "xLabel", type: "string", description: "Header for the category column." },
      { name: "formatValue", type: "(value, key) => ReactNode", default: "toLocaleString", description: "Formats table cells." },
    ],
  },
  {
    name: "ChartContainer",
    description: "Wraps a Recharts chart, applies the brand chrome, and exposes each series colour as --color-KEY.",
    props: [
      { name: "config", type: "ChartConfig", description: "Series labels, icons and colours." },
      { name: "className", type: "string", description: "Give it a height (h-64) or aspect so the chart can measure itself on first render." },
    ],
  },
  {
    name: "ChartConfig",
    description: "Record<key, { label?, icon?, color? | theme? }>. Use var(--chart-N) colours in slot order, or a theme object with light and dark values.",
    props: [],
  },
  {
    name: "ChartTooltipContent",
    description: "The glass tooltip: line swatches, value first.",
    props: [
      { name: "indicator", type: '"line" | "dot" | "dashed"', default: '"line"', description: "Series key style. Line keys follow the data-viz spec." },
      { name: "hideLabel", type: "boolean", default: "false", description: "Hide the category label." },
      { name: "hideIndicator", type: "boolean", default: "false", description: "Hide the series keys." },
      { name: "labelKey / nameKey", type: "string", description: "Config or data keys to use for the label and series names." },
    ],
  },
  {
    name: "ChartLegendContent",
    description: "Legend built from the config. Pass itemSorter={null} to ChartLegend so it keeps series order.",
    props: [
      { name: "nameKey", type: "string", description: "Data key to use for names." },
      { name: "hideIcon", type: "boolean", default: "false", description: "Hide config icons." },
    ],
  },
]

function ChartPage() {
  return (
    <ComponentDoc
      slug="chart"
      title="Chart"
      description="Recharts with brand chrome: glass tooltips keyed with line swatches, hairline grids and a fixed, colour-blind-safe categorical palette. ChartFrame adds a generated table view to every chart."
      usage={USAGE}
      api={API}
    >
      <Preview name="chart/demo" align="stretch" />
      <Section
        title="Stacked bar"
        description="Segments are separated by a 2px gap in the surface colour; only the top of the stack has a rounded end."
      >
        <Preview name="chart/stacked" align="stretch" />
      </Section>
      <Section title="Line" description="2px lines; markers at least 8px with a surface-coloured ring; a crosshair finds the x value.">
        <Preview name="chart/line" align="stretch" />
      </Section>
      <Section title="Area" description="A 10% wash under a 2px line, never a saturated block.">
        <Preview name="chart/area" align="stretch" />
      </Section>
      <Section
        title="Stat tiles"
        description="When the answer is a number, show the number. A signed delta with an arrow (good or bad by direction), and a 12-point sparkline with the current period in the accent."
      >
        <Preview name="chart/stats" align="stretch" />
      </Section>
      <Guidelines
        dos={[
          "Assign series to chart-1, chart-2… in order. The order is the colour-blind safety mechanism; never cycle or pick by value.",
          "Wrap charts in ChartFrame so a legend and table view are always available.",
          "Keep one y-axis. Two measures with different scales get two charts.",
        ]}
        donts={[
          "Don't colour text with a series colour; labels use text tokens with a swatch beside them.",
          "Don't use status colours (success, warning, destructive) for ordinary series — they mean something.",
          "Don't add a ninth series; fold the rest into \"Other\" or use small multiples. Pie and radar charts aren't in the system yet.",
        ]}
      />
      <Accessibility
        items={[
          "Light-mode slots 3–5 sit below 3:1 on white, so charts using them must keep the legend and table view visible.",
          "accessibilityLayer makes the chart keyboard-focusable, with arrow keys moving the tooltip between points.",
          "ChartFrame's table view is a real table, so screen readers can read every value.",
          "Stat-tile deltas carry direction with an arrow and a sign, not colour alone; sparklines are decorative (aria-hidden).",
        ]}
      />
    </ComponentDoc>
  )
}
