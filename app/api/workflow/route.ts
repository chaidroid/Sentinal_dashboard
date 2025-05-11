import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const config = (await request.json()) || {}

  // Generate a unique ID for this workflow
  const workflow_id = `workflow-${Date.now()}`

  // In a real app, we would start the workflow in a separate process
  // For now, we'll just return the workflow ID

  return NextResponse.json({
    message: "Workflow started",
    workflow_id: workflow_id,
  })
}
