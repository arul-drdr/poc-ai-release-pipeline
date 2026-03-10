/**
 * Reverses a string using the spread operator for Unicode safety.
 *
 * Uses [...input] instead of split('') to correctly handle
 * Unicode characters including emojis and surrogate pairs.
 *
 * Time complexity: O(n)
 * Space complexity: O(n)
 *
 * @param {string} input - The string to reverse
 * @returns {string} The reversed string
 */
function reverseString(input) {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return [...input].reverse().join('');
}

module.exports = { reverseString };

// Run if executed directly
if (require.main === module) {
  const testCases = [
    { input: 'hello', expected: 'olleh' },
    { input: 'world', expected: 'dlrow' },
    { input: 'a', expected: 'a' },
    { input: '', expected: '' },
    { input: null, expected: '' },
    { input: 'racecar', expected: 'racecar' },
  ];

  console.log('=== String Reverse Tests ===\n');

  testCases.forEach(({ input, expected }) => {
    const result = reverseString(input);
    const status = result === expected ? 'PASS' : 'FAIL';
    console.log(`${status}: reverseString("${input}") = "${result}" (expected "${expected}")`);
  });
}
