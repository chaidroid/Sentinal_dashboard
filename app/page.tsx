import { AlertsTable } from "@/components/alerts-table"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardStats } from "@/components/dashboard-stats"
import { WorkflowCard } from "@/components/workflow-card"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="SentinelOne Alert Manager"
        text="Manage and analyze security alerts from SentinelOne."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardStats />
      </div>
      <div className="grid gap-4 md:grid-cols-7">
        <div className="col-span-4">
          <AlertsTable />
        </div>
        <div className="col-span-3">
          <WorkflowCard />
        </div>
      </div>
    </DashboardShell>
  )
}
