"use client"

import { DEFAULT_USER_ID, Transaction, transactions } from "@/data/mockData"
import { cn } from "@/lib/utils"
import { useState, useMemo } from "react"

/** Derive sorted unique "YYYY-MM" periods from the transactions of a user */
function getAvailableMonths(txns: Transaction[], userId: string): string[] {
  const months = new Set<string>()
  txns
    .filter((t) => t.userId === userId)
    .forEach((t) => months.add(t.date.slice(0, 7))) // "2026-01"
  return Array.from(months).sort() // ascending
}

/** "2026-01" → "Jan 2026" */
function formatMonth(ym: string): string {
  const [year, month] = ym.split("-")
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleString("en-IN", { month: "short", year: "numeric" })
}

/** Filter transactions by user + optional month key */
function filterTxns(
  txns: Transaction[],
  userId: string,
  monthKey: string | "ALL"
): Transaction[] {
  return txns.filter(
    (t) =>
      t.userId === userId && (monthKey === "ALL" || t.date.startsWith(monthKey))
  )
}

function downloadCSV(txns: Transaction[], period: string) {
  const header = "Date,Category,Type,Amount\n"
  const rows = txns
    .map((t) => `${t.date},${t.category},${t.type},${t.amount}`)
    .join("\n")
  const blob = new Blob([header + rows], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `transactions_${period.replace(/\s/g, "_")}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function downloadPDF(txns: Transaction[], period: string) {
  const rows = txns
    .map(
      (t) => `
      <tr>
        <td>${t.date}</td>
        <td>${t.category}</td>
        <td style="text-transform:capitalize">${t.type}</td>
        <td style="text-align:right">₹${t.amount.toLocaleString("en-IN")}</td>
      </tr>`
    )
    .join("")

  const html = `
    <html><head><title>Transactions – ${period}</title>
    <style>
      body { font-family: sans-serif; padding: 24px; color: #111; }
      h2 { margin-bottom: 4px; }
      p  { color: #666; font-size: 13px; margin-top: 0; }
      table { width: 100%; border-collapse: collapse; margin-top: 16px; }
      th, td { padding: 8px 10px; border-bottom: 1px solid #e5e5e5; font-size: 13px; text-align: left; }
      th { background: #f5f5f5; font-weight: 600; }
    </style></head>
    <body>
      <h2>Transaction Report</h2>
      <p>Period: ${period} &nbsp;|&nbsp; ${txns.length} transaction(s)</p>
      <table>
        <thead><tr><th>Date</th><th>Category</th><th>Type</th><th>Amount</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </body></html>`

  const win = window.open("", "_blank")
  if (!win) return
  win.document.write(html)
  win.document.close()
  win.print()
}

export const ExportData = ({
  className,
  userId,
}: {
  className?: string
  userId?: string
}) => {
  const availableMonths = useMemo(
    () => getAvailableMonths(transactions, userId || DEFAULT_USER_ID),
    [userId]
  )

  // default to most recent month
  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    availableMonths[availableMonths.length - 1] ?? "ALL"
  )
  const [format, setFormat] = useState<"csv" | "pdf">("csv")

  const filteredTxns = useMemo(
    () => filterTxns(transactions, userId || DEFAULT_USER_ID, selectedPeriod),
    [selectedPeriod, userId]
  )

  const periodLabel =
    selectedPeriod === "ALL" ? "All Time" : formatMonth(selectedPeriod)

  function handleDownload() {
    if (filteredTxns.length === 0) return
    if (format === "csv") downloadCSV(filteredTxns, periodLabel)
    else downloadPDF(filteredTxns, periodLabel)
  }

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
      {/* Header */}
      <p className="mb-1 font-semibold tracking-wide uppercase">Export Data</p>
      <p className="text-xs text-muted-foreground">
        Download your transaction history in your preferred format.
      </p>

      <div className="h-px w-full bg-neutral-100 dark:bg-white/6" />

      {/* Format toggle */}
      <div className="flex flex-col gap-2">
        <p className="text-xs tracking-wider text-muted-foreground uppercase">
          Format
        </p>
        <div className="flex gap-2">
          {(["csv", "pdf"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={cn(
                "nav flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                format === f
                  ? "bg-neutral-950/10! dark:bg-white/10!" // active state
                  : "text-muted-foreground hover:bg-white/5 dark:hover:bg-white/10" // inactive state
              )}
            >
              <DownloadIcon />
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-neutral-100 dark:bg-white/6" />

      {/* Period dropdown — derived from mock data */}
      <div className="flex flex-col gap-2">
        <p className="text-xs tracking-wider text-muted-foreground uppercase">
          Period
        </p>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className={cn(
            "nav w-full rounded-lg px-3 py-2 text-sm",
            "focus:outline-none",
            "cursor-pointer"
          )}
        >
          <option value="ALL">All Time</option>
          {/* Months come from actual transaction dates — swap transactions[] for API data later */}
          {availableMonths
            .slice()
            .reverse() // newest first
            .map((ym) => (
              <option key={ym} value={ym}>
                {formatMonth(ym)}
              </option>
            ))}
        </select>
        <p className="text-xs text-muted-foreground">
          {filteredTxns.length} transaction
          {filteredTxns.length !== 1 ? "s" : ""} in {periodLabel}
        </p>
      </div>

      <div className="h-px w-full bg-neutral-100 dark:bg-white/6" />

      {/* Download */}
      <button
        onClick={handleDownload}
        disabled={filteredTxns.length === 0}
        className={cn(
          "flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold tracking-wide uppercase",
          "transition-all duration-150 hover:bg-white/90 active:scale-[0.98] dark:bg-white/95 dark:text-black",
          "disabled:cursor-not-allowed disabled:opacity-40",
          "shadow-md ring-1 shadow-black/10 ring-black/10"
        )}
      >
        <DownloadIcon />
        Download {format.toUpperCase()}
      </button>
    </div>
  )
}

function DownloadIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 1v6.5M6 7.5l-2.5-2.5M6 7.5L8.5 5M1.5 10h9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
