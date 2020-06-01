import { toMatchInlineSnapshot } from 'jest-snapshot';

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toHaveBeenLastCalledWithMatchingInlineSnapshot(snapshot?: string): R;

      toHaveLastReturnedWithMatchingInlineSnapshot(
        propertyMatchers: T extends (...args: any[]) => any
          ? Partial<{ [P in keyof ReturnType<T>]: any }>
          : any,
        snapshot?: string,
      ): R;
      toHaveLastReturnedWithMatchingInlineSnapshot(snapshot?: string): R;
    }
  }
}

expect.extend({
  toHaveBeenLastCalledWithMatchingInlineSnapshot(received: unknown, ...args) {
    const calls = (received as jest.Mock)?.mock?.calls;
    const lastCall = calls?.[calls?.length - 1] as unknown;

    return toMatchInlineSnapshot.call(this as any, lastCall, ...args);
  },

  toHaveLastReturnedWithMatchingInlineSnapshot(received: unknown, ...args) {
    const results = (received as jest.Mock)?.mock?.results;
    const lastResult = results?.[results?.length - 1]?.value as unknown;

    return toMatchInlineSnapshot.call(this as any, lastResult, ...args);
  },
});
