import { renderHook } from '@testing-library/react-hooks';

import { useDeepEqualDeps } from './useDeepEqualDeps';

test('basic', () => {
  const deps1 = [new Date(0)];
  const deps2 = [new Date(0)];
  const deps3 = [new Date(10)];

  const { result, rerender } = renderHook(
    ({ deps }) => useDeepEqualDeps(deps),
    { initialProps: { deps: deps1 } },
  );

  expect(result.current).toBe(deps1);

  rerender({ deps: deps2 });

  expect(result.current).toBe(deps1);
  expect(result.current).not.toBe(deps2);

  rerender({ deps: deps3 });

  expect(result.current).toBe(deps3);
});

test('warning', () => {
  const consoleError = jest.spyOn(console, 'error').mockImplementation();

  const { rerender } = renderHook(({ deps }) => useDeepEqualDeps(deps), {
    initialProps: { deps: [] as number[] },
  });

  expect(consoleError).toHaveBeenCalledTimes(1);
  expect(consoleError).toHaveBeenLastCalledWith(
    '[useDeepEqualDeps] "deps" argument should not be empty.',
  );

  rerender({ deps: [1] });

  expect(consoleError).toHaveBeenCalledTimes(2);
  expect(consoleError).toHaveBeenLastCalledWith(
    '[useDeepEqualDeps] size of the "deps" argument has changed between renders. The order and size of this array must remain constant.',
  );

  consoleError.mockReset();
});
