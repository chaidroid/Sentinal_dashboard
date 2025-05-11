import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SettingsForm } from "@/components/settings-form"

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your SentinelOne API settings and workflow configuration." />
      <SettingsForm />
    </DashboardShell>
  )
}
