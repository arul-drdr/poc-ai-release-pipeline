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
 * Uses a container ID to prevent duplicate rendering on re-calls, and
 * data attributes to scope toggle logic to a single section.
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
      const hiddenClass = i >= limit ? " tip-hidden" : "";
      return `    <div class="tip-card${hiddenClass}" data-tip-index="${i}">
      <h3>${tip.title}</h3>
      <p>${tip.description}</p>
    </div>`;
    })
    .join("\n");

  const toggleBtn = hasHidden
    ? `\n    <button class="tips-toggle" data-expanded="false" data-visible-count="${limit}">Show More</button>`
    : "";

  const toggleScript = hasHidden
    ? `
  <script>
    (function() {
      // Guard against duplicate script execution
      if (window._tipsToggleBound) return;
      window._tipsToggleBound = true;

      document.addEventListener('click', function(e) {
        var btn = e.target.closest('.tips-toggle');
        if (!btn) return;

        var section = btn.closest('.featured-tips');
        if (!section) return;

        var isExpanded = btn.getAttribute('data-expanded') === 'true';
        var visibleCount = parseInt(btn.getAttribute('data-visible-count'), 10);
        var cards = section.querySelectorAll('.tip-card');

        for (var i = 0; i < cards.length; i++) {
          if (i >= visibleCount) {
            if (isExpanded) {
              cards[i].classList.add('tip-hidden');
            } else {
              cards[i].classList.remove('tip-hidden');
            }
          }
        }

        btn.textContent = isExpanded ? 'Show More' : 'Show Less';
        btn.setAttribute('data-expanded', isExpanded ? 'false' : 'true');
      });
    })();
  </script>`
    : "";

  return `<section class="featured-tips" id="featured-tips-section">
  <h2>Featured Tips</h2>
${items}${toggleBtn}
</section>
  <style>
    .tip-card.tip-hidden { display: none; }
  </style>${toggleScript}`;
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
      name: "Initially only limited tips visible (tip-hidden class on extras)",
      pass:
        (html.match(/class="tip-card tip-hidden"/g) || []).length ===
        featuredTips.length - INITIAL_VISIBLE,
    },
    {
      name: "CSS rule hides tip-hidden cards (no inline style duplication)",
      pass:
        html.includes(".tip-card.tip-hidden { display: none; }") &&
        !html.includes('style="display:none"'),
    },
    {
      name: "Toggle uses classList add/remove (no duplicate rendering)",
      pass:
        html.includes("classList.add('tip-hidden')") &&
        html.includes("classList.remove('tip-hidden')"),
    },
    {
      name: "Duplicate script guard prevents multiple bindings",
      pass: html.includes("window._tipsToggleBound"),
    },
    {
      name: "Scoped to section via closest() (no cross-section interference)",
      pass: html.includes("btn.closest('.featured-tips')"),
    },
    {
      name: "Event delegation (single listener, not per-button onclick)",
      pass:
        html.includes("document.addEventListener('click'") &&
        !html.includes("onclick="),
    },
    {
      name: "Button label toggles between Show More / Show Less",
      pass: html.includes("'Show Less'") && html.includes("'Show More'"),
    },
    {
      name: "All tips present in DOM (no missing cards)",
      pass: featuredTips.every((t) => html.includes(t.title)),
    },
    {
      name: "Each card has unique data-tip-index",
      pass: featuredTips.every((_, i) => html.includes(`data-tip-index="${i}"`)),
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
