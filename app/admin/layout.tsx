import { Navbar } from "@/components/navbar"
import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 pb-4 sm:px-8">
      <Navbar />
      <main className="font-manrope">{children}</main>
    </div>
  )
}
