"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Container } from "@/components/container"
import { useCurrentUser } from "@/hooks/use-current-user"

export default function AdminDashboardPage() {
  const router = useRouter()
  const user = useCurrentUser()

  useEffect(() => {
    if (user.role !== "admin") {
      router.push("/dashboard")
    }
  }, [user.role, router])

  if (user.role !== "admin") {
    return null
  }

  return (
    <Container>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Manage and monitor user accounts
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link
            href="/admin/users"
            className="nav flex items-center justify-between rounded-lg border p-6 transition-colors duration-150 hover:bg-white/10!"
          >
            <div>
              <h2 className="font-semibold">Users</h2>
              <p className="text-sm text-muted-foreground">
                View all user dashboards
              </p>
            </div>
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </Container>
  )
}
