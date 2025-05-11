
Alert Processing & Visualization System



Summary:A dynamic web application that processes security alerts using a Large Language Model (LLM), generates concise summaries, and displays them in a clean and responsive dashboard.



Setup & Installation

Prerequisites:
Node.js version 20
npm version 9 or higher

Steps:

1) Clone the project repository and go into the project folder.

2) Run npm install to install all dependencies.

3) Create a .env file in the root directory and add your Google Gemini API key: GEMINI_API_KEY=your_gemini_api_key

4) Keep your alert data JSON files (e.g., generated_alerts) outside the Next.js project folder.

5) Run npm run build to build the project.

6) Run npm run dev to start the development server.



API Documentation
1. Alert API

Endpoint: /api/alerts/[id]

Method: GET

Description: Fetches alert details by ID and returns three main sections:

alertData: Basic threat and agent information

analysisData: AI-generated summary and verdict

updateData: Mock update status

2. LLM Integration

Service Used: Google Gemini API

Input: Raw alert data from JSON files

Output: Concise threat summary and analyst verdict

3. Data Source

Alert data is stored in .json files placed outside the Next.js app directory.



User Guide:

Use the Alert Dashboard to view all alerts.

Search, sort, and filter alerts easily.

Click any alert to view details including the LLM-generated analysis report.

Use the Summary Configuration page to control AI behavior.

