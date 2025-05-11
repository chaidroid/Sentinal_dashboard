import { NextResponse } from "next/server"

// Mock data for a single alert
const alertData = {
  id: "1234567890",
  threatInfo: {
    threatName: "Suspicious PowerShell Command",
    threatId: "1234567890",
    filePath: "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
    fileVerificationType: "Signed",
    originatorProcess: "explorer.exe",
    confidenceLevel: "HIGH",
    processUser: "SYSTEM",
  },
  agentDetectionInfo: {
    agentComputerName: "DESKTOP-ABC123",
    agentLastLoggedInUserName: "admin",
  },
  createdAt: "2023-05-01T12:34:56Z",
}

// Mock data for analysis
const analysisData = {
  Agent_Verdict: "True Positive",
  Report:
    "This alert indicates a suspicious PowerShell command execution. The command was executed with SYSTEM privileges, which is unusual for normal operations. The originating process was explorer.exe, suggesting user interaction, but the command itself contains obfuscated code patterns commonly used in malicious scripts. Based on these factors, this is likely a true positive that requires immediate attention.",
}

// Mock data for update status
const updateData = {
  success: true,
  timestamp: "2023-05-01T12:45:23Z",
  verdict_result: { success: true },
  status_result: { success: true },
  notes_result: { success: true },
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // In a real app, we would fetch the alert data from a database
  // For now, we'll just return the mock data if the ID matches
  if (id === "1234567890") {
    return NextResponse.json({
      alert: alertData,
      analysis: analysisData,
      update: updateData,
    })
  }

  return NextResponse.json({ error: "Alert not found" }, { status: 404 })
}
