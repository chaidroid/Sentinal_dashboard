import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { WorkflowExecution } from "@/components/workflow-execution"

export default function WorkflowPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Workflow Execution" text="Execute and monitor the alert processing workflow." />
      <WorkflowExecution />
    </DashboardShell>
  )
}
