import { renderHook } from '@testing-library/react-hooks';

import { useDeepEqualMemo } from './useDeepEqualMemo';

test('basic', () => {
  interface Props {
    a: number;
    b: number;
    c?: number;
  }

  const props1: Props = { a: 1, b: 2, c: 3 };
  const props2: Props = { a: 1, b: 2 };
  const props3: Props = { a: 1, b: 3 };

  const { result, rerender } = renderHook(
    (props) => useDeepEqualMemo(() => ({ a: props.a, b: props.b }), [props]),
    { initialProps: props1 },
  );

  const result1 = result.current;

  expect(result.current).toEqual({ a: 1, b: 2 });

  rerender(props2);

  expect(result.current).toBe(result1);

  rerender(props2);

  expect(result.current).toBe(result1);

  rerender(props2);

  expect(result.current).toBe(result1);

  rerender(props3);

  expect(result.current).toEqual({ a: 1, b: 3 });
});
