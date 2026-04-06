import { Transaction } from "@/data/mockData"

export const getSummary = (transactions: Transaction[]) => {
  let income = 0
  let expense = 0

  transactions.forEach((t) => {
    if (t.type === "income") {
      income += t.amount // was = instead of +=
    } else {
      expense += t.amount // removed dead else-if branch with undefined `balance`
    }
  })

  return { income, expense, balance: income - expense }
}

// total income
export const getTotalIncome = (transactions: Transaction[]) => {
  return getSummary(transactions).income
}

// total expense
export const getTotalExpense = (transactions: Transaction[]) => {
  return getSummary(transactions).expense
}

// total savings (only positive balance)
export const getTotalSavings = (transactions: Transaction[]) => {
  const { balance } = getSummary(transactions)
  return Math.max(balance, 0)
}

// total balance (just alias for clarity in UI)
export const getTotalBalance = (transactions: Transaction[]) => {
  return getSummary(transactions).balance
}

// transaction count
export const getTransactionCount = (transactions: Transaction[]) => {
  return transactions.length
}

export const getCategoryBreakdown = (transactions: Transaction[]) => {
  const map: Record<string, number> = {}

  transactions.forEach((t) => {
    if (t.type === "expense") {
      map[t.category] = (map[t.category] || 0) + t.amount
    }
  })

  return Object.entries(map).map(([name, value]) => ({ name, value }))
}

export const getHighestSpendingCategory = (transactions: Transaction[]) => {
  const breakdown = getCategoryBreakdown(transactions)

  if (!breakdown.length) return null

  return breakdown.sort((a, b) => b.value - a.value)[0]
}
