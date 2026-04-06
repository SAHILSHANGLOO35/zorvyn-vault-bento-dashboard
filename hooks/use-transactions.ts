import { userFinanceStore } from "@/store/user-finance-store"
import { useCurrentUser } from "./use-current-user"

export const useTransactions = () => {
  const { transactions } = userFinanceStore()
  const currentUser = useCurrentUser()

  if (currentUser?.role === "admin") return transactions

  return transactions.filter((t) => t.userId === currentUser.id)
}
