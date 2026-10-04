import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
  { day: "Mon", desktop: 186, mobile: 80 },
  { day: "Tue", desktop: 305, mobile: 200 },
  { day: "Wed", desktop: 237, mobile: 120 },
  { day: "Thu", desktop: 273, mobile: 190 },
  { day: "Fri", desktop: 209, mobile: 130 },
  { day: "Sat", desktop: 114, mobile: 140 },
  { day: "Sun", desktop: 98, mobile: 151 },
]

const config = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

export default function ChartArea() {
  return (
    <ChartFrame title="Active users" description="This week, by platform" data={DATA} config={config} xKey="day" xLabel="Day">
      <ChartContainer config={config} className="aspect-auto h-64 w-full">
        <AreaChart data={DATA} margin={{ top: 8, right: 12 }} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} width={32} />
          <ChartTooltip cursor={{ stroke: "var(--border-strong)", strokeWidth: 1 }} content={<ChartTooltipContent />} />
          <ChartLegend itemSorter={null} content={<ChartLegendContent />} />
          {/* A wash, never a saturated block: ~10% fill under a 2px line. */}
          <Area dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} fill="var(--color-desktop)" fillOpacity={0.1} />
          <Area dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} fill="var(--color-mobile)" fillOpacity={0.1} />
        </AreaChart>
      </ChartContainer>
    </ChartFrame>
  )
}
