import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeSameDate(expected: unknown): R;
    }
  }
}

expect.extend({
  toBeSameDate(received: unknown, expected: unknown) {
    const pass =
      (received == null && expected == null) ||
      (received instanceof Date &&
        expected instanceof Date &&
        (Object.is(received, expected) ||
          Object.is(received.getTime(), expected.getTime())));

    return {
      pass,
      message: () =>
        !pass
          ? `${matcherHint('.toBeSameDate')}\n` +
            `Expected dates to be same:\n` +
            `Expected: ${printExpected(expected)}\n` +
            `Received: ${printReceived(received)}`
          : `${matcherHint('.not.toBeSameDate')}\n` +
            `Expected dates to not be same:\n` +
            `Expected: ${printExpected(expected)}\n` +
            `Received: ${printReceived(received)}`,
    };
  },
});
