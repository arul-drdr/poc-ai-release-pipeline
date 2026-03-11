#!/usr/bin/env node

/**
 * AI Acceptance Criteria Validation Script
 *
 * Reads a PR diff from stdin and compares it against the Jira
 * Acceptance Criteria to flag mismatches, missing items, or
 * partial implementations.
 *
 * Usage:
 *   gh pr diff 123 | node scripts/ai-validate-ac.js
 *
 * Environment:
 *   NVIDIA_API_KEY - API key from build.nvidia.com
 *   PR_TITLE       - PR title for context
 *   JIRA_AC        - Acceptance criteria text from Jira
 *
 * Output:
 *   Writes AC compliance markdown to stdout
 */

const NVIDIA_API_URL =
  "https://integrate.api.nvidia.com/v1/chat/completions";
const MODEL = "meta/llama-3.3-70b-instruct";
const MAX_TOKENS = 2000;
const MAX_DIFF_CHARS = 15000;
const TIMEOUT_MS = 60000; // 1 minute timeout

const SYSTEM_PROMPT = `You are a QA analyst for a healthcare software product.
Your job is to compare a code diff against the Acceptance Criteria (AC) from the Jira task and validate whether the implementation matches what was specified.

## Instructions

1. Parse each AC item individually (they may be bullet points, numbered list, or paragraphs).
2. For each AC item, examine the code diff carefully to determine compliance.
3. Pay close attention to:
   - Exact naming, spelling, and word order (e.g., "Featured Tips" vs "Tips Featured" is a mismatch)
   - All specified behaviors and edge cases
   - Any conditions or constraints mentioned in the AC
   - Values, thresholds, or limits specified in the AC

## Rating Scale

Rate each AC item as:
- ✅ **Met** — The diff fully satisfies this AC item
- ⚠️ **Partial** — The diff partially implements this or implements it differently than specified
- ❌ **Not Met** — The diff does not address this AC item at all
- ℹ️ **Cannot Determine** — The diff doesn't contain enough context to verify this item

## Output Format

For each AC item, provide:

| # | AC Item | Status | Details |
|---|---------|--------|---------|
| 1 | [brief AC item description] | [status emoji + label] | [explanation of what was found in the diff] |

For any ⚠️ Partial or ❌ Not Met items, add a section:

### Issues Found
- Describe exactly what differs between the AC and the implementation
- Quote the specific AC requirement and what the code actually does
- Be precise about naming mismatches, missing logic, or incorrect behavior

### Overall Verdict
State one of:
- **All AC items met** — Implementation matches the acceptance criteria
- **Partial compliance** — Some items need attention (list which ones)
- **Significant gaps** — Major AC items are not met

## Rules
- Be extremely precise about string comparisons, naming conventions, and word order
- Do not assume intent — only evaluate what the diff actually shows
- NEVER include patient data, secrets, credentials, or PII in your output
- If the AC is vague, note that and assess based on reasonable interpretation
- Focus on functional compliance, not code style`;

/**
 * Redact sensitive data from text before sending to external API.
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

async function validateACWithAI(diff, title, ac) {
  const token = process.env.NVIDIA_API_KEY;
  if (!token) {
    throw new Error("NVIDIA_API_KEY environment variable is not set.");
  }

  const cleanDiff = redactSensitiveData(diff);
  const truncatedDiff =
    cleanDiff.length > MAX_DIFF_CHARS
      ? cleanDiff.substring(0, MAX_DIFF_CHARS) +
        "\n\n... [diff truncated] ..."
      : cleanDiff;

  const cleanAC = redactSensitiveData(ac);

  const userMessage = `## PR: ${title || "Untitled"}

### Acceptance Criteria
${cleanAC}

### Code Diff
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
  return data.choices[0].message.content;
}

async function main() {
  try {
    const ac = process.env.JIRA_AC || "";
    if (!ac || ac.trim().length === 0) {
      console.error("No acceptance criteria provided, skipping validation");
      process.exit(0);
    }

    console.error("Reading PR diff from stdin...");
    const diff = await readStdin();

    if (!diff || diff.trim().length === 0) {
      console.error("Error: No diff content provided");
      process.exit(1);
    }

    const title = process.env.PR_TITLE || "";

    console.error(`Validating AC compliance via ${MODEL}...`);
    const validation = await validateACWithAI(diff, title, ac);

    console.log(`## 🎯 AC Compliance Check\n\n${validation}\n\n---\n*Validated by ${MODEL} via NVIDIA NIM API*`);
  } catch (error) {
    console.error(`AC Validation Error: ${error.message}`);
    console.log("## 🎯 AC Compliance Check\n\n⚠️ AC compliance check could not be completed. Please verify acceptance criteria manually.\n\n---\n*AC validation temporarily unavailable*");
    process.exit(0);
  }
}

main();
