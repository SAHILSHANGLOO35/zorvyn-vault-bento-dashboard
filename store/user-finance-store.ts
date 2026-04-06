import { create } from "zustand"
import {
  users,
  transactions,
  DEFAULT_USER_ID,
  User,
  Transaction,
} from "@/data/mockData"

type Store = {
  users: User[]
  transactions: Transaction[]
  currentUserId: string

  setCurrentUserId: (id: string) => void
  addTransaction: (t: Transaction) => void
}

export const userFinanceStore = create<Store>((set) => ({
  users,
  transactions,
  currentUserId: DEFAULT_USER_ID,

  setCurrentUserId: (id) => set({ currentUserId: id }),

  addTransaction: (t) =>
    set((state) => ({
      transactions: [t, ...state.transactions],
    })),
}))
