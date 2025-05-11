import { NextResponse } from "next/server"

// Mock workflow data
const workflows: Record<string, any> = {
  "workflow-example": {
    id: "workflow-example",
    logs: [
      { timestamp: "2023-05-01T12:34:56Z", message: "Starting workflow" },
      { timestamp: "2023-05-01T12:35:00Z", message: "Fetching alerts from SentinelOne..." },
      { timestamp: "2023-05-01T12:36:30Z", message: "Retrieved 24 alerts" },
      { timestamp: "2023-05-01T12:36:35Z", message: "Processing alerts with LLM..." },
      { timestamp: "2023-05-01T12:40:00Z", message: "Processed 24 alerts successfully" },
      { timestamp: "2023-05-01T12:40:05Z", message: "Updating SentinelOne with results..." },
      { timestamp: "2023-05-01T12:42:30Z", message: "Updated 24 alerts in SentinelOne" },
      { timestamp: "2023-05-01T12:42:35Z", message: "Workflow completed successfully" },
    ],
    status: {
      running: false,
      current_step: null,
      step_progress: 100,
      started_at: "2023-05-01T12:34:56Z",
      completed_at: "2023-05-01T12:42:35Z",
    },
  },
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Check if the workflow exists
  if (workflows[id]) {
    return NextResponse.json(workflows[id])
  }

  // If the workflow doesn't exist in our mock data, create a simulated one
  // This is just for demo purposes
  const simulatedWorkflow = {
    id: id,
    logs: [
      { timestamp: new Date().toISOString(), message: "Starting workflow" },
      { timestamp: new Date().toISOString(), message: "Fetching alerts from SentinelOne..." },
    ],
    status: {
      running: true,
      current_step: "fetch",
      step_progress: 25,
      started_at: new Date().toISOString(),
      completed_at: null,
    },
  }

  return NextResponse.json(simulatedWorkflow)
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // In a real app, we would cancel the workflow
  // For now, we'll just return a success message

  return NextResponse.json({
    message: "Workflow cancelled",
    workflow_id: id,
  })
}
