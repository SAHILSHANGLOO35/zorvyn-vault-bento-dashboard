"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DEFAULT_USER_ID, transactions } from "@/data/mockData"
import { cn } from "@/lib/utils"

type FilterType = "all" | "income" | "expense"

export const TransactionTable = ({
  className,
  userId,
}: {
  className?: string
  userId?: string
}) => {
  const userTransactions = useMemo(
    () => transactions.filter((t) => t.userId === (userId || DEFAULT_USER_ID)),
    [userId]
  )

  const months = useMemo(
    () =>
      Array.from(new Set(userTransactions.map((t) => t.date.slice(0, 7)))).sort(
        (a, b) => (a < b ? 1 : -1)
      ),
    [userTransactions]
  )

  const [filter, setFilter] = useState<FilterType>("all")
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(
    months[0]
  )

  const monthTx = useMemo(
    () =>
      selectedMonth
        ? userTransactions.filter((t) => t.date.startsWith(selectedMonth))
        : [],
    [userTransactions, selectedMonth]
  )

  const filteredTx = useMemo(
    () => monthTx.filter((tx) => filter === "all" || tx.type === filter),
    [monthTx, filter]
  )

  const total = useMemo(
    () =>
      filteredTx.reduce(
        (acc, tx) => (tx.type === "income" ? acc + tx.amount : acc - tx.amount),
        0
      ),
    [filteredTx]
  )

  const formatMonth = (month: string) => {
    const [year, m] = month.split("-")
    return new Date(Number(year), Number(m) - 1).toLocaleString("en-IN", {
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div
      className={cn(
        "nav flex h-full w-full flex-col rounded-md p-4 font-manrope",
        className
      )}
    >
      {/* HEADER */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-semibold">TRANSACTIONS</h3>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          {/* MONTH SELECTOR */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="nav w-full cursor-pointer rounded-md px-3 py-1.5 text-sm outline-none sm:w-auto"
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {formatMonth(m)}
              </option>
            ))}
          </select>

          {/* FILTER TABS */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {(["all", "income", "expense"] as FilterType[]).map((type) => (
              <span
                key={type}
                onClick={() => setFilter(type)}
                className={cn(
                  "cursor-pointer rounded-md px-3 py-1.5 transition-all duration-150 select-none active:scale-90",
                  filter === type
                    ? "nav text-neutral-900 dark:text-white"
                    : "nav text-muted-foreground"
                )}
              >
                {type.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="w-full overflow-x-auto">
        <Table className="min-w-125">
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead> <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTx.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground"
                >
                  No transactions
                </TableCell>
              </TableRow>
            ) : (
              filteredTx.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">{tx.category}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      <span
                        className={cn(
                          "mr-2 size-1.5 rounded-full",
                          tx.type === "income" ? "bg-emerald-500" : "bg-red-500"
                        )}
                      />
                      {tx.type === "income" ? "Received" : "Spent"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-sans">
                    <span className="mr-1">₹</span>
                    {tx.amount.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right font-medium capitalize",
                      tx.type === "income" ? "text-emerald-500" : "text-red-500"
                    )}
                  >
                    {tx.type}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter className="">
            <TableRow>
              <TableCell colSpan={3}>Net Balance</TableCell>
              <TableCell className="text-right font-sans">
                <span className="mr-1">₹</span>
                {total.toLocaleString("en-IN")}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}
