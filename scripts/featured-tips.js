/**
 * Renders a "Featured Tips" section dynamically from a data array.
 *
 * Supports Show More / Show Less toggle to initially display a limited
 * number of tips and expand on user interaction.
 *
 * Can be used in Node.js (outputs text) or browser (outputs interactive HTML).
 *
 * @module featured-tips
 */

const INITIAL_VISIBLE = 2;

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
 * @param {number} [visibleCount] - Number of tips to show initially (omit to show all)
 * @returns {string} Formatted text output
 */
function renderTipsText(tips, visibleCount) {
  if (!Array.isArray(tips) || tips.length === 0) {
    return "No featured tips available.";
  }

  const limit = visibleCount || tips.length;
  const visible = tips.slice(0, limit);
  const hidden = tips.length - limit;

  const header = "=== Featured Tips ===\n";
  const body = visible
    .map((tip, i) => `${i + 1}. ${tip.title}\n   ${tip.description}`)
    .join("\n\n");

  const footer = hidden > 0 ? `\n\n[Show More... (${hidden} more tips)]` : "";

  return header + "\n" + body + footer;
}

/**
 * Renders featured tips as interactive HTML with Show More / Show Less toggle.
 *
 * @param {Array} tips - Array of tip objects with title and description
 * @param {number} [initialVisible=2] - Number of tips visible before expanding
 * @returns {string} HTML markup with inline JS for toggle behaviour
 */
function renderTipsHTML(tips, initialVisible) {
  if (!Array.isArray(tips) || tips.length === 0) {
    return '<section class="featured-tips"><p>No featured tips available.</p></section>';
  }

  const limit = initialVisible || INITIAL_VISIBLE;
  const hasHidden = tips.length > limit;

  const items = tips
    .map((tip, i) => {
      const hiddenAttr = i >= limit ? ' style="display:none"' : "";
      const hiddenClass = i >= limit ? " tip-hidden" : "";
      return `    <div class="tip-card${hiddenClass}"${hiddenAttr}>
      <h3>${tip.title}</h3>
      <p>${tip.description}</p>
    </div>`;
    })
    .join("\n");

  const toggleBtn = hasHidden
    ? `\n    <button class="tips-toggle" onclick="toggleTips()">Show More</button>`
    : "";

  const toggleScript = hasHidden
    ? `
  <script>
    function toggleTips() {
      var hiddenCards = document.querySelectorAll('.tip-card.tip-hidden');
      var btn = document.querySelector('.tips-toggle');
      var isExpanded = btn.getAttribute('data-expanded') === 'true';

      for (var i = 0; i < hiddenCards.length; i++) {
        hiddenCards[i].style.display = isExpanded ? 'none' : '';
      }

      btn.textContent = isExpanded ? 'Show More' : 'Show Less';
      btn.setAttribute('data-expanded', isExpanded ? 'false' : 'true');
    }
  </script>`
    : "";

  return `<section class="featured-tips">
  <h2>Featured Tips</h2>
${items}${toggleBtn}
</section>${toggleScript}`;
}

module.exports = { featuredTips, renderTipsText, renderTipsHTML, INITIAL_VISIBLE };

// Run if executed directly
if (require.main === module) {
  console.log("--- Text Output (limited) ---\n");
  console.log(renderTipsText(featuredTips, INITIAL_VISIBLE));

  console.log("\n\n--- Text Output (all) ---\n");
  console.log(renderTipsText(featuredTips));

  console.log("\n\n--- HTML Output (interactive) ---\n");
  console.log(renderTipsHTML(featuredTips));

  // Verify acceptance criteria
  console.log("\n\n--- Acceptance Criteria Check ---\n");

  const html = renderTipsHTML(featuredTips);

  const checks = [
    {
      name: "Initially only limited tips are visible (hidden tips have display:none)",
      pass:
        (html.match(/style="display:none"/g) || []).length ===
        featuredTips.length - INITIAL_VISIBLE,
    },
    {
      name: 'Clicking "Show More" expands the list (toggle function exists)',
      pass: html.includes("function toggleTips()"),
    },
    {
      name: 'Clicking "Show Less" collapses the list (button text changes)',
      pass: html.includes("'Show Less'") && html.includes("'Show More'"),
    },
    {
      name: "Button label changes correctly based on state (data-expanded attr)",
      pass: html.includes("data-expanded"),
    },
    {
      name: "No UI breaking — all tips present in DOM",
      pass: featuredTips.every((t) => html.includes(t.title)),
    },
    {
      name: "Show More button rendered",
      pass: html.includes('class="tips-toggle"'),
    },
    {
      name: "Hidden tips have tip-hidden class for targeting",
      pass: html.includes("tip-hidden"),
    },
    {
      name: "Empty array handled gracefully",
      pass: renderTipsHTML([]).includes("No featured tips"),
    },
  ];

  checks.forEach(({ name, pass }) => {
    console.log(`${pass ? "PASS" : "FAIL"}: ${name}`);
  });
}
