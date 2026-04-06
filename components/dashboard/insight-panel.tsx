"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { transactions as allTransactions } from "@/data/mockData"

interface InsightsPanelProps {
  userId: string
  className?: string
}

function getInsights(userId: string) {
  const txs = allTransactions.filter((t) => t.userId === userId)
  if (txs.length === 0) return null

  // --- Top category ---
  const categoryTotals: Record<string, number> = {}
  let totalSpend = 0
  for (const t of txs) {
    categoryTotals[t.category] = (categoryTotals[t.category] ?? 0) + t.amount
    totalSpend += t.amount
  }
  const topCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0]
  const topCategoryPct =
    totalSpend > 0 ? Math.round((topCategory[1] / totalSpend) * 100) : 0

  // --- Monthly comparison (current vs previous calendar month) ---
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear

  let thisMonthTotal = 0
  let prevMonthTotal = 0
  for (const t of txs) {
    const d = new Date(t.date)
    if (d.getMonth() === currentMonth && d.getFullYear() === currentYear)
      thisMonthTotal += t.amount
    if (d.getMonth() === prevMonth && d.getFullYear() === prevYear)
      prevMonthTotal += t.amount
  }
  const monthDeltaPct =
    prevMonthTotal > 0
      ? Math.round(((thisMonthTotal - prevMonthTotal) / prevMonthTotal) * 100)
      : null

  const prevMonthLabel = new Date(prevYear, prevMonth, 1).toLocaleString(
    "default",
    {
      month: "long",
      year: "numeric",
    }
  )

  // --- Savings rate ---
  const months = new Set(
    txs.map(
      (t) => `${new Date(t.date).getFullYear()}-${new Date(t.date).getMonth()}`
    )
  ).size
  const avgMonthlySpend = months > 0 ? totalSpend / months : totalSpend
  const estimatedIncome = avgMonthlySpend * 2
  const savingsRate =
    estimatedIncome > 0
      ? Math.round(
          ((estimatedIncome - avgMonthlySpend) / estimatedIncome) * 100
        )
      : 0

  return {
    topCategory: topCategory[0],
    topCategoryPct,
    monthDeltaPct,
    prevMonthLabel,
    savingsRate,
  }
}

export default function InsightsPanel({
  userId,
  className,
}: InsightsPanelProps) {
  const insights = useMemo(() => getInsights(userId), [userId])

  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 overflow-hidden rounded-2xl p-5",
        "border border-neutral-200 bg-white shadow-sm",
        "dark:nav dark:border-transparent dark:bg-transparent dark:shadow-none",
        "nav font-manrope",
        className
      )}
    >
      {/* Section label */}
      <p className="mb-2 font-semibold uppercase">Quick Insights</p>

      {!insights ? (
        <p className="text-sm text-neutral-400 italic dark:text-white/30">
          No data available.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Top Category */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
              Top Category
            </span>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  "bg-neutral-800/90 dark:bg-white/90",
                  "shadow-[0_0_6px_2px_rgba(0,1,1,0.25)] dark:shadow-[0_0_6px_2px_rgba(181,255,77,0.4)]"
                )}
              />
              <span className="text-2xl leading-none font-semibold tracking-tight">
                {insights.topCategory}
              </span>
            </div>
            <span className="mt-0.5 text-xs text-muted-foreground">
              {insights.topCategoryPct}% of total spend
            </span>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-neutral-100 dark:bg-white/6" />

          {/* Monthly Comparison */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
              Monthly Comparison
            </span>
            {insights.monthDeltaPct !== null ? (
              <>
                <span className="text-xl leading-none font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                  {Math.abs(insights.monthDeltaPct)}%
                  <span className="text-sm font-semibold">
                    {insights.monthDeltaPct <= 0 ? "lower" : "higher"}
                  </span>
                </span>
                <span className="mt-0.5 text-xs text-muted-foreground">
                  vs {insights.prevMonthLabel}
                </span>
              </>
            ) : (
              <span className="text-sm text-muted-foreground italic">
                Not enough data
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-neutral-100 dark:bg-white/6" />

          {/* Savings Rate */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
              Savings Rate
            </span>
            <span className="text-2xl leading-none font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              {insights.savingsRate}%
            </span>
            <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <span
                className={cn(
                  "text-[10px] font-bold",
                  insights.savingsRate >= 20
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-500 dark:text-rose-400"
                )}
              >
                {insights.savingsRate >= 20 ? "↑" : "↓"}
              </span>
              {insights.savingsRate >= 20
                ? "improving trend"
                : "needs attention"}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-neutral-100 dark:bg-white/6" />
        </div>
      )}
    </div>
  )
}
