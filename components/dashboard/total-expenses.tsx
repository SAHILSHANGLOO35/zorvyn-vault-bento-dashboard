"use client"

import { getTotalExpense } from "@/lib/calculations"
import { userFinanceStore } from "@/store/user-finance-store"
import { RupeeSVG } from "./total-income"

type TotalBalanceProps = {
  userId?: string
}

export const TotalExpenses = ({ userId }: TotalBalanceProps) => {
  const { transactions, currentUserId } = userFinanceStore()

  const targetUserId = userId ?? currentUserId

  const userTransactions = transactions.filter((t) => t.userId === targetUserId)

  const totalExpense = getTotalExpense(userTransactions)

  return (
    <div className="nav flex h-full w-full flex-col items-start justify-between rounded-md p-4">
      <h3 className="mb-2 font-semibold">
        <span className="mr-1">TOTAL</span> EXPENSES
      </h3>
      <div className="flex items-center gap-4">
        <span
          className="rounded-md px-2.5 py-2.5"
          style={{
            background: "var(--bg-light)",
            boxShadow: "var(--shadow-s)",
          }}
        >
          <RupeeSVG className="size-8 rounded-full bg-white" />
        </span>
        <div className="flex flex-col justify-between">
          <span className="font-sans">
            ₹ {totalExpense.toLocaleString("en-IN")}
          </span>
          <p className="text-xs text-muted-foreground">
            Your total spending so far
          </p>
        </div>
      </div>
    </div>
  )
}
