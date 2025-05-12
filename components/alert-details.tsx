"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Shield, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AlertData {
  id: string;
  threatInfo: {
    threatName: string;
    threatId: string;
    filePath: string;
    fileVerificationType: string;
    originatorProcess: string;
    confidenceLevel: string;
    processUser: string;
  };
  agentDetectionInfo: {
    agentComputerName: string;
    agentLastLoggedInUserName: string;
  };
  createdAt: string;
}

interface AnalysisData {
  Agent_Verdict: string;
  Report: string;
}

interface UpdateData {
  success: boolean;
  timestamp: string;
  verdict_result: { success: boolean };
  status_result: { success: boolean };
  notes_result: { success: boolean };
}

interface AlertResponse {
  alertData: AlertData;
  analysisData: AnalysisData;
  updateData: UpdateData;
}

interface AlertDetailsProps {
  id: string;
}

export function AlertDetails({ id }: AlertDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState<AlertResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/alerts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        console.log("aaaa", res);
        return res.json();
      })
      .then((data) => {
        console.log("bbb", data);
        setData(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error || !data) return <div>Error: {error}</div>;

  const { alertData, analysisData, updateData } = data;

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{alertData.threatInfo.threatName}</CardTitle>
              <CardDescription>Alert ID: {id}</CardDescription>
            </div>
            <Badge
              variant="outline"
              className="bg-red-50 text-red-700 border-red-200"
            >
              <AlertCircle className="mr-1 h-3 w-3" />
              True Positive
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analysis">LLM Analysis</TabsTrigger>
              <TabsTrigger value="updates">Update Status</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Threat Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-3 gap-2">
                      <span className="font-medium">Threat Name:</span>
                      <span className="col-span-2">
                        {alertData.threatInfo.threatName}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="font-medium">File Path:</span>
                      <span className="col-span-2 break-words">
                        {alertData.threatInfo.filePath}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="font-medium">Verification:</span>
                      <span className="col-span-2">
                        {alertData.threatInfo.fileVerificationType}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="font-medium">Originator:</span>
                      <span className="col-span-2">
                        {alertData.threatInfo.originatorProcess}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="font-medium">Confidence:</span>
                      <span className="col-span-2">
                        {alertData.threatInfo.confidenceLevel}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="font-medium">Process User:</span>
                      <span className="col-span-2">
                        {alertData.threatInfo.processUser}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Agent Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-3 gap-2">
                      <span className="font-medium">Computer:</span>
                      <span className="col-span-2">
                        {alertData.agentDetectionInfo.agentComputerName}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="font-medium">User:</span>
                      <span className="col-span-2">
                        {alertData.agentDetectionInfo.agentLastLoggedInUserName}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="font-medium">Created At:</span>
                      <span className="col-span-2">
                        {new Date(alertData.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="analysis" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    LLM Analysis Result
                  </h3>
                  <div className="p-4 rounded-md bg-muted">
                    <div className="flex items-center mb-2">
                      <span className="font-medium mr-2">Verdict:</span>
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-700 border-red-200"
                      >
                        {analysisData.Agent_Verdict}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Analysis Report:</span>
                      <p className="mt-2 text-sm whitespace-pre-wrap">
                        {analysisData.Report}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="updates" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    SentinelOne Update Status
                  </h3>
                  <div className="p-4 rounded-md bg-muted">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Status:</span>
                        {updateData.success ? (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Success
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200"
                          >
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Failed
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <span className="font-medium">Updated At:</span>
                        <span className="col-span-2">
                          {new Date(updateData.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="update-details">
                          <AccordionTrigger>Update Details</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center">
                                <span className="font-medium mr-2">
                                  Verdict Update:
                                </span>
                                {updateData.verdict_result.success ? (
                                  <Badge
                                    variant="outline"
                                    className="bg-green-50 text-green-700 border-green-200"
                                  >
                                    Success
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="bg-red-50 text-red-700 border-red-200"
                                  >
                                    Failed
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center">
                                <span className="font-medium mr-2">
                                  Status Update:
                                </span>
                                {updateData.status_result.success ? (
                                  <Badge
                                    variant="outline"
                                    className="bg-green-50 text-green-700 border-green-200"
                                  >
                                    Success
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="bg-red-50 text-red-700 border-red-200"
                                  >
                                    Failed
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center">
                                <span className="font-medium mr-2">
                                  Notes Update:
                                </span>
                                {updateData.notes_result.success ? (
                                  <Badge
                                    variant="outline"
                                    className="bg-green-50 text-green-700 border-green-200"
                                  >
                                    Success
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="bg-red-50 text-red-700 border-red-200"
                                  >
                                    Failed
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleClick}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Alerts
          </Button>
          <Button>
            <Shield className="mr-2 h-4 w-4" />
            Reprocess Alert
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
