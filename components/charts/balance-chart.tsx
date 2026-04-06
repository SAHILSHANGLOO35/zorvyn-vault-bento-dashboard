"use client"

import { Bar, BarChart, Cell, XAxis, ReferenceLine } from "recharts"
import React from "react"
import { AnimatePresence } from "motion/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { useMotionValueEvent, useSpring } from "framer-motion"
import { Transaction } from "@/data/mockData"
import { formatCurrency, formatDate } from "@/lib/format"

const CHART_MARGIN = 3

// --------------------
// Aggregation (inline)
// --------------------

type MonthlyData = {
  date: string
  income: number
  expense: number
}

function aggregateByMonth(transactions: Transaction[]): MonthlyData[] {
  const map: Record<string, MonthlyData> = {}

  for (const t of transactions) {
    const month = t.date.slice(0, 7)

    if (!map[month]) {
      map[month] = { date: month + "-01", income: 0, expense: 0 }
    }

    if (t.type === "income") {
      map[month].income += t.amount
    } else {
      map[month].expense += t.amount
    }
  }

  return Object.values(map).sort((a, b) => a.date.localeCompare(b.date))
}

// --------------------
// BalanceChart
// --------------------

export const BalanceChart = ({
  data,
  className,
}: {
  data: Transaction[]
  className?: string
}) => {
  const chartData = React.useMemo(() => aggregateByMonth(data), [data])

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--secondary-foreground)",
    },
  } satisfies ChartConfig

  const [activeIndex, setActiveIndex] = React.useState<number>(
    chartData.length - 1 // default to last (most recent) month
  )

  // Derive income and expense of the active bar separately
  const activeItem = chartData[activeIndex] ?? { income: 0, expense: 0 }

  // --- Income spring ---
  const incomeSpring = useSpring(activeItem.income, {
    stiffness: 100,
    damping: 20,
  })
  const [springIncome, setSpringIncome] = React.useState(activeItem.income)
  useMotionValueEvent(incomeSpring, "change", (v) =>
    setSpringIncome(Number(v.toFixed(0)))
  )
  React.useEffect(() => {
    incomeSpring.set(activeItem.income)
  }, [activeItem.income, incomeSpring])

  // --- Expense spring ---
  const expenseSpring = useSpring(activeItem.expense, {
    stiffness: 100,
    damping: 20,
  })
  const [springExpense, setSpringExpense] = React.useState(activeItem.expense)
  useMotionValueEvent(expenseSpring, "change", (v) =>
    setSpringExpense(Number(v.toFixed(0)))
  )
  React.useEffect(() => {
    expenseSpring.set(activeItem.expense)
  }, [activeItem.expense, expenseSpring])

  return (
    <Card
      className={cn("nav flex flex-col overflow-hidden rounded-md", className)}
    >
      <CardHeader className="shrink-0">
        <CardTitle className="font-manrope text-lg font-semibold">
          TRANSACTIONS OVERVIEW
        </CardTitle>
        <CardDescription className="mb-2 text-xs text-muted-foreground">
          Track your cash flow with a simple comparison
        </CardDescription>

        {/* Show both income and expense for the active month */}
        <div className="flex items-center gap-4">
          <CardTitle className="flex items-center gap-1">
            <span className={cn("font-sans", "text-2xl tracking-tighter")}>
              <span className="text-md mr-1">&#8377;</span>
              {springIncome.toLocaleString("en-IN")}
            </span>
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              income
            </span>
          </CardTitle>
          <CardTitle className="flex items-center gap-1">
            <span
              className={cn(
                "font-sans",
                "text-2xl tracking-tighter text-red-500"
              )}
            >
              <span className="text-md mr-1">&#8377;</span>
              {springExpense.toLocaleString("en-IN")}
            </span>
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              expense
            </span>
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="min-h-0 flex-1 pb-4">
        <AnimatePresence mode="wait">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              onMouseLeave={() => setActiveIndex(chartData.length - 1)}
              margin={{
                left: CHART_MARGIN,
                right: CHART_MARGIN,
                top: 8,
                bottom: 0,
              }}
            >
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => formatDate(value, "month")}
              />

              <Bar dataKey="income" fill="var(--color-desktop)" radius={4}>
                {chartData.map((_, index) => (
                  <Cell
                    className="duration-200"
                    opacity={index === activeIndex ? 1 : 0.2}
                    key={index}
                    onMouseEnter={() => setActiveIndex(index)}
                  />
                ))}
              </Bar>

              <Bar dataKey="expense" fill="#ef4444" radius={4}>
                {chartData.map((_, index) => (
                  <Cell
                    className="duration-200"
                    opacity={index === activeIndex ? 1 : 0.2}
                    key={index}
                    onMouseEnter={() => setActiveIndex(index)}
                  />
                ))}
              </Bar>

              {/* Income reference line */}
              <ReferenceLine
                opacity={0.5}
                y={springIncome}
                stroke="var(--secondary-foreground)"
                strokeWidth={1}
                strokeDasharray="3 3"
                label={
                  <CustomReferenceLabel
                    value={formatCurrency(activeItem.income)}
                    color="var(--secondary-foreground)"
                    textColor="var(--primary-foreground)"
                  />
                }
              />

              {/* Expense reference line */}
              <ReferenceLine
                opacity={0.5}
                y={springExpense}
                stroke="#ef4444"
                strokeWidth={1}
                strokeDasharray="3 3"
                label={
                  <CustomReferenceLabel
                    value={formatCurrency(activeItem.expense)}
                    color="#ef4444"
                    textColor="#fff"
                  />
                }
              />
            </BarChart>
          </ChartContainer>
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

// --------------------
// CustomReferenceLabel
// --------------------

interface CustomReferenceLabelProps {
  viewBox?: { x?: number; y?: number }
  value: string
  color: string
  textColor: string
}

const CustomReferenceLabel: React.FC<CustomReferenceLabelProps> = (props) => {
  const { viewBox, value, color, textColor } = props
  const x = viewBox?.x ?? 0
  const y = viewBox?.y ?? 0

  const width = React.useMemo(() => {
    const avgCharWidth = 8
    const padding = 12
    return value.length * avgCharWidth + padding
  }, [value])

  return (
    <>
      <rect
        x={x - CHART_MARGIN}
        y={y - 9}
        width={width}
        height={18}
        fill={color}
        rx={4}
      />
      <text
        fontWeight={600}
        x={x - CHART_MARGIN + 6}
        y={y + 4}
        fill={textColor}
        fontSize={11}
      >
        {value}
      </text>
    </>
  )
}
