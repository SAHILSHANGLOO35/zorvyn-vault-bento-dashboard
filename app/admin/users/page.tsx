"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Container } from "@/components/container"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { users } from "@/data/mockData"
import { cn } from "@/lib/utils"
import { useCurrentUser } from "@/hooks/use-current-user"

export default function AdminUsersPage() {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const nonAdminUsers = users.filter((u) => u.role === "user")

  useEffect(() => {
    if (currentUser.role !== "admin") {
      router.push("/dashboard")
    }
  }, [currentUser.role, router])

  if (currentUser.role !== "admin") {
    return null
  }

  return (
    <Container>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-sm text-muted-foreground">
            Click on a user to view their dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {nonAdminUsers.map((user) => (
            <Link key={user.id} href={`/admin/users/${user.id}`}>
              <Card
                className={cn(
                  "nav cursor-pointer rounded-md transition-all duration-150 hover:bg-white/10!"
                )}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground capitalize">
                    Role: {user.role}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  )
}
