export const formatCurrency = (amount: number, compact = false) =>
  new Intl.NumberFormat("en-IN", {
    notation: compact ? "compact" : undefined,
    style: compact ? undefined : "currency",
    currency: compact ? undefined : "INR",
    maximumFractionDigits: compact ? 1 : 0,
  }).format(amount)

export const formatDate = (
  date: string,
  type: "short" | "month" | "full" = "short"
) => {
  const d = new Date(date)

  if (type === "month") return d.toLocaleString("en-IN", { month: "short" })
  if (type === "full") return d.toLocaleDateString("en-IN")
  return `${d.getDate()} ${d.toLocaleString("en-IN", { month: "short" })}`
}
