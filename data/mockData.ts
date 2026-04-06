// --------------------
// TYPES
// --------------------

export type Role = "admin" | "user"

export type User = {
  id: string
  name: string
  email: string
  role: Role
}

export type Category =
  | "Salary"
  | "Food"
  | "Shopping"
  | "Bills"
  | "Entertainment"
  | "Travel"
  | "Health"

export type Transaction = {
  id: string
  userId: string
  date: string
  amount: number
  category: Category
  type: "income" | "expense"
  note?: string
}

// --------------------
// USERS
// --------------------

export const users: User[] = [
  {
    id: "u1",
    name: "Sahil Dev",
    email: "sahil@gmail.com",
    role: "admin",
  },
  {
    id: "u2",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    role: "user",
  },
  {
    id: "u3",
    name: "Amit Rao",
    email: "amit@gmail.com",
    role: "user",
  },
]

// --------------------
// DEFAULT USER
// --------------------

export const DEFAULT_USER_ID = "u1"

// --------------------
// CATEGORIES
// --------------------

export const categories: Category[] = [
  "Salary",
  "Food",
  "Shopping",
  "Bills",
  "Entertainment",
  "Travel",
  "Health",
]

// --------------------
// TRANSACTIONS
// --------------------

export const transactions: Transaction[] = [
  // =====================
  // RAHUL (u2) - 50k/month
  // =====================

  // JAN
  {
    id: "r1",
    userId: "u2",
    date: "2026-01-01",
    amount: 50000,
    category: "Salary",
    type: "income",
  },
  {
    id: "r2",
    userId: "u2",
    date: "2026-01-05",
    amount: 3000,
    category: "Food",
    type: "expense",
  },
  {
    id: "r3",
    userId: "u2",
    date: "2026-01-10",
    amount: 4000,
    category: "Bills",
    type: "expense",
  },
  {
    id: "r4",
    userId: "u2",
    date: "2026-01-15",
    amount: 2500,
    category: "Shopping",
    type: "expense",
  },
  {
    id: "r5",
    userId: "u2",
    date: "2026-01-20",
    amount: 2000,
    category: "Entertainment",
    type: "expense",
  },

  // FEB
  {
    id: "r6",
    userId: "u2",
    date: "2026-02-01",
    amount: 50000,
    category: "Salary",
    type: "income",
  },
  {
    id: "r7",
    userId: "u2",
    date: "2026-02-05",
    amount: 2800,
    category: "Food",
    type: "expense",
  },
  {
    id: "r8",
    userId: "u2",
    date: "2026-02-10",
    amount: 4200,
    category: "Bills",
    type: "expense",
  },
  {
    id: "r9",
    userId: "u2",
    date: "2026-02-15",
    amount: 3000,
    category: "Shopping",
    type: "expense",
  },
  {
    id: "r10",
    userId: "u2",
    date: "2026-02-20",
    amount: 2500,
    category: "Travel",
    type: "expense",
  },

  // MAR
  {
    id: "r11",
    userId: "u2",
    date: "2026-03-01",
    amount: 50000,
    category: "Salary",
    type: "income",
  },
  {
    id: "r12",
    userId: "u2",
    date: "2026-03-05",
    amount: 3200,
    category: "Food",
    type: "expense",
  },
  {
    id: "r13",
    userId: "u2",
    date: "2026-03-10",
    amount: 4000,
    category: "Bills",
    type: "expense",
  },
  {
    id: "r14",
    userId: "u2",
    date: "2026-03-15",
    amount: 4500,
    category: "Shopping",
    type: "expense",
  },
  {
    id: "r15",
    userId: "u2",
    date: "2026-03-20",
    amount: 2000,
    category: "Health",
    type: "expense",
  },

  // APR
  {
    id: "r16",
    userId: "u2",
    date: "2026-04-01",
    amount: 50000,
    category: "Salary",
    type: "income",
  },
  {
    id: "r17",
    userId: "u2",
    date: "2026-04-05",
    amount: 3000,
    category: "Food",
    type: "expense",
  },
  {
    id: "r18",
    userId: "u2",
    date: "2026-04-10",
    amount: 4500,
    category: "Bills",
    type: "expense",
  },
  {
    id: "r19",
    userId: "u2",
    date: "2026-04-15",
    amount: 2800,
    category: "Shopping",
    type: "expense",
  },
  {
    id: "r20",
    userId: "u2",
    date: "2026-04-20",
    amount: 2200,
    category: "Entertainment",
    type: "expense",
  },

  // MAY
  {
    id: "r21",
    userId: "u2",
    date: "2026-05-01",
    amount: 50000,
    category: "Salary",
    type: "income",
  },
  {
    id: "r22",
    userId: "u2",
    date: "2026-05-05",
    amount: 3100,
    category: "Food",
    type: "expense",
  },
  {
    id: "r23",
    userId: "u2",
    date: "2026-05-10",
    amount: 3800,
    category: "Bills",
    type: "expense",
  },
  {
    id: "r24",
    userId: "u2",
    date: "2026-05-15",
    amount: 3000,
    category: "Shopping",
    type: "expense",
  },
  {
    id: "r25",
    userId: "u2",
    date: "2026-05-20",
    amount: 2600,
    category: "Travel",
    type: "expense",
  },

  // JUN
  {
    id: "r26",
    userId: "u2",
    date: "2026-06-01",
    amount: 50000,
    category: "Salary",
    type: "income",
  },
  {
    id: "r27",
    userId: "u2",
    date: "2026-06-05",
    amount: 2900,
    category: "Food",
    type: "expense",
  },
  {
    id: "r28",
    userId: "u2",
    date: "2026-06-10",
    amount: 4100,
    category: "Bills",
    type: "expense",
  },
  {
    id: "r29",
    userId: "u2",
    date: "2026-06-15",
    amount: 3200,
    category: "Shopping",
    type: "expense",
  },
  {
    id: "r30",
    userId: "u2",
    date: "2026-06-20",
    amount: 2000,
    category: "Health",
    type: "expense",
  },

  // =====================
  // AMIT (u3) - 60k/month
  // =====================

  // JAN
  {
    id: "a1",
    userId: "u3",
    date: "2026-01-01",
    amount: 60000,
    category: "Salary",
    type: "income",
  },
  {
    id: "a2",
    userId: "u3",
    date: "2026-01-05",
    amount: 4000,
    category: "Food",
    type: "expense",
  },
  {
    id: "a3",
    userId: "u3",
    date: "2026-01-10",
    amount: 5000,
    category: "Bills",
    type: "expense",
  },
  {
    id: "a4",
    userId: "u3",
    date: "2026-01-15",
    amount: 3500,
    category: "Shopping",
    type: "expense",
  },
  {
    id: "a5",
    userId: "u3",
    date: "2026-01-20",
    amount: 3000,
    category: "Entertainment",
    type: "expense",
  },

  // FEB
  {
    id: "a6",
    userId: "u3",
    date: "2026-02-01",
    amount: 60000,
    category: "Salary",
    type: "income",
  },
  {
    id: "a7",
    userId: "u3",
    date: "2026-02-05",
    amount: 3500,
    category: "Food",
    type: "expense",
  },
  {
    id: "a8",
    userId: "u3",
    date: "2026-02-10",
    amount: 4500,
    category: "Bills",
    type: "expense",
  },
  {
    id: "a9",
    userId: "u3",
    date: "2026-02-15",
    amount: 4000,
    category: "Shopping",
    type: "expense",
  },
  {
    id: "a10",
    userId: "u3",
    date: "2026-02-20",
    amount: 3200,
    category: "Travel",
    type: "expense",
  },

  // MAR
  {
    id: "a11",
    userId: "u3",
    date: "2026-03-01",
    amount: 60000,
    category: "Salary",
    type: "income",
  },
  {
    id: "a12",
    userId: "u3",
    date: "2026-03-05",
    amount: 4200,
    category: "Food",
    type: "expense",
  },
  {
    id: "a13",
    userId: "u3",
    date: "2026-03-10",
    amount: 4800,
    category: "Bills",
    type: "expense",
  },
  {
    id: "a14",
    userId: "u3",
    date: "2026-03-15",
    amount: 5000,
    category: "Shopping",
    type: "expense",
  },
  {
    id: "a15",
    userId: "u3",
    date: "2026-03-20",
    amount: 2500,
    category: "Health",
    type: "expense",
  },

  // APR
  {
    id: "a16",
    userId: "u3",
    date: "2026-04-01",
    amount: 60000,
    category: "Salary",
    type: "income",
  },
  {
    id: "a17",
    userId: "u3",
    date: "2026-04-05",
    amount: 3800,
    category: "Food",
    type: "expense",
  },
  {
    id: "a18",
    userId: "u3",
    date: "2026-04-10",
    amount: 5200,
    category: "Bills",
    type: "expense",
  },
  {
    id: "a19",
    userId: "u3",
    date: "2026-04-15",
    amount: 4200,
    category: "Shopping",
    type: "expense",
  },
  {
    id: "a20",
    userId: "u3",
    date: "2026-04-20",
    amount: 3000,
    category: "Entertainment",
    type: "expense",
  },

  // MAY
  {
    id: "a21",
    userId: "u3",
    date: "2026-05-01",
    amount: 60000,
    category: "Salary",
    type: "income",
  },
  {
    id: "a22",
    userId: "u3",
    date: "2026-05-05",
    amount: 3600,
    category: "Food",
    type: "expense",
  },
  {
    id: "a23",
    userId: "u3",
    date: "2026-05-10",
    amount: 4800,
    category: "Bills",
    type: "expense",
  },
  {
    id: "a24",
    userId: "u3",
    date: "2026-05-15",
    amount: 4500,
    category: "Shopping",
    type: "expense",
  },
  {
    id: "a25",
    userId: "u3",
    date: "2026-05-20",
    amount: 3500,
    category: "Travel",
    type: "expense",
  },

  // JUN
  {
    id: "a26",
    userId: "u3",
    date: "2026-06-01",
    amount: 60000,
    category: "Salary",
    type: "income",
  },
  {
    id: "a27",
    userId: "u3",
    date: "2026-06-05",
    amount: 3400,
    category: "Food",
    type: "expense",
  },
  {
    id: "a28",
    userId: "u3",
    date: "2026-06-10",
    amount: 5000,
    category: "Bills",
    type: "expense",
  },
  {
    id: "a29",
    userId: "u3",
    date: "2026-06-15",
    amount: 4200,
    category: "Shopping",
    type: "expense",
  },
  {
    id: "a30",
    userId: "u3",
    date: "2026-06-20",
    amount: 2800,
    category: "Health",
    type: "expense",
  },
]
