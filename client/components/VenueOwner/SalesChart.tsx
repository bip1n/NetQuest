"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const chartData = [
 
  { date: "2024-06-01", Sales: 178},
  { date: "2024-06-02", Sales: 470410 },
  { date: "2024-06-03", Sales: 103160 },
  { date: "2024-06-04", Sales: 439380 },
  { date: "2024-06-05", Sales: 88140 },
  { date: "2024-06-06", Sales: 294250 },
  { date: "2024-06-07", Sales: 323370 },
  { date: "2024-06-08", Sales: 385320 },
  { date: "2024-06-09", Sales: 438480 },
  { date: "2024-06-10", Sales: 155200 },
  { date: "2024-06-11", Sales: 92150 },
  { date: "2024-06-12", Sales: 492420 },
  { date: "2024-06-13", Sales: 81130 },
  { date: "2024-06-14", Sales: 426380 },
  { date: "2024-06-15", Sales: 307350 },
  { date: "2024-06-16", Sales: 371310 },
  { date: "2024-06-17", Sales: 475520 },
  { date: "2024-06-18", Sales: 107170 },
  { date: "2024-06-19", Sales: 341290 },
  { date: "2024-06-20", Sales: 408450 },
  { date: "2024-06-21", Sales: 169210 },
  { date: "2024-06-22", Sales: 317270 },
  { date: "2024-06-23", Sales: 480530 },
  { date: "2024-06-24", Sales: 132180 },
  { date: "2024-06-25", Sales: 141190 },
  { date: "2024-06-26", Sales: 434380 },
  { date: "2024-06-27", Sales: 448490 },
  { date: "2024-06-28", Sales: 149200 },
  { date: "2024-06-29", Sales: 103160 },
  { date: "2024-07-18", Sales: 446400 },
  { date: "2024-07-19", Sales: 446400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  Sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function SalesChart() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    now.setDate(now.getDate() - daysToSubtract)
    return date >= now
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Sales Chart</CardTitle>
          <CardDescription>
            Showing total sales of the last 3 months.
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-Sales)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Sales)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="Sales"
              type="natural"
              fill="url(#fillSales)"
              stroke="var(--color-Sales)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
