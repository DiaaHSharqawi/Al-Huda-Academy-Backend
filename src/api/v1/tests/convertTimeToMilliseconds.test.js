// convertTimeToMilliseconds.test.js
import { expect } from "@jest/globals";
import convertTimeToMilliseconds from "./../utils/millisecondsConverter";

describe("It shoud convert time to Milli seconds", () => {
  const testCases = [
    {
      input: "5s",
      expected: 5000,
      description: "converts 5 seconds to milliseconds",
      valid: true,
    },
    {
      input: "1m",
      expected: 60000,
      description: "converts 1 minute to milliseconds",
      valid: true,
    },
    {
      input: "1h",
      expected: 3600000,
      description: "converts 1 hour to milliseconds",
      valid: true,
    },
    {
      input: "1d",
      expected: 86400000,
      description: "converts 1 day to milliseconds",
      valid: true,
    },
    {
      input: "0s",
      expected: 0,
      description: "converts 0 seconds to milliseconds",
      valid: true,
    },
    {
      input: "0m",
      expected: 0,
      description: "converts 0 minutes to milliseconds",
      valid: true,
    },
    {
      input: "5x",
      expected: "Invalid time string format",
      description: "invalid unit, should throw an error",
      valid: false,
    },
    {
      input: "5",
      expected: "Invalid time string format",
      description: "missing unit, should throw an error",
      valid: false,
    },
    {
      input: "10m",
      expected: 600000,
      description: "converts 10 minutes to milliseconds",
      valid: true,
    },
  ];

  testCases.forEach(({ input, expected, description, valid }) => {
    if (valid) {
      test(description, () => {
        expect(convertTimeToMilliseconds(input)).toBe(expected);
      });
    } else {
      test(description, () => {
        expect(() => convertTimeToMilliseconds(input)).toThrow(expected);
      });
    }
  });
});
