import { renderHook } from '@testing-library/react-hooks';
import { noop } from 'lodash';

import { useEventHandler } from './useEventHandler';

test('basic', () => {
  const handler1 = jest.fn();
  const handler2 = jest.fn();
  const handler3 = jest.fn();

  const { result, rerender } = renderHook(
    ({ handler }) => useEventHandler(handler),
    { initialProps: { handler: handler1 } },
  );

  const { current: proxy } = result;

  expect(handler1).not.toHaveBeenCalled();
  expect(handler2).not.toHaveBeenCalled();
  expect(handler3).not.toHaveBeenCalled();

  proxy(123);

  expect(handler1).toHaveBeenCalledTimes(1);
  expect(handler1).toHaveBeenLastCalledWith(123);
  expect(handler2).not.toHaveBeenCalled();
  expect(handler3).not.toHaveBeenCalled();

  rerender({ handler: handler2 });

  expect(result.current).toBe(proxy);

  expect(handler1).toHaveBeenCalledTimes(1);
  expect(handler2).not.toHaveBeenCalled();
  expect(handler3).not.toHaveBeenCalled();

  proxy(234);

  expect(handler1).toHaveBeenCalledTimes(1);
  expect(handler2).toHaveBeenCalledTimes(1);
  expect(handler2).toHaveBeenLastCalledWith(234);
  expect(handler3).not.toHaveBeenCalled();

  rerender({ handler: handler3 });

  expect(result.current).toBe(proxy);

  expect(handler1).toHaveBeenCalledTimes(1);
  expect(handler2).toHaveBeenCalledTimes(1);
  expect(handler3).not.toHaveBeenCalled();

  proxy(345);

  expect(handler1).toHaveBeenCalledTimes(1);
  expect(handler2).toHaveBeenCalledTimes(1);
  expect(handler3).toHaveBeenCalledTimes(1);
  expect(handler3).toHaveBeenLastCalledWith(345);
});

test('warning', () => {
  const consoleError = jest.spyOn(console, 'error').mockImplementation();

  renderHook(() => {
    const handler = useEventHandler(noop);

    handler(null);
  });

  expect(consoleError).toHaveBeenCalledTimes(1);
  expect(consoleError).toHaveBeenLastCalledWith(
    '[useEventHandler]: "handler" was called during the render. This can lead to stale closure problems.',
  );

  consoleError.mockReset();
});
