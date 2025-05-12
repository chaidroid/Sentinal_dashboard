import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const alertsDir = path.join(process.cwd(), "../generated_alerts");

  try {
    const fileNames = fs.readdirSync(alertsDir);

    for (const file of fileNames) {
      const filePath = path.join(alertsDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const jsonData = JSON.parse(fileContent);

      if (jsonData.id === id) {
        const alertData = {
          id: jsonData.id,
          threatInfo: {
            threatName: jsonData.threatInfo?.threatName ?? "",
            threatId: jsonData.threatInfo?.threatId ?? "",
            filePath: jsonData.threatInfo?.filePath ?? "",
            fileVerificationType:
              jsonData.threatInfo?.fileVerificationType ?? "",
            originatorProcess: jsonData.threatInfo?.originatorProcess ?? "",
            confidenceLevel: jsonData.threatInfo?.confidenceLevel ?? "",
            processUser: jsonData.threatInfo?.processUser ?? "",
          },
          agentDetectionInfo: {
            agentComputerName:
              jsonData.agentRealtimeInfo?.agentComputerName ?? "",
            agentLastLoggedInUserName:
              jsonData.agentDetectionInfo?.agentLastLoggedInUserName ?? "",
          },
          createdAt: jsonData.createdAt ?? "",
        };

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
          Analyze the following alert:
          - Threat Name: ${alertData.threatInfo.threatName}
          - File Path: ${alertData.threatInfo.filePath}
          - Verification: ${alertData.threatInfo.fileVerificationType}
          - Originator: ${alertData.threatInfo.originatorProcess}
          - Confidence: ${alertData.threatInfo.confidenceLevel}
          - User: ${alertData.threatInfo.processUser}
          - Agent: ${alertData.agentDetectionInfo.agentComputerName}
          - Logged in User: ${alertData.agentDetectionInfo.agentLastLoggedInUserName}
          
          Give a security analyst-style report in 100 words and verdict (True Positive / False Positive)(Dont include heading only give paragragh answer last 2 words after full stop are "true positive or false positive").
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        const analysisData = {
          Agent_Verdict: text.includes("False Positive")
            ? "False Positive"
            : "True Positive",
          Report: text.slice(
            0,
            [...text.matchAll(/\./g)].slice(-2)[0]?.index! + 1
          ),
        };

        const updateData = {
          success: true,
          timestamp: jsonData.threatInfo?.createdAt,
          verdict_result: { success: true },
          status_result: { success: true },
          notes_result: { success: true },
        };

        return NextResponse.json({ alertData, analysisData, updateData });
      }
    }

    return NextResponse.json({ error: "Alert not found" }, { status: 404 });
  } catch (err) {
    console.error("Error reading alert files:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
