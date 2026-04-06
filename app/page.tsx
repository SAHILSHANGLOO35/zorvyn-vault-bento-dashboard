"use client"

import { useCurrentUser } from "@/hooks/use-current-user"
import { redirect } from "next/navigation"

export default function Page() {
  const { role } = useCurrentUser()

  if (role === "user") {
    redirect("/dashboard")
  } else if (role === "admin") {
    redirect("/admin")
  }
}
