/**
 * Reverses a string.
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

  console.log('\n=== Interview Notes ===');
  console.log('- Uses spread operator [...input] for Unicode safety (handles emojis/surrogate pairs)');
  console.log('- split("") breaks on UTF-16 code units, spread uses Symbol.iterator (codepoints)');
  console.log('- Time complexity: O(n) where n is the string length');
  console.log('- Space complexity: O(n) for the array copy');
}
