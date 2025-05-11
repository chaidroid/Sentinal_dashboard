"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertCircle, CheckCircle, ChevronDown, Clock, Search, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

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

export function AlertsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string[]>([])

  const filteredAlerts = alerts.filter((alert) => {
    // Apply search filter
    const matchesSearch =
      searchQuery === "" ||
      alert.threatName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.agentName.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply status filter
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(alert.status)

    return matchesSearch && matchesStatus
  })

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>View and manage security alerts from SentinelOne.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between space-y-2 mb-4">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search alerts..."
                className="w-[200px] sm:w-[300px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Status <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("new")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setStatusFilter([...statusFilter, "new"])
                  } else {
                    setStatusFilter(statusFilter.filter((s) => s !== "new"))
                  }
                }}
              >
                New
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("processed")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setStatusFilter([...statusFilter, "processed"])
                  } else {
                    setStatusFilter(statusFilter.filter((s) => s !== "processed"))
                  }
                }}
              >
                Processed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("updated")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setStatusFilter([...statusFilter, "updated"])
                  } else {
                    setStatusFilter(statusFilter.filter((s) => s !== "updated"))
                  }
                }}
              >
                Updated
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Threat</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Verdict</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No alerts found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-medium">
                      <Link href={`/alerts/${alert.id}`} className="hover:underline">
                        {alert.threatName}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {alert.status === "new" && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          <Clock className="mr-1 h-3 w-3" />
                          New
                        </Badge>
                      )}
                      {alert.status === "processed" && (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Processed
                        </Badge>
                      )}
                      {alert.status === "updated" && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Shield className="mr-1 h-3 w-3" />
                          Updated
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{alert.agentName}</TableCell>
                    <TableCell>
                      {alert.confidence === "high" && (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          High
                        </Badge>
                      )}
                      {alert.confidence === "medium" && (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Medium
                        </Badge>
                      )}
                      {alert.confidence === "low" && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Low
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {alert.verdict === "true_positive" && (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          True Positive
                        </Badge>
                      )}
                      {alert.verdict === "false_positive" && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          False Positive
                        </Badge>
                      )}
                      {!alert.verdict && <span className="text-muted-foreground text-sm">Pending</span>}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
