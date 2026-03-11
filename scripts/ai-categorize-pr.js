#!/usr/bin/env node

/**
 * AI PR Categorization & Risk Assessment
 *
 * Analyzes a PR diff and body to determine work type, risk level,
 * scope, and any security/PII flags using the NVIDIA NIM API.
 *
 * Usage:
 *   gh pr diff 123 | NVIDIA_API_KEY=xxx PR_BODY="..." node scripts/ai-categorize-pr.js
 *
 * Environment:
 *   NVIDIA_API_KEY - API key from build.nvidia.com
 *   PR_TITLE       - PR title
 *   PR_BODY        - PR body/description
 *
 * Output:
 *   Writes JSON to stdout:
 *   {
 *     "work_type": "Feature|Bug Fix|Change Request|Critical Fix|Other",
 *     "risk": "Low|Medium|High|Critical",
 *     "scope": "patient|auth|api|ci|...",
 *     "summary": "One-line summary of what changed",
 *     "flags": ["PII exposure risk", "Missing auth check", ...]
 *   }
 */

const NVIDIA_API_URL =
  "https://integrate.api.nvidia.com/v1/chat/completions";
const MODEL = "meta/llama-3.3-70b-instruct";
const MAX_TOKENS = 1000;
const MAX_DIFF_CHARS = 15000;
const TIMEOUT_MS = 60000; // 1 minute timeout

const SYSTEM_PROMPT = `You are an AI that categorizes pull requests for a healthcare software product.
Analyze the PR diff and metadata to determine:

1. **work_type**: One of: "Feature", "Bug Fix", "Change Request", "Critical Fix", "Other"
   - Feature: New functionality added
   - Bug Fix: Fixing broken behavior
   - Change Request: Modifying existing behavior
   - Critical Fix: Security fix, data loss prevention, production incident
   - Other: CI/CD, docs, refactoring, tests

2. **risk**: One of: "Low", "Medium", "High", "Critical"
   - Low: Config changes, docs, tests, CI/CD, cosmetic changes
   - Medium: New features with tests, non-breaking API changes
   - High: Database migrations, auth changes, API breaking changes, PII-handling code
   - Critical: Security fixes, data loss scenarios, authentication bypass

3. **scope**: The main area affected (e.g., "patient", "auth", "api", "ci", "database", "ui")

4. **summary**: A one-line technical summary of what changed

5. **flags**: Array of risk flags (empty if none). Examples:
   - "PII field accessed without audit logging"
   - "Database migration detected"
   - "Authentication logic modified"
   - "No tests for new endpoint"
   - "Hardcoded connection string"

IMPORTANT: Respond with ONLY valid JSON, no markdown, no explanation. Just the JSON object.`;

async function readStdin() {
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf-8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", reject);
    setTimeout(() => {
      if (!data) reject(new Error("No input received (timeout)"));
    }, 15000);
  });
}

async function categorizeWithAI(diff, title, body) {
  const token = process.env.NVIDIA_API_KEY;
  if (!token) {
    throw new Error("NVIDIA_API_KEY environment variable is not set.");
  }

  const truncatedDiff =
    diff.length > MAX_DIFF_CHARS
      ? diff.substring(0, MAX_DIFF_CHARS) + "\n\n... [diff truncated] ..."
      : diff;

  const userMessage = `PR Title: ${title || "Untitled"}

PR Description:
${body || "No description."}

Diff:
${truncatedDiff}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const response = await fetch(NVIDIA_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      temperature: 0.1,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
    }),
    signal: controller.signal,
  });

  clearTimeout(timeoutId);

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`NVIDIA API returned HTTP ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  // Parse JSON from response (handle markdown code blocks if model wraps it)
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error(`AI did not return valid JSON: ${content.substring(0, 200)}`);
  }

  return JSON.parse(jsonMatch[0]);
}

// Fallback categorization using simple heuristics (same as current shell logic)
function fallbackCategorize(title, body) {
  let work_type = "Other";
  if (body && body.includes("- [x] Bug")) work_type = "Bug Fix";
  else if (body && body.includes("- [x] Feature")) work_type = "Feature";
  else if (body && body.includes("- [x] Change Request")) work_type = "Change Request";
  else if (body && body.includes("- [x] Critical Fix")) work_type = "Critical Fix";
  else if (title && title.startsWith("feat")) work_type = "Feature";
  else if (title && title.startsWith("fix")) work_type = "Bug Fix";
  else if (title && title.startsWith("critical")) work_type = "Critical Fix";

  const scopeMatch = (title || "").match(/\(([^)]+)\)/);
  const scope = scopeMatch ? scopeMatch[1] : "general";

  return {
    work_type,
    risk: "Low",
    scope,
    summary: title || "No summary",
    flags: [],
    ai_generated: false,
  };
}

async function main() {
  const title = process.env.PR_TITLE || "";
  const body = process.env.PR_BODY || "";

  try {
    console.error("Reading PR diff from stdin...");
    const diff = await readStdin();

    if (!diff || diff.trim().length === 0) {
      console.error("No diff provided, using fallback categorization");
      console.log(JSON.stringify(fallbackCategorize(title, body)));
      return;
    }

    console.error(`Sending to NVIDIA API (${MODEL}) for categorization...`);
    const result = await categorizeWithAI(diff, title, body);
    result.ai_generated = true;
    console.log(JSON.stringify(result));
  } catch (error) {
    console.error(`AI Categorization Error: ${error.message}`);
    console.error("Falling back to heuristic categorization");
    console.log(JSON.stringify(fallbackCategorize(title, body)));
  }
}

main();
