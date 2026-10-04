import { ArrowDownRightIcon, ArrowUpRightIcon } from "lucide-react"
import { Line, LineChart } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"

type Stat = {
  label: string
  value: string
  delta: number
  /** Whether a rising number is good news (cycle time: no). */
  upIsGood: boolean
  trend: number[]
}

const STATS: Stat[] = [
  { label: "Issues closed", value: "1,284", delta: 12.4, upIsGood: true, trend: [62, 70, 66, 74, 81, 77, 88, 85, 92, 96, 101, 108] },
  { label: "Median cycle time", value: "2.6 days", delta: -8.1, upIsGood: false, trend: [3.9, 3.8, 3.6, 3.7, 3.4, 3.3, 3.1, 3.2, 2.9, 2.8, 2.7, 2.6] },
  { label: "Open bugs", value: "37", delta: 5.7, upIsGood: false, trend: [30, 31, 29, 33, 32, 34, 33, 35, 34, 36, 35, 37] },
]

const config = { value: { label: "Value", color: "var(--chart-1)" } } satisfies ChartConfig

function StatTile({ stat }: { stat: Stat }) {
  const rising = stat.delta > 0
  const good = rising === stat.upIsGood
  const Arrow = rising ? ArrowUpRightIcon : ArrowDownRightIcon
  const data = stat.trend.map((value, i) => ({ i, value }))
  return (
    <Card size="sm">
      <CardContent className="grid gap-2">
        <div className="text-muted-foreground">{stat.label}</div>
        <div className="flex items-end justify-between gap-3">
          {/* Large standalone values use proportional figures. */}
          <div className="text-2xl font-semibold">{stat.value}</div>
          <ChartContainer config={config} className="aspect-auto h-8 w-24" aria-hidden>
            <LineChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
              {/* Trend in the de-emphasis colour; the current period in the accent. */}
              <Line
                dataKey="value"
                type="monotone"
                stroke="var(--subtle-foreground)"
                strokeWidth={2}
                isAnimationActive={false}
                dot={(props: { cx?: number; cy?: number; index?: number }) =>
                  props.index === data.length - 1 ? (
                    <circle key="last" cx={props.cx} cy={props.cy} r={4} fill="var(--color-value)" stroke="var(--card)" strokeWidth={2} />
                  ) : (
                    <g key={props.index} />
                  )
                }
              />
            </LineChart>
          </ChartContainer>
        </div>
        {/* Direction is carried by the arrow and the sign, not colour alone. */}
        <div className={`flex items-center gap-1 text-xs ${good ? "text-success-subtle-foreground" : "text-destructive-subtle-foreground"}`}>
          <Arrow className="size-3.5" aria-hidden />
          <span className="font-medium tabular-nums">
            {rising ? "+" : "−"}
            {Math.abs(stat.delta)}%
          </span>
          <span className="text-muted-foreground">vs last month</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ChartStats() {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-3">
      {STATS.map((stat) => (
        <StatTile key={stat.label} stat={stat} />
      ))}
    </div>
  )
}
