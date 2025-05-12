"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Clock,
  Search,
  Shield,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Alert {
  id: string;
  threatName: string;
  confidence: string;
  status: string;
  agentName: string;
  filePath: string;
  timestamp: string;
  verdict: string | null;
}

export function AlertsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/alerts");
        if (!res.ok) throw new Error("Failed to fetch alerts");

        const json = await res.json();
        setAlerts(json);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!alerts) return <div>No alerts found.</div>;

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      searchQuery === "" ||
      alert.threatName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.agentName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter.length === 0 || statusFilter.includes(alert.status);

    return matchesSearch && matchesStatus;
  });

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>
          View and manage security alerts from SentinelOne.
        </CardDescription>
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
                    setStatusFilter([...statusFilter, "new"]);
                  } else {
                    setStatusFilter(statusFilter.filter((s) => s !== "new"));
                  }
                }}
              >
                New
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("processed")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setStatusFilter([...statusFilter, "processed"]);
                  } else {
                    setStatusFilter(
                      statusFilter.filter((s) => s !== "processed")
                    );
                  }
                }}
              >
                Processed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("updated")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setStatusFilter([...statusFilter, "updated"]);
                  } else {
                    setStatusFilter(
                      statusFilter.filter((s) => s !== "updated")
                    );
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
                      <Link
                        href={`/alerts/${alert.id}`}
                        className="hover:underline"
                      >
                        {alert.threatName}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {alert.status === "new" && (
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200"
                        >
                          <Clock className="mr-1 h-3 w-3" />
                          New
                        </Badge>
                      )}
                      {alert.status === "processed" && (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 border-amber-200"
                        >
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Processed
                        </Badge>
                      )}
                      {alert.status === "updated" && (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          <Shield className="mr-1 h-3 w-3" />
                          Updated
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{alert.agentName}</TableCell>
                    <TableCell>
                      {alert.confidence === "high" && (
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 border-red-200"
                        >
                          High
                        </Badge>
                      )}
                      {alert.confidence === "medium" && (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 border-amber-200"
                        >
                          Medium
                        </Badge>
                      )}
                      {alert.confidence === "low" && (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          Low
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {alert.verdict === "true_positive" && (
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 border-red-200"
                        >
                          <AlertCircle className="mr-1 h-3 w-3" />
                          True Positive
                        </Badge>
                      )}
                      {alert.verdict === "false_positive" && (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          <CheckCircle className="mr-1 h-3 w-3" />
                          False Positive
                        </Badge>
                      )}
                      {!alert.verdict && (
                        <span className="text-muted-foreground text-sm">
                          Pending
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
