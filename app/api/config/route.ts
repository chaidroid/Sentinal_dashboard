import { NextResponse } from "next/server"

// Default configuration
const DEFAULT_CONFIG = {
  alerts_dir: "./alerts",
  results_dir: "./results",
  updates_dir: "./updates",
  alert_limit: 20,
  api_token:
    "eyJraWQiOiJhcC1zb3V0aC0xLXByb2QtMCIsImFsZyI6IkVTMjU2In0.eyJzdWIiOiJzZXJ2aWNldXNlci1mNjE0MDRjOS04MWQwLTRkZDYtYjA3OS03YTJiMmI1MDUwODRAbWdtdC01Mi5zZW50aW5lbG9uZS5uZXQiLCJpc3MiOiJhdXRobi1hcC1zb3V0aC0xLXByb2QiLCJkZXBsb3ltZW50X2lkIjoiNTIiLCJ0eXBlIjoidXNlciIsImV4cCI6MTc0NjQ1MTgzOCwiaWF0IjoxNzQ1ODQ3MDUyLCJqdGkiOiIwNzhjMWNlNS0xZWE2LTQ0NGMtYTNkZi1jOGVjMmZjYzM4NTgifQ.rik1HUU9gjDXZpXTTX8WCHfg6EMSqIh0y_3jma8zmtC0lvj4Lg9h0TVYHWaIhxtazwXHzQuFKfwmYz7YJXfBJA",
  account_id: "2202822069622178056",
  console_url: "https://apso1-1003.sentinelone.net",
  skip_fetch: false,
  skip_process: false,
  skip_update: false,
}

export async function GET() {
  return NextResponse.json(DEFAULT_CONFIG)
}

export async function POST(request: Request) {
  const config_updates = await request.json()

  if (!config_updates) {
    return NextResponse.json({ error: "No configuration provided" }, { status: 400 })
  }

  // In a real app, we would update the configuration in a database
  // For now, we'll just return the updated config
  const updated_config = { ...DEFAULT_CONFIG, ...config_updates }

  return NextResponse.json({
    message: "Configuration updated",
    config: updated_config,
  })
}
