"use client"

import { Transaction } from "@/data/mockData"
import { cn } from "@/lib/utils"
import { RadialBar, RadialBarChart, Cell } from "recharts"
import React from "react"

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#f97316",
  Bills: "#a855f7",
  Shopping: "#06b6d4",
  Entertainment: "#22c55e",
  Travel: "#f43f5e",
  Health: "#eab308",
}

type ActiveCategory = string | null

export function CategoryPieChart({
  data,
  className,
}: {
  data: Transaction[]
  className?: string
}) {
  const [activeCategory, setActiveCategory] =
    React.useState<ActiveCategory>(null)

  const availableMonths = React.useMemo(
    () =>
      Array.from(
        new Set(
          data
            .filter((t) => t.type === "expense")
            .map((t) => t.date.slice(0, 7))
        )
      ).sort((a, b) => (a < b ? 1 : -1)),
    [data]
  )

  const currentYearMonth = React.useMemo(() => {
    const today = new Date()
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`
  }, [])

  const defaultMonth = React.useMemo(
    () => availableMonths[0] ?? currentYearMonth,
    [availableMonths, currentYearMonth]
  )

  const [selectedMonth, setSelectedMonth] = React.useState<string>(defaultMonth)

  const formatMonth = (month: string) => {
    const [year, m] = month.split("-")
    return new Date(Number(year), Number(m) - 1).toLocaleString("en-IN", {
      month: "short",
      year: "numeric",
    })
  }

  const categoryTotals = React.useMemo(() => {
    const totals: Record<string, number> = {}
    data
      .filter(
        (t) => t.type === "expense" && t.date.slice(0, 7) <= selectedMonth
      )
      .forEach((t) => {
        totals[t.category] = (totals[t.category] ?? 0) + t.amount
      })
    return totals
  }, [data, selectedMonth])

  const chartData = React.useMemo(
    () =>
      Object.entries(categoryTotals)
        .map(([category, total]) => ({
          category,
          amount: total,
          fill: CATEGORY_COLORS[category] ?? "#94a3b8",
        }))
        .sort((a, b) => b.amount - a.amount),
    [categoryTotals]
  )

  const chartConfig = React.useMemo<ChartConfig>(() => {
    const config: ChartConfig = { amount: { label: "Amount (₹)" } }
    chartData.forEach(({ category, fill }) => {
      config[category] = { label: category, color: fill }
    })
    return config
  }, [chartData])

  const totalSpend = chartData.reduce((sum, d) => sum + d.amount, 0)

  return (
    <Card className={cn("nav flex flex-col rounded-md p-4", className)}>
      <CardHeader className="flex flex-col justify-center gap-2 pb-0">
        <CardTitle className="font-manrope text-lg font-semibold">
          SPENDING BREAKDOWN
        </CardTitle>

        <CardDescription className="text-left text-xs text-muted-foreground">
          Cumulative spend · Jan → {formatMonth(selectedMonth)}
          <span className="mt-0.5 block font-sans font-semibold text-foreground">
            Total: <span className="mr-0.5">₹</span>
            {totalSpend.toLocaleString("en-IN")}
          </span>
        </CardDescription>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="nav mt-2 max-w-fit cursor-pointer rounded-md px-3 py-1.5 text-sm outline-none"
        >
          {availableMonths.map((ym) => (
            <option key={ym} value={ym}>
              {formatMonth(ym)}
            </option>
          ))}
        </select>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto h-55 w-full">
          <RadialBarChart
            data={chartData}
            innerRadius={30}
            outerRadius={110}
            onMouseMove={(e) => {
              if (typeof e?.activeTooltipIndex === "number") {
                setActiveCategory(
                  chartData[e.activeTooltipIndex]?.category ?? null
                )
              } else {
                setActiveCategory(null)
              }
            }}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="category" />}
            />
            <RadialBar
              cornerRadius={10}
              dataKey="amount"
              background
              className="drop-shadow-lg"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  filter={
                    activeCategory === entry.category
                      ? `url(#radial-glow-${entry.category})`
                      : undefined
                  }
                  opacity={
                    activeCategory === null || activeCategory === entry.category
                      ? 1
                      : 0.3
                  }
                />
              ))}
            </RadialBar>
            <defs>
              {chartData.map((entry) => (
                <filter
                  key={`filter-${entry.category}`}
                  id={`radial-glow-${entry.category}`}
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              ))}
            </defs>
          </RadialBarChart>
        </ChartContainer>

        {/* Legend */}
        <div className="relative">
          {/* Left fade */}
          <div className="pointer-events-none absolute top-0 left-0 h-full w-6 bg-linear-to-r from-background to-transparent" />

          {/* Right fade */}
          <div className="pointer-events-none absolute top-0 right-0 h-full w-6 bg-linear-to-l from-background to-transparent" />

          <div className="mx-auto mt-3 flex w-full flex-nowrap gap-x-4 overflow-x-auto scroll-smooth pr-12">
            {chartData.map((entry) => (
              <div
                key={entry.category}
                className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: entry.fill }}
                />
                <span>{entry.category}</span>
                <span className="font-medium text-foreground">
                  ₹{entry.amount.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
