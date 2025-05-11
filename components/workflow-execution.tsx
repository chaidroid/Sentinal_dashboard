"use client"

import { useState } from "react"
import { CheckCircle, Clock, Play, Shield, StopCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export function WorkflowExecution() {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState<string | null>(null)
  const [logs, setLogs] = useState<{ timestamp: string; message: string }[]>([])
  const [workflowId, setWorkflowId] = useState<string | null>(null)

  const startWorkflow = () => {
    setIsRunning(true)
    setProgress(0)
    setCurrentStep("fetch")
    setWorkflowId(`workflow-${Date.now()}`)
    setLogs([{ timestamp: new Date().toISOString(), message: "Starting workflow execution" }])

    // Simulate workflow progress
    simulateWorkflowProgress()
  }

  const cancelWorkflow = () => {
    setIsRunning(false)
    setLogs((prev) => [...prev, { timestamp: new Date().toISOString(), message: "Workflow cancelled by user" }])
  }

  const simulateWorkflowProgress = () => {
    // Simulate fetch step
    let timeElapsed = 0
    const interval = setInterval(() => {
      timeElapsed += 500

      // Update progress based on time elapsed
      if (timeElapsed < 5000) {
        // Fetch step (0-33%)
        setCurrentStep("fetch")
        const fetchProgress = Math.min(33, (timeElapsed / 5000) * 33)
        setProgress(fetchProgress)

        // Add logs for fetch step
        if (timeElapsed === 500) {
          setLogs((prev) => [
            ...prev,
            {
              timestamp: new Date().toISOString(),
              message: "Fetching alerts from SentinelOne...",
            },
          ])
        }
        if (timeElapsed === 2500) {
          setLogs((prev) => [
            ...prev,
            {
              timestamp: new Date().toISOString(),
              message: "Retrieved 24 alerts from SentinelOne",
            },
          ])
        }
        if (timeElapsed === 4500) {
          setLogs((prev) => [
            ...prev,
            {
              timestamp: new Date().toISOString(),
              message: "Completed fetch step",
            },
          ])
        }
      } else if (timeElapsed < 15000) {
        // Process step (33-66%)
        setCurrentStep("process")
        const processProgress = Math.min(66, 33 + ((timeElapsed - 5000) / 10000) * 33)
        setProgress(processProgress)

        // Add logs for process step
        if (timeElapsed === 5500) {
          setLogs((prev) => [
            ...prev,
            {
              timestamp: new Date().toISOString(),
              message: "Processing alerts with LLM...",
            },
          ])
        }
        if (timeElapsed === 10000) {
          setLogs((prev) => [
            ...prev,
            {
              timestamp: new Date().toISOString(),
              message: "Processed 12/24 alerts",
            },
          ])
        }
        if (timeElapsed === 14500) {
          setLogs((prev) => [
            ...prev,
            {
              timestamp: new Date().toISOString(),
              message: "Completed process step. Processed 24 alerts successfully.",
            },
          ])
        }
      } else if (timeElapsed < 20000) {
        // Update step (66-100%)
        setCurrentStep("update")
        const updateProgress = Math.min(100, 66 + ((timeElapsed - 15000) / 5000) * 34)
        setProgress(updateProgress)

        // Add logs for update step
        if (timeElapsed === 15500) {
          setLogs((prev) => [
            ...prev,
            {
              timestamp: new Date().toISOString(),
              message: "Updating SentinelOne with results...",
            },
          ])
        }
        if (timeElapsed === 17500) {
          setLogs((prev) => [
            ...prev,
            {
              timestamp: new Date().toISOString(),
              message: "Updated 18/24 alerts in SentinelOne",
            },
          ])
        }
        if (timeElapsed === 19500) {
          setLogs((prev) => [
            ...prev,
            {
              timestamp: new Date().toISOString(),
              message: "Completed update step. Updated 24 alerts successfully.",
            },
          ])
        }
      } else {
        // Workflow completed
        setProgress(100)
        setCurrentStep(null)
        setIsRunning(false)
        setLogs((prev) => [
          ...prev,
          {
            timestamp: new Date().toISOString(),
            message: "Workflow execution completed successfully",
          },
        ])
        clearInterval(interval)
      }
    }, 500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Workflow Execution</CardTitle>
              <CardDescription>Execute and monitor the alert processing workflow.</CardDescription>
            </div>
            {workflowId && <Badge variant="outline">ID: {workflowId}</Badge>}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className={`border ${currentStep === "fetch" ? "border-blue-500" : ""}`}>
              <CardHeader className="p-4">
                <CardTitle className="text-sm flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Fetch Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  <Progress value={currentStep === "fetch" ? (progress / 33) * 100 : progress >= 33 ? 100 : 0} />
                  <p className="text-xs text-muted-foreground">
                    {currentStep === "fetch" ? "Running..." : progress >= 33 ? "Completed" : "Pending"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className={`border ${currentStep === "process" ? "border-blue-500" : ""}`}>
              <CardHeader className="p-4">
                <CardTitle className="text-sm flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  Process Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  <Progress
                    value={currentStep === "process" ? ((progress - 33) / 33) * 100 : progress >= 66 ? 100 : 0}
                  />
                  <p className="text-xs text-muted-foreground">
                    {currentStep === "process" ? "Running..." : progress >= 66 ? "Completed" : "Pending"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className={`border ${currentStep === "update" ? "border-blue-500" : ""}`}>
              <CardHeader className="p-4">
                <CardTitle className="text-sm flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Update SentinelOne
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  <Progress
                    value={currentStep === "update" ? ((progress - 66) / 34) * 100 : progress >= 100 ? 100 : 0}
                  />
                  <p className="text-xs text-muted-foreground">
                    {currentStep === "update" ? "Running..." : progress >= 100 ? "Completed" : "Pending"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Workflow Logs</h4>
            <Card className="border">
              <ScrollArea className="h-[300px] w-full rounded-md">
                <div className="p-4 space-y-2">
                  {logs.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No logs available. Start the workflow to see logs.</p>
                  ) : (
                    logs.map((log, index) => (
                      <div key={index} className="text-xs">
                        <span className="text-muted-foreground">[{new Date(log.timestamp).toLocaleTimeString()}]</span>{" "}
                        {log.message}
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </Card>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {!isRunning ? (
            <Button onClick={startWorkflow} disabled={isRunning} className="w-full">
              <Play className="mr-2 h-4 w-4" />
              Start Workflow
            </Button>
          ) : (
            <Button onClick={cancelWorkflow} variant="destructive" className="w-full">
              <StopCircle className="mr-2 h-4 w-4" />
              Cancel Workflow
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
