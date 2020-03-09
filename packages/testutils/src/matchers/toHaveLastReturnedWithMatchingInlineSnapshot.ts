import { toMatchInlineSnapshot } from 'jest-snapshot';

declare global {
  namespace jest {
    interface Matchers<R, T = {}> {
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

expect.extend({
  toHaveLastReturnedWithMatchingInlineSnapshot(
    received: unknown,
    ...args: any[]
  ) {
    const results = (received as jest.Mock)?.mock?.results;
    const lastResult = results?.[results?.length - 1]?.value;

    return toMatchInlineSnapshot.call(this as any, lastResult, ...args);
  },
});
