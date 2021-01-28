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
    (props) =>
      useDeepEqualMemo<{ a: number; b: number; i: number }>(
        (prevValue) => ({
          a: props.a,
          b: props.b,
          i: prevValue == null ? 0 : prevValue.a + prevValue.b,
        }),
        [props],
      ),
    { initialProps: props1 },
  );

  const { current: result1 } = result;
  expect(result1).toEqual({ a: 1, b: 2, i: 0 });

  rerender(props2);

  const { current: result2 } = result;
  expect(result2).toEqual({ a: 1, b: 2, i: 3 });

  rerender(props2);

  const { current: result3 } = result;
  expect(result2).toBe(result3);

  rerender(props3);

  const { current: result4 } = result;
  expect(result4).toEqual({ a: 1, b: 3, i: 3 });
});
