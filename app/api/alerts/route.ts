import { NextResponse } from "next/server"

// Mock data for alerts
const alerts = [
  {
    id: "1234567890",
    threatName: "Suspicious PowerShell Command",
    confidence: "high",
    status: "processed",
    agentName: "DESKTOP-ABC123",
    filePath: "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
    timestamp: "2023-05-01T12:34:56Z",
    verdict: "true_positive",
  },
  {
    id: "2345678901",
    threatName: "Potential Malware Download",
    confidence: "medium",
    status: "processed",
    agentName: "LAPTOP-XYZ456",
    filePath: "C:\\Users\\user\\Downloads\\setup.exe",
    timestamp: "2023-05-02T10:11:12Z",
    verdict: "false_positive",
  },
  {
    id: "3456789012",
    threatName: "Suspicious Registry Modification",
    confidence: "high",
    status: "new",
    agentName: "SERVER-789",
    filePath: "C:\\Windows\\System32\\reg.exe",
    timestamp: "2023-05-03T09:08:07Z",
    verdict: null,
  },
  {
    id: "4567890123",
    threatName: "Potential Data Exfiltration",
    confidence: "high",
    status: "processed",
    agentName: "DESKTOP-DEF456",
    filePath: "C:\\Program Files\\FileZilla FTP Client\\filezilla.exe",
    timestamp: "2023-05-04T15:16:17Z",
    verdict: "true_positive",
  },
  {
    id: "5678901234",
    threatName: "Suspicious Script Execution",
    confidence: "medium",
    status: "new",
    agentName: "LAPTOP-GHI789",
    filePath: "C:\\Users\\admin\\Documents\\script.vbs",
    timestamp: "2023-05-05T14:13:12Z",
    verdict: null,
  },
]

export async function GET() {
  return NextResponse.json(alerts)
}
