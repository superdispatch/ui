import { renderHook } from '@testing-library/react-hooks';
import { useValueObserver } from './useValueObserver';

test('basic', () => {
  const observer = jest.fn();

  const { rerender } = renderHook(
    ({ value }) => {
      useValueObserver(value, observer);
    },
    { initialProps: { value: 'foo' } },
  );

  expect(observer).toHaveBeenCalledTimes(0);

  rerender({ value: 'bar' });

  expect(observer).toHaveBeenCalledTimes(1);
  expect(observer).toHaveBeenLastCalledWith('foo');

  rerender({ value: 'bar' });

  expect(observer).toHaveBeenCalledTimes(1);

  rerender({ value: 'baz' });

  expect(observer).toHaveBeenCalledTimes(2);
  expect(observer).toHaveBeenLastCalledWith('bar');
});
