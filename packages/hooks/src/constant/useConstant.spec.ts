import { renderHook } from '@testing-library/react-hooks';
import { useConstant } from './useConstant';

test('basic', () => {
  const factory1 = jest.fn(() => Math.random().toString());
  const factory2 = jest.fn(() => Math.random().toString().slice(2));
  const factory3 = jest.fn(() => Math.random().toString().slice(2, 6));

  const { result, rerender } = renderHook(
    ({ factory }) => useConstant(factory),
    { initialProps: { factory: factory1 } },
  );

  expect(factory1).toHaveBeenCalledTimes(1);
  expect(factory1).toHaveLastReturnedWith(result.current);

  rerender();
  rerender({ factory: factory2 });
  rerender({ factory: factory3 });
  rerender({ factory: factory1 });

  expect(factory1).toHaveBeenCalledTimes(1);
  expect(factory2).not.toHaveBeenCalled();
  expect(factory3).not.toHaveBeenCalled();
});

test.each([0, NaN, null, false, undefined])(
  'useConstant(() => %p)',
  (value) => {
    const factory = jest.fn(() => value);
    const { result, rerender } = renderHook(() => useConstant(factory));

    expect(factory).toHaveBeenCalledTimes(1);
    expect(result.current).toBe(value);

    rerender();

    expect(factory).toHaveBeenCalledTimes(1);
    expect(result.current).toBe(value);
  },
);
