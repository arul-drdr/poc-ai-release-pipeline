#!/usr/bin/env node

/**
 * AI Code Review Script
 *
 * Reads a PR diff from stdin and sends it to the NVIDIA NIM API
 * for an AI-powered code review. Outputs structured markdown review.
 *
 * Usage:
 *   gh pr diff 123 | node scripts/ai-review-pr.js
 *
 * Environment:
 *   NVIDIA_API_KEY - API key from build.nvidia.com
 *   PR_TITLE       - PR title for context
 *   PR_BODY        - PR body/description for context
 *
 * Output:
 *   Writes review markdown to stdout
 */

const NVIDIA_API_URL =
  "https://integrate.api.nvidia.com/v1/chat/completions";
const MODEL = "meta/llama-3.3-70b-instruct";
const MAX_TOKENS = 2000;
const MAX_DIFF_CHARS = 8000;
const TIMEOUT_MS = 180000; // 3 minute timeout

const SYSTEM_PROMPT = `You are a senior code reviewer for a healthcare software product (.NET Core/C#).
Review the PR diff and provide actionable feedback.

## Review Focus Areas

### Security & PII (CRITICAL)
- No patient data (names, DOB, SSN, MRN) in log statements
- No Console.WriteLine or debug artifacts
- No hardcoded secrets or connection strings
- Input validation on API endpoints
- Proper authentication/authorization checks

### C# / .NET Best Practices
- Async methods must use async/await (never .Result or .Wait())
- CancellationToken must be propagated through async call chains
- Use ILogger for logging, never Console or Debug
- Use nullable reference types (? annotations)
- Use strongly typed options pattern (IOptions<T>), not magic strings

### Entity Framework
- Flag N+1 query patterns (queries inside loops)
- Read-only queries should use .AsNoTracking()
- Ensure Include() is used for related data
- SaveChanges should have error handling

### API Controllers
- Use [ApiController] attribute
- Return ActionResult<T> for proper content negotiation
- Use proper HTTP status codes
- Flag business logic in controllers (should be in services)

### General Code Quality
- Potential bugs or logic errors
- Performance concerns
- Missing error handling at system boundaries
- Code duplication

## Output Format

Rate each finding as: 🔴 CRITICAL | 🟠 HIGH | 🟡 MEDIUM | 🔵 LOW

Structure your review as:

### Summary
One paragraph overall assessment.

### Findings
List each finding with severity, file, and recommendation.

### Verdict
APPROVE / REQUEST_CHANGES / COMMENT

If there are no issues, say the code looks good and approve.
Keep the review concise — focus on real issues, not style nitpicks.`;

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

async function reviewWithAI(diff, title, body) {
  const token = process.env.NVIDIA_API_KEY;
  if (!token) {
    throw new Error("NVIDIA_API_KEY environment variable is not set.");
  }

  // Truncate diff if too large
  const truncatedDiff =
    diff.length > MAX_DIFF_CHARS
      ? diff.substring(0, MAX_DIFF_CHARS) +
        "\n\n... [diff truncated for AI review] ..."
      : diff;

  const userMessage = `## PR: ${title || "Untitled"}

### Description
${body || "No description provided."}

### Diff
\`\`\`diff
${truncatedDiff}
\`\`\``;

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
      temperature: 0.3,
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
  return data.choices[0].message.content;
}

async function main() {
  try {
    console.error("Reading PR diff from stdin...");
    const diff = await readStdin();

    if (!diff || diff.trim().length === 0) {
      console.error("Error: No diff content provided");
      process.exit(1);
    }

    const title = process.env.PR_TITLE || "";
    const body = process.env.PR_BODY || "";

    console.error(`Sending to NVIDIA API (${MODEL}) for review...`);
    const review = await reviewWithAI(diff, title, body);

    // Output review to stdout (workflow will capture this)
    console.log(`## 🤖 AI Code Review\n\n${review}\n\n---\n*Powered by ${MODEL} via NVIDIA NIM API*`);
  } catch (error) {
    console.error(`AI Review Error: ${error.message}`);
    // Output a fallback message instead of failing the workflow
    console.log("## 🤖 AI Code Review\n\n⚠️ AI review could not be completed. Please request a manual review.\n\n---\n*AI review temporarily unavailable*");
    process.exit(0);
  }
}

main();
