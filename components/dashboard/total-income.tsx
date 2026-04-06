"use client"

import { getTotalIncome } from "@/lib/calculations"
import { userFinanceStore } from "@/store/user-finance-store"

type TotalBalanceProps = {
  userId?: string
}

export const TotalIncome = ({ userId }: TotalBalanceProps) => {
  const { transactions, currentUserId } = userFinanceStore()

  const targetUserId = userId ?? currentUserId

  const userTransactions = transactions.filter((t) => t.userId === targetUserId)

  const now = new Date()
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`

  const thisMonthTx = userTransactions.filter((t) =>
    t.date.startsWith(currentMonth)
  )

  const totalIncome = getTotalIncome(thisMonthTx)

  return (
    <div className="nav flex h-full w-full flex-col items-start justify-between rounded-md p-4">
      <h3 className="mb-2 font-semibold">
        <span className="mr-1">TOTAL</span> INCOME
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
            ₹ {totalIncome.toLocaleString("en-IN")}
          </span>
          <p className="text-xs text-muted-foreground">
            Total income of this month
          </p>
        </div>
      </div>
    </div>
  )
}

export const RupeeSVG = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#000000"
      viewBox="0 0 256 256"
      className={className}
    >
      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm38.32,72H176a8,8,0,0,1,0,16h-8.19A44.06,44.06,0,0,1,124,152H111.32l53.59,41.69a8,8,0,1,1-9.82,12.62l-72-56A8,8,0,0,1,88,136h36a28,28,0,0,0,27.71-24H88a8,8,0,0,1,0-16h61.29A28,28,0,0,0,124,80H88a8,8,0,0,1,0-16h88a8,8,0,0,1,0,16H157.92A43.87,43.87,0,0,1,166.32,96Z"></path>
    </svg>
  )
}
