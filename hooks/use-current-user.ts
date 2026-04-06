import { userFinanceStore } from "@/store/user-finance-store"

export const useCurrentUser = () => {
  const { users, currentUserId } = userFinanceStore()

  return users.find((u) => u.id === currentUserId)!
}
