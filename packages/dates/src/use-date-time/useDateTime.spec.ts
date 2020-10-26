import { mockDate, resetMockDate } from '@superdispatch/ui-testutils';
import { renderHook } from '@testing-library/react-hooks';
import { DateTime } from 'luxon';

import { DateConfig } from '../date-config/DateConfig';
import { NullableDateInput } from '../date-time-utils/DateTimeUtils';
import { useDateTime } from './useDateTime';

interface Props {
  input: NullableDateInput;
  options?: Partial<DateConfig>;
}

beforeEach(() => {
  mockDate();
});

afterEach(() => {
  resetMockDate();
});

test('basic', () => {
  const { result } = renderHook<Props, DateTime>(
    ({ input, options }) => useDateTime(input, options),
    { initialProps: { input: '2020-05-24' } },
  );

  expect(result.current.toISO()).toBe('2020-05-24T00:00:00.000-05:00');
});

test('warnings', () => {
  const error = jest.spyOn(console, 'error').mockImplementation();

  const { result } = renderHook<Props, DateTime>(
    ({ input, options }) => useDateTime(input, options),
    { initialProps: { input: '2020-05-24', options: { format: 'JodaISO' } } },
  );

  expect(result.current.toISO()).toBeNull();
  expect(error).toHaveBeenCalledTimes(1);
  expect(error).toHaveBeenLastCalledWith(
    '[useDateTime] Failed to parse "2020-05-24" string with "JodaISO" format.',
  );

  error.mockClear();
});
