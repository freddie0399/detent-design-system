import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
  { week: "W1", opened: 32, closed: 24 },
  { week: "W2", opened: 28, closed: 31 },
  { week: "W3", opened: 41, closed: 35 },
  { week: "W4", opened: 26, closed: 38 },
  { week: "W5", opened: 30, closed: 29 },
  { week: "W6", opened: 22, closed: 34 },
]

// Series take categorical slots in order — never by rank or value.
const config = {
  opened: { label: "Opened", color: "var(--chart-1)" },
  closed: { label: "Closed", color: "var(--chart-2)" },
} satisfies ChartConfig

export default function ChartDemo() {
  return (
    <ChartFrame title="Issues per week" description="Last 6 weeks" data={DATA} config={config} xKey="week" xLabel="Week">
      <ChartContainer config={config} className="aspect-auto h-64 w-full">
        <BarChart data={DATA} barSize={24} barGap={2} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} width={28} />
          <ChartTooltip cursor={{ fill: "var(--muted)" }} content={<ChartTooltipContent />} />
          <ChartLegend itemSorter={null} content={<ChartLegendContent />} />
          <Bar dataKey="opened" fill="var(--color-opened)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="closed" fill="var(--color-closed)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </ChartFrame>
  )
}
