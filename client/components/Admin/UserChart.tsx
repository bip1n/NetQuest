"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "January", user: 186 },
  { month: "February", user: 305 },
  { month: "March", user: 237 },
  { month: "April", user: 73 },
  { month: "May", user: 209 },
  { month: "June", user: 214 },
]
const chartConfig = {
  user: {
    label: "User",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig
export function Component() {
  return (
    <div>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={true}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent  />}
            />
            <Bar dataKey="user" fill="var(--color-user)" radius={8} />
          </BarChart>
        </ChartContainer>
    </div>
  )
}
