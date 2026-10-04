import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartFrame,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const DATA = [
  { cycle: "C19", web: 3.8, mobile: 5.1 },
  { cycle: "C20", web: 3.4, mobile: 4.6 },
  { cycle: "C21", web: 3.9, mobile: 4.2 },
  { cycle: "C22", web: 3.1, mobile: 4.4 },
  { cycle: "C23", web: 2.8, mobile: 3.7 },
  { cycle: "C24", web: 2.6, mobile: 3.3 },
]

const config = {
  web: { label: "Web", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

// 2px lines; markers >= 8px with a 2px surface-coloured ring.
const dot = { r: 4, strokeWidth: 2, stroke: "var(--card)" }

export default function ChartLine() {
  return (
    <ChartFrame
      title="Cycle time (days)"
      description="Median, by team"
      data={DATA}
      config={config}
      xKey="cycle"
      xLabel="Cycle"
      formatValue={(v) => (v as number).toFixed(1)}
    >
      <ChartContainer config={config} className="aspect-auto h-64 w-full">
        <LineChart data={DATA} margin={{ top: 8, right: 12 }} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="cycle" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} width={28} domain={[0, "auto"]} />
          <ChartTooltip cursor={{ stroke: "var(--border-strong)", strokeWidth: 1 }} content={<ChartTooltipContent />} />
          <ChartLegend itemSorter={null} content={<ChartLegendContent />} />
          <Line dataKey="web" type="monotone" stroke="var(--color-web)" strokeWidth={2} dot={{ ...dot, fill: "var(--color-web)" }} activeDot={{ ...dot, r: 5, fill: "var(--color-web)" }} />
          <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={{ ...dot, fill: "var(--color-mobile)" }} activeDot={{ ...dot, r: 5, fill: "var(--color-mobile)" }} />
        </LineChart>
      </ChartContainer>
    </ChartFrame>
  )
}
