import { AlertDetails } from "@/components/alert-details"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

interface AlertPageProps {
  params: {
    id: string
  }
}

export default function AlertPage({ params }: AlertPageProps) {
  return (
    <DashboardShell>
      <DashboardHeader heading={`Alert ${params.id}`} text="View and manage alert details." />
      <AlertDetails id={params.id} />
    </DashboardShell>
  )
}
