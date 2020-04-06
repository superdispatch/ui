import '@testing-library/jest-dom/extend-expect';

import {matcherHint, printExpected, printReceived} from 'jest-matcher-utils';

import {setupMockFunctionMatchers} from './packages/testutils/src/matchers/mock-function-matchers';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeSameDate(expected: unknown): R;
    }
  }
}

setupMockFunctionMatchers();

beforeEach(() => {
  jest.spyOn(console, 'warn');
  jest.spyOn(console, 'error');
});

afterEach(() => {
  // eslint-disable-next-line no-console
  // expect(console.warn).not.toBeCalled();
  // eslint-disable-next-line no-console
  // expect(console.error).not.toBeCalled();
});

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
          ? [
              matcherHint('.toBeSameDate'),
              '',
              'Expected values to be same:',
              `Expected: ${printExpected(expected)}`,
              `Received: ${printReceived(received)}`,
            ].join('\n')
          : [
              matcherHint('.not.toBeSameDate'),
              '',
              'Expected values to not be same:',
              `Expected: ${printExpected(expected)}`,
              `Received: ${printReceived(received)}`,
            ].join('\n'),
    };
  },
});
