"use client"

import { useState } from "react"
import { Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export function WorkflowCard() {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  const startWorkflow = () => {
    setIsRunning(true)
    setProgress(0)

    // Simulate workflow progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRunning(false)
          return 100
        }
        return prev + 5
      })
    }, 500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workflow Status</CardTitle>
        <CardDescription>Execute and monitor the alert processing workflow.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Current Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Current Step</h4>
          <p className="text-sm text-muted-foreground">
            {!isRunning && progress === 0 && "Not started"}
            {isRunning && progress < 33 && "Fetching alerts from SentinelOne..."}
            {isRunning && progress >= 33 && progress < 66 && "Processing alerts with LLM..."}
            {isRunning && progress >= 66 && progress < 100 && "Updating SentinelOne with results..."}
            {!isRunning && progress === 100 && "Workflow completed successfully"}
          </p>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Recent Activity</h4>
          <div className="max-h-[200px] overflow-y-auto space-y-2">
            {progress >= 100 && (
              <p className="text-xs text-muted-foreground">
                <span className="text-foreground font-medium">Completed:</span> Workflow execution completed
                successfully
              </p>
            )}
            {progress >= 66 && (
              <p className="text-xs text-muted-foreground">
                <span className="text-foreground font-medium">Update:</span> Updated 18 alerts in SentinelOne
              </p>
            )}
            {progress >= 33 && (
              <p className="text-xs text-muted-foreground">
                <span className="text-foreground font-medium">Process:</span> Processed 24 alerts with LLM
              </p>
            )}
            {progress > 0 && (
              <p className="text-xs text-muted-foreground">
                <span className="text-foreground font-medium">Fetch:</span> Retrieved 24 alerts from SentinelOne
              </p>
            )}
            {progress > 0 && (
              <p className="text-xs text-muted-foreground">
                <span className="text-foreground font-medium">Started:</span> Workflow execution started
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={startWorkflow} disabled={isRunning} className="w-full">
          <Play className="mr-2 h-4 w-4" />
          {isRunning ? "Running..." : "Start Workflow"}
        </Button>
      </CardFooter>
    </Card>
  )
}
