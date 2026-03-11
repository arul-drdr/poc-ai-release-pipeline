/**
 * Removes duplicate values from an array, keeping the first occurrence.
 *
 * Returns a new array — the original is not modified.
 *
 * Time complexity: O(n)
 * Space complexity: O(n)
 *
 * @param {Array} arr - The input array (any type of elements supported)
 * @returns {Array} A new array with duplicates removed
 */
function removeDuplicates(arr) {
  if (!Array.isArray(arr)) {
    return [];
  }

  const seen = new Set();
  const result = [];

  for (const item of arr) {
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }

  return result;
}

module.exports = { removeDuplicates };

// Run if executed directly
if (require.main === module) {
  const testCases = [
    { input: [1, 2, 3, 2, 1, 4], expected: [1, 2, 3, 4] },
    { input: ["a", "b", "a", "c", "b"], expected: ["a", "b", "c"] },
    { input: [1, 1, 1, 1], expected: [1] },
    { input: [], expected: [] },
    { input: [1, "1", true, 1, "1", true], expected: [1, "1", true] },
    { input: [null, undefined, null, 0, false, 0], expected: [null, undefined, 0, false] },
    { input: null, expected: [] },
  ];

  console.log("=== Remove Duplicates Tests ===\n");

  testCases.forEach(({ input, expected }) => {
    const original = Array.isArray(input) ? [...input] : input;
    const result = removeDuplicates(input);
    const pass = JSON.stringify(result) === JSON.stringify(expected);
    const mutated = Array.isArray(input) && JSON.stringify(input) !== JSON.stringify(original);

    console.log(`${pass && !mutated ? "PASS" : "FAIL"}: removeDuplicates(${JSON.stringify(input)}) = ${JSON.stringify(result)}`);
    if (mutated) console.log("  FAIL: Original array was modified!");
  });
}
