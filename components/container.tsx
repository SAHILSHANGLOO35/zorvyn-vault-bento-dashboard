import { cn } from "@/lib/utils"
import React from "react"

export const Container = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8", className)}
    >
      {children}
    </div>
  )
}
