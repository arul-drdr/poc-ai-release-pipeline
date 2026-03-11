/**
 * Converts the first letter of every word in a string to uppercase.
 * The rest of each word remains unchanged.
 *
 * @param {string} str - The input string
 * @returns {string} The string with each word's first letter capitalized
 */
function capitalizeWords(str) {
  if (typeof str !== "string") {
    return "";
  }

  return str
    .split(" ")
    .map((word) => (word.length > 0 ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

module.exports = { capitalizeWords };

// Run if executed directly
if (require.main === module) {
  const testCases = [
    { input: "hello worlds", expected: "Hello World" },
    { input: "the quick brown fox", expected: "The Quick Brown Fox" },
    { input: "already Capitalized Words", expected: "Already Capitalized Words" },
    { input: "ALL UPPERCASE", expected: "ALL UPPERCASE" },
    { input: "a", expected: "A" },
    { input: "", expected: "" },
    { input: "multiple  spaces", expected: "Multiple  Spaces" },
    { input: "123 numbers first", expected: "123 Numbers First" },
    { input: "mixedCASE wORDS", expected: "MixedCASE WORDS" },
  ];

  console.log("=== Capitalize Words Tests ===\n");

  testCases.forEach(({ input, expected }) => {
    const result = capitalizeWords(input);
    const pass = result === expected;
    console.log(`${pass ? "PASS" : "FAIL"}: capitalizeWords("${input}") = "${result}"`);
    if (!pass) console.log(`  Expected: "${expected}"`);
  });
}
