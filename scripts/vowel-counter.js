/**
 * Counts the number of English vowels (a, e, i, o, u) in a string.
 * Case-insensitive.
 *
 * @param {string} input - The string to count vowels in
 * @returns {number} The number of vowels found
 */
function countVowels(input) {
  if (!input || typeof input !== 'string') {
    return 0;
  }

  return input
    .toLowerCase()
    .split('')
    .filter((char) => 'aeiou'.includes(char))
    .length;
}

module.exports = { countVowels };

// Run if executed directly
if (require.main === module) {
  const testCases = [
    { input: 'Hello World', expected: 3 },
    { input: 'AEIOU', expected: 5 },
    { input: 'bcdfg', expected: 0 },
    { input: '', expected: 0 },
    { input: null, expected: 0 },
  ];

  testCases.forEach(({ input, expected }) => {
    const result = countVowels(input);
    const status = result === expected ? 'PASS' : 'FAIL';
    console.log(`${status}: countVowels("${input}") = ${result} (expected ${expected})`);
  });
}
