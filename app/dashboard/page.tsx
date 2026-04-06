"use client"

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
import { DEFAULT_USER_ID, transactions } from "@/data/mockData"
import { useCurrentUser } from "@/hooks/use-current-user"

export default function DashboardPage() {
  const { id } = useCurrentUser()

  return (
    <Container>
      <div className="mx-auto grid w-full auto-rows-[minmax(100px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <TotalIncome userId={id} />
        <TotalBalance userId={id} />
        <TotalExpenses userId={id} />
        <TotalSavings userId={id} />

        <BalanceChart
          data={transactions.filter((t) => t.userId === DEFAULT_USER_ID)}
          className="col-span-1 row-span-3 sm:col-span-2 lg:col-span-2"
        />

        <CategoryPieChart
          data={transactions}
          className="col-span-1 row-span-3 sm:col-span-2 lg:col-span-2"
        />

        <TransactionTable
          userId={id}
          className="col-span-1 row-span-3 sm:col-span-2 lg:col-span-2"
        />

        <InsightsPanel
          userId={id}
          className="col-span-1 row-span-3 sm:col-span-1 lg:col-span-1"
        />

        <ExportData
          userId={id}
          className="col-span-1 row-span-3 sm:col-span-1 lg:col-span-1"
        />
      </div>
    </Container>
  )
}
