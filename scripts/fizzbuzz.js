/**
 * FizzBuzz - prints numbers from 1 to n with substitutions.
 *
 * Rules:
 * - Multiples of 3: "Fizz"
 * - Multiples of 5: "Buzz"
 * - Multiples of both 3 and 5: "FizzBuzz"
 * - Otherwise: the number itself
 *
 * @param {number} n - Positive integer upper bound
 * @returns {string[]} Array of FizzBuzz results from 1 to n
 */
function fizzBuzz(n) {
  if (!Number.isInteger(n) || n < 1) {
    return [];
  }

  const results = [];

  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      results.push("FizzBuzz");
    } else if (i % 3 === 0) {
      results.push("Fizz");
    } else if (i % 5 === 0) {
      results.push("Buzz");
    } else {
      results.push(String(i));
    }
  }

  return results;
}

module.exports = { fizzBuzz };

// Run if executed directly
if (require.main === module) {
  const testCases = [
    { input: 1, expected: ["1"] },
    { input: 3, expected: ["1", "2", "Fizz"] },
    { input: 5, expected: ["1", "2", "Fizz", "4", "Buzz"] },
    { input: 15, expected: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"] },
    { input: 0, expected: [] },
    { input: -1, expected: [] },
    { input: null, expected: [] },
  ];

  console.log("=== FizzBuzz Tests ===\n");

  testCases.forEach(({ input, expected }) => {
    const result = fizzBuzz(input);
    const pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`${pass ? "PASS" : "FAIL"}: fizzBuzz(${input}) = [${result.join(", ")}]`);
  });
}
