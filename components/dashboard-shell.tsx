import type React from "react"
interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="grid items-start gap-8">
      <div className="container flex-1 space-y-4 p-8 pt-6">{children}</div>
    </div>
  )
}
