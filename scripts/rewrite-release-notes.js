#!/usr/bin/env node

/**
 * AI Release Notes Rewriter
 *
 * Takes raw changelog from release-please (via stdin or file argument),
 * sends it to the GitHub Models API (using your Copilot-included models),
 * and outputs customer-friendly release notes.
 *
 * Usage:
 *   echo "raw notes" | node scripts/rewrite-release-notes.js
 *   node scripts/rewrite-release-notes.js path/to/changelog.md
 *
 * Environment:
 *   NVIDIA_API_KEY - API key from build.nvidia.com (preferred)
 *   GITHUB_TOKEN   - GitHub token fallback (automatically available in GitHub Actions)
 *
 * Output:
 *   Writes customer-facing notes to customer-release-notes.md
 */

const fs = require("fs");
const path = require("path");

const NVIDIA_API_URL =
  "https://integrate.api.nvidia.com/v1/chat/completions";
const GITHUB_MODELS_URL =
  "https://models.github.ai/inference/chat/completions";
const MAX_TOKENS = 2000;

// Use NVIDIA API if key is available, otherwise fall back to GitHub Models
function getApiConfig() {
  const nvidiaKey = process.env.NVIDIA_API_KEY;
  if (nvidiaKey) {
    return {
      url: NVIDIA_API_URL,
      token: nvidiaKey,
      model: "meta/llama-3.3-70b-instruct",
    };
  }
  const githubToken = process.env.GITHUB_TOKEN;
  if (githubToken) {
    return {
      url: GITHUB_MODELS_URL,
      token: githubToken,
      model: "openai/gpt-4o",
    };
  }
  throw new Error("Neither NVIDIA_API_KEY nor GITHUB_TOKEN is set.");
}

const SYSTEM_PROMPT = `You are a technical writer for a healthcare software product.
Rewrite these technical release notes into customer-friendly language.

Rules:
- Categorise into: New Features, Bug Fixes, and Improvements
- Keep it concise and benefit-oriented
- For each item, explain the user impact, not the technical implementation
- Remove Jira IDs and PR numbers from the customer-facing version
- Use professional, clear language appropriate for healthcare stakeholders
- Output as clean markdown`;

async function readInput() {
  const fileArg = process.argv[2];

  if (fileArg) {
    return fs.readFileSync(fileArg, "utf-8");
  }

  // Read from stdin
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf-8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", reject);

    // Timeout after 10 seconds if no stdin
    setTimeout(() => {
      if (!data) reject(new Error("No input received (timeout)"));
    }, 10000);
  });
}

async function rewriteWithAI(rawNotes) {
  const config = getApiConfig();

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.token}`,
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: MAX_TOKENS,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Here are the technical release notes to rewrite:\n\n${rawNotes}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `AI API returned HTTP ${response.status}: ${errorBody}`
    );
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function main() {
  try {
    console.log("Reading release notes...");
    const rawNotes = await readInput();

    if (!rawNotes || rawNotes.trim().length === 0) {
      console.error("Error: No release notes content provided");
      process.exit(1);
    }

    const config = getApiConfig();
    console.log(`Sending to ${config.model} for rewriting...`);
    let customerNotes;

    try {
      customerNotes = await rewriteWithAI(rawNotes);
    } catch (apiError) {
      console.warn(
        `Warning: AI rewriting failed (${apiError.message}). Using original notes.`
      );
      customerNotes = rawNotes;
    }

    // Output both versions
    const output = `## Technical Release Notes\n\n${rawNotes}\n\n---\n\n## Customer-Facing Release Notes\n\n${customerNotes}`;
    console.log("\n" + output);

    // Write customer-facing version to file
    const outputPath = path.join(process.cwd(), "customer-release-notes.md");
    fs.writeFileSync(outputPath, customerNotes, "utf-8");
    console.log(`\nCustomer-facing notes written to: ${outputPath}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
