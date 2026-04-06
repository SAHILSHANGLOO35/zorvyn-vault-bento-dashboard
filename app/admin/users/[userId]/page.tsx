"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { BalanceChart } from "@/components/charts/balance-chart"
import { CategoryPieChart } from "@/components/charts/category-pie-chart"
import { Container } from "@/components/container"
import { ExportData } from "@/components/dashboard/export-data"
import InsightsPanel from "@/components/dashboard/insight-panel"
import { TotalBalance } from "@/components/dashboard/total-balance"
import { TotalExpenses } from "@/components/dashboard/total-expenses"
import { TotalIncome } from "@/components/dashboard/total-income"
import { TotalSavings } from "@/components/dashboard/total-savings"
import { TransactionTable } from "@/components/transactions/transaction-table"
import { transactions, users } from "@/data/mockData"
import { useCurrentUser } from "@/hooks/use-current-user"

export default function AdminUserDashboardPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.userId as string
  const currentUser = useCurrentUser()

  useEffect(() => {
    if (currentUser.role !== "admin") {
      router.push("/dashboard")
      return
    }

    const userExists = users.find((u) => u.id === userId)
    if (!userExists) {
      router.push("/admin/users")
      return
    }
  }, [userId, currentUser.role, router])

  const userTransactions = transactions.filter((t) => t.userId === userId)
  const userData = users.find((u) => u.id === userId)

  if (!userData || currentUser.role !== "admin") {
    return null
  }

  return (
    <Container>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{userData.name}&apos;s Dashboard</h1>
        <p className="text-sm text-muted-foreground">{userData.email}</p>
      </div>

      <div className="mx-auto grid w-full auto-rows-[minmax(100px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <TotalIncome userId={userId} />
        <TotalBalance userId={userId} />
        <TotalExpenses userId={userId} />
        <TotalSavings userId={userId} />
        <BalanceChart
          data={userTransactions}
          className="col-span-1 row-span-3 sm:col-span-2 lg:col-span-2"
        />
        <CategoryPieChart
          data={userTransactions}
          className="col-span-1 row-span-3 sm:col-span-2 lg:col-span-2"
        />
        <TransactionTable
          userId={userId}
          className="col-span-1 row-span-3 sm:col-span-2 lg:col-span-2"
        />
        <InsightsPanel
          userId={userId}
          className="col-span-1 row-span-3 sm:col-span-1 lg:col-span-1"
        />
        <ExportData
          userId={userId}
          className="col-span-1 row-span-3 sm:col-span-1 lg:col-span-1"
        />
      </div>
    </Container>
  )
}
