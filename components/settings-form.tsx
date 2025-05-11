"use client"

import type React from "react"

import { useState } from "react"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export function SettingsForm() {
  const [settings, setSettings] = useState({
    api_token: "eyJraWQiOiJhcC1zb3V0aC0xLXByb2QtMCIsImFsZyI6IkVTMjU2In0...",
    account_id: "2202822069622178056",
    console_url: "https://apso1-1003.sentinelone.net",
    alert_limit: 20,
    skip_fetch: false,
    skip_process: false,
    skip_update: false,
    alerts_dir: "./alerts",
    results_dir: "./results",
    updates_dir: "./updates",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the settings to the server
    console.log("Saving settings:", settings)
    // Show a success message
    alert("Settings saved successfully!")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="api" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="api">API Settings</TabsTrigger>
          <TabsTrigger value="workflow">Workflow Settings</TabsTrigger>
          <TabsTrigger value="directories">Directory Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="api" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>SentinelOne API Settings</CardTitle>
              <CardDescription>Configure your SentinelOne API credentials and endpoints.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api_token">API Token</Label>
                <Textarea
                  id="api_token"
                  name="api_token"
                  value={settings.api_token}
                  onChange={handleChange}
                  placeholder="Enter your SentinelOne API token"
                  className="min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account_id">Account ID</Label>
                <Input
                  id="account_id"
                  name="account_id"
                  value={settings.account_id}
                  onChange={handleChange}
                  placeholder="Enter your SentinelOne account ID"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="console_url">Console URL</Label>
                <Input
                  id="console_url"
                  name="console_url"
                  value={settings.console_url}
                  onChange={handleChange}
                  placeholder="Enter your SentinelOne console URL"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="workflow" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Settings</CardTitle>
              <CardDescription>Configure how the alert processing workflow operates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="alert_limit">Alert Limit</Label>
                <Input
                  id="alert_limit"
                  name="alert_limit"
                  type="number"
                  value={settings.alert_limit.toString()}
                  onChange={handleChange}
                  placeholder="Maximum number of alerts to fetch"
                />
                <p className="text-sm text-muted-foreground">Maximum number of alerts to fetch from SentinelOne.</p>
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Workflow Steps</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="skip_fetch">Skip Fetch Step</Label>
                    <p className="text-sm text-muted-foreground">
                      Skip fetching alerts from SentinelOne (use existing files).
                    </p>
                  </div>
                  <Switch
                    id="skip_fetch"
                    checked={settings.skip_fetch}
                    onCheckedChange={(checked) => handleSwitchChange("skip_fetch", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="skip_process">Skip Process Step</Label>
                    <p className="text-sm text-muted-foreground">
                      Skip processing alerts with LLM (use existing results).
                    </p>
                  </div>
                  <Switch
                    id="skip_process"
                    checked={settings.skip_process}
                    onCheckedChange={(checked) => handleSwitchChange("skip_process", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="skip_update">Skip Update Step</Label>
                    <p className="text-sm text-muted-foreground">Skip updating SentinelOne with results.</p>
                  </div>
                  <Switch
                    id="skip_update"
                    checked={settings.skip_update}
                    onCheckedChange={(checked) => handleSwitchChange("skip_update", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="directories" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Directory Settings</CardTitle>
              <CardDescription>
                Configure the directories used for storing alerts, results, and updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="alerts_dir">Alerts Directory</Label>
                <Input
                  id="alerts_dir"
                  name="alerts_dir"
                  value={settings.alerts_dir}
                  onChange={handleChange}
                  placeholder="Directory for alert JSON files"
                />
                <p className="text-sm text-muted-foreground">Directory where alert JSON files are stored.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="results_dir">Results Directory</Label>
                <Input
                  id="results_dir"
                  name="results_dir"
                  value={settings.results_dir}
                  onChange={handleChange}
                  placeholder="Directory for LLM analysis results"
                />
                <p className="text-sm text-muted-foreground">Directory where LLM analysis results are stored.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="updates_dir">Updates Directory</Label>
                <Input
                  id="updates_dir"
                  name="updates_dir"
                  value={settings.updates_dir}
                  onChange={handleChange}
                  placeholder="Directory for update results"
                />
                <p className="text-sm text-muted-foreground">Directory where update results are stored.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="mt-6">
        <Button type="submit" className="w-full sm:w-auto">
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </form>
  )
}
