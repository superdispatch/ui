import { toMatchInlineSnapshot } from 'jest-snapshot';

declare global {
  namespace jest {
    interface Matchers<R, T = {}> {
      toHaveBeenLastCalledWithMatchingInlineSnapshot<
        U extends { [P in keyof T]: any }
      >(
        propertyMatchers: Partial<U>,
        snapshot?: string,
      ): R;
      toHaveBeenLastCalledWithMatchingInlineSnapshot(snapshot?: string): R;

      toHaveLastReturnedWithMatchingInlineSnapshot<
        U extends { [P in keyof T]: any }
      >(
        propertyMatchers: Partial<U>,
        snapshot?: string,
      ): R;
      toHaveLastReturnedWithMatchingInlineSnapshot(snapshot?: string): R;
    }
  }
}

export function setupMockFunctionMatchers() {
  expect.extend({
    toHaveBeenLastCalledWithMatchingInlineSnapshot(
      received: unknown,
      ...args: any[]
    ) {
      const calls = (received as jest.Mock)?.mock?.calls;
      const lastCall = calls?.[calls?.length - 1];

      return toMatchInlineSnapshot.call(this as any, lastCall, ...args);
    },

    toHaveLastReturnedWithMatchingInlineSnapshot(
      received: unknown,
      ...args: any[]
    ) {
      const results = (received as jest.Mock)?.mock?.results;
      const lastResult = results?.[results?.length - 1]?.value;

      return toMatchInlineSnapshot.call(this as any, lastResult, ...args);
    },
  });
}
