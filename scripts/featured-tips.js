/**
 * Renders a "Featured Tips" section dynamically from a data array.
 *
 * Can be used in Node.js (outputs text) or browser (outputs HTML).
 *
 * @module featured-tips
 */

const featuredTips = [
  {
    title: "Use Conventional Commits",
    description:
      "Prefix your commit messages with feat:, fix:, or chore: to enable automated changelog generation and semantic versioning.",
  },
  {
    title: "Automate Your Release Notes",
    description:
      "Let AI review your PR diff and generate customer-facing release notes so nothing important is missed.",
  },
  {
    title: "Validate Acceptance Criteria Early",
    description:
      "Run AC compliance checks on every PR to catch mismatches between Jira requirements and the actual implementation.",
  },
  {
    title: "Protect Sensitive Data in Logs",
    description:
      "Always redact PII, API keys, and tokens before sending code diffs to external services for review.",
  },
  {
    title: "Keep PRs Small and Focused",
    description:
      "Smaller pull requests are easier to review, less likely to introduce bugs, and faster to merge.",
  },
];

/**
 * Renders featured tips as plain text (for Node.js / CLI usage).
 *
 * @param {Array} tips - Array of tip objects with title and description
 * @returns {string} Formatted text output
 */
function renderTipsText(tips) {
  if (!Array.isArray(tips) || tips.length === 0) {
    return "No featured tips available.";
  }

  const header = "=== Featured Tips ===\n";
  const body = tips
    .map((tip, i) => `${i + 1}. ${tip.title}\n   ${tip.description}`)
    .join("\n\n");

  return header + "\n" + body;
}

/**
 * Renders featured tips as an HTML string (for browser usage).
 *
 * @param {Array} tips - Array of tip objects with title and description
 * @returns {string} HTML markup for the tips section
 */
function renderTipsHTML(tips) {
  if (!Array.isArray(tips) || tips.length === 0) {
    return '<section class="featured-tips"><p>No featured tips available.</p></section>';
  }

  const items = tips
    .map(
      (tip) =>
        `    <div class="tip-card">
      <h3>${tip.title}</h3>
      <p>${tip.description}</p>
    </div>`
    )
    .join("\n");

  return `<section class="featured-tips">
  <h2>Featured Tips</h2>
${items}
</section>`;
}

module.exports = { featuredTips, renderTipsText, renderTipsHTML };

// Run if executed directly
if (require.main === module) {
  console.log(renderTipsText(featuredTips));
  console.log("\n--- HTML Output ---\n");
  console.log(renderTipsHTML(featuredTips));

  // Verify acceptance criteria
  console.log("\n--- Acceptance Criteria Check ---\n");

  const checks = [
    {
      name: "Tips rendered dynamically from array",
      pass: renderTipsText(featuredTips).includes("Featured Tips"),
    },
    {
      name: "At least 3 demo tips displayed",
      pass: featuredTips.length >= 3,
    },
    {
      name: "Each tip has title and description",
      pass: featuredTips.every((t) => t.title && t.description),
    },
    {
      name: "HTML output contains all tips",
      pass: featuredTips.every((t) => renderTipsHTML(featuredTips).includes(t.title)),
    },
    {
      name: "Empty array handled gracefully",
      pass: renderTipsText([]).includes("No featured tips"),
    },
  ];

  checks.forEach(({ name, pass }) => {
    console.log(`${pass ? "PASS" : "FAIL"}: ${name}`);
  });
}
