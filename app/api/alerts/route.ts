import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  const alertsDir = path.join(process.cwd(), "../generated_alerts");

  try {
    const fileNames = fs.readdirSync(alertsDir);

    const rawData = fileNames.map((file) => {
      const filePath = path.join(alertsDir, file);
      const fileContents = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(fileContents);
    });

    const alerts = rawData.map((alert: any) => ({
      id: alert?.id ?? "",
      threatName: alert?.threatInfo?.threatName ?? "",
      confidence: alert?.threatInfo?.confidenceLevel ?? "",
      agentName: alert?.agentRealtimeInfo?.agentComputerName ?? "",
      filePath: alert?.threatInfo?.filePath ?? "",
      status: alert?.threatInfo?.incidentStatus ?? "",
      timestamp: alert?.threatInfo?.createdAt ?? "",
      verdict: alert?.threatInfo?.analystVerdict ?? "",
    }));

    return NextResponse.json(alerts);
  } catch (error) {
    console.error("Error reading alert files:", error);
    return NextResponse.json(
      { error: "Failed to load alerts" },
      { status: 500 }
    );
  }
}
