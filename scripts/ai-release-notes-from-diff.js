#!/usr/bin/env node

/**
 * AI Release Notes Generator from Code Diffs
 *
 * Reads a PR diff and generates customer-facing release notes
 * based on the actual code changes, not just the PR description.
 *
 * Usage:
 *   gh pr diff 123 | NVIDIA_API_KEY=xxx PR_TITLE="..." node scripts/ai-release-notes-from-diff.js
 *
 * Environment:
 *   NVIDIA_API_KEY - API key from build.nvidia.com
 *   PR_TITLE       - PR title for context
 *   PR_BODY        - PR body/description for context
 *
 * Output:
 *   Writes customer-facing release notes to stdout
 */

const NVIDIA_API_URL =
  "https://integrate.api.nvidia.com/v1/chat/completions";
const MODEL = "meta/llama-3.3-70b-instruct";
const MAX_TOKENS = 2000;
const MAX_DIFF_CHARS = 15000;
const TIMEOUT_MS = 60000; // 1 minute timeout

const SYSTEM_PROMPT = `You are a technical writer for a healthcare software product.
Your job is to read a code diff and write customer-facing release notes.

Rules:
- Write from the customer's perspective — what changed FOR THEM
- Focus on user impact, not technical implementation details
- Remove all Jira IDs, PR numbers, commit hashes
- Use professional, clear language for healthcare stakeholders
- Categorize into: New Features, Improvements, or Bug Fixes (only include relevant categories)
- Keep it concise: 2-5 bullet points maximum
- If the change is purely internal (CI/CD, refactoring, tests), write: "Internal improvements to system reliability and performance."
- NEVER include code snippets, file paths, secrets, credentials, or patient identifiers in the output
- Output clean markdown without code blocks

Example output:
### New Features
- Added address validation for patient records, reducing data entry errors

### Bug Fixes
- Fixed an issue where session tokens were not refreshing correctly, preventing intermittent login failures`;

/**
 * Redact sensitive data from diff content before sending to external API.
 */
function redactSensitiveData(text) {
  return text
    .replace(/(api[_-]?key|token|secret|password|passwd|pwd|authorization|bearer)\s*[:=]\s*["']?[A-Za-z0-9\-_.~+/]{8,}["']?/gi, "$1=***REDACTED***")
    .replace(/(Server|Data Source|Initial Catalog|User ID|Password|Integrated Security)[^;\n]{0,100}/gi, "$1=***REDACTED***")
    .replace(/AKIA[0-9A-Z]{16}/g, "***REDACTED_AWS_KEY***")
    .replace(/-----BEGIN (RSA |EC |DSA )?PRIVATE KEY-----[\s\S]*?-----END (RSA |EC |DSA )?PRIVATE KEY-----/g, "***REDACTED_PRIVATE_KEY***")
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "***REDACTED_SSN***")
    .replace(/^([+-].*?)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gm, "$1***REDACTED_EMAIL***")
    .replace(/eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g, "***REDACTED_JWT***");
}

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

async function generateNotesFromDiff(diff, title, body) {
  const token = process.env.NVIDIA_API_KEY;
  if (!token) {
    throw new Error("NVIDIA_API_KEY environment variable is not set.");
  }

  const cleanDiff = redactSensitiveData(diff);
  const truncatedDiff =
    cleanDiff.length > MAX_DIFF_CHARS
      ? cleanDiff.substring(0, MAX_DIFF_CHARS) + "\n\n... [diff truncated] ..."
      : cleanDiff;

  const userMessage = `PR Title: ${title || "Untitled"}

Developer Description:
${body || "No description provided."}

Code Diff:
${truncatedDiff}

Write customer-facing release notes based on the actual code changes above.`;

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
      temperature: 0.4,
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
  const title = process.env.PR_TITLE || "";
  const body = process.env.PR_BODY || "";

  try {
    console.error("Reading PR diff from stdin...");
    const diff = await readStdin();

    if (!diff || diff.trim().length === 0) {
      console.error("No diff provided");
      console.log("No release notes available.");
      return;
    }

    console.error(`Sending to NVIDIA API (${MODEL}) for release notes generation...`);
    const notes = await generateNotesFromDiff(diff, title, body);
    console.log(notes);
  } catch (error) {
    console.error(`AI Release Notes Error: ${error.message}`);
    // Fallback: use the PR body's Release Notes section if available
    const releaseNotesMatch = (body || "").match(
      /## Release Notes\s*\n([\s\S]*?)(?=\n## |$)/
    );
    if (releaseNotesMatch && !releaseNotesMatch[1].includes("Write a customer-readable")) {
      console.log(releaseNotesMatch[1].trim());
    } else {
      console.log("No release notes available.");
    }
  }
}

main();
