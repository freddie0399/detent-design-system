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
  { month: "May", bugs: 18, features: 24, chores: 9 },
  { month: "Jun", bugs: 22, features: 19, chores: 12 },
  { month: "Jul", bugs: 15, features: 28, chores: 8 },
  { month: "Aug", bugs: 11, features: 31, chores: 14 },
  { month: "Sep", bugs: 9, features: 26, chores: 10 },
]

// Three series: slots 1-3 in order. Slot 3 is below 3:1 on white in light
// mode, which ChartFrame's legend + table view relieve.
const config = {
  bugs: { label: "Bugs", color: "var(--chart-1)" },
  features: { label: "Features", color: "var(--chart-2)" },
  chores: { label: "Chores", color: "var(--chart-3)" },
} satisfies ChartConfig

// Segments are separated by a 2px gap in the surface colour, not a border.
const gap = { stroke: "var(--card)", strokeWidth: 2 }

export default function ChartStacked() {
  return (
    <ChartFrame title="Closed issues by type" description="Last 5 months" data={DATA} config={config} xKey="month" xLabel="Month">
      <ChartContainer config={config} className="aspect-auto h-64 w-full">
        <BarChart data={DATA} barSize={24} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} width={28} />
          <ChartTooltip cursor={{ fill: "var(--muted)" }} content={<ChartTooltipContent />} />
          <ChartLegend itemSorter={null} content={<ChartLegendContent />} />
          <Bar dataKey="bugs" stackId="a" fill="var(--color-bugs)" {...gap} />
          <Bar dataKey="features" stackId="a" fill="var(--color-features)" {...gap} />
          {/* Only the top of the stack gets the rounded data end. */}
          <Bar dataKey="chores" stackId="a" fill="var(--color-chores)" radius={[4, 4, 0, 0]} {...gap} />
        </BarChart>
      </ChartContainer>
    </ChartFrame>
  )
}
