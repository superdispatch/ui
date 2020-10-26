import { mockDate, resetMockDate } from '@superdispatch/ui-testutils';
import { renderHook } from '@testing-library/react-hooks';

import { DateConfig } from '../date-config/DateConfig';
import {
  DateTimeRange,
  NullableDateRangeInput,
} from '../date-time-utils/DateTimeUtils';
import { useDateTimeRange } from './useDateTimeRange';

interface Props {
  input: NullableDateRangeInput;
  options?: Partial<DateConfig>;
}

beforeEach(() => {
  mockDate();
});

afterEach(() => {
  resetMockDate();
});

test('basic', () => {
  const { result } = renderHook<Props, DateTimeRange>(
    ({ input, options }) => useDateTimeRange(input, options),
    { initialProps: { input: ['2020-05-24'] } },
  );

  expect(result.current[0]?.toISO()).toBe('2020-05-24T00:00:00.000-05:00');
  expect(result.current[1]).toBeUndefined();
});

test('warnings', () => {
  const error = jest.spyOn(console, 'error').mockImplementation();

  const { result } = renderHook<Props, DateTimeRange>(
    ({ input, options }) => useDateTimeRange(input, options),
    {
      initialProps: {
        input: [null, '2020-05-24'],
        options: { format: 'JodaISO' },
      },
    },
  );

  expect(result.current).toEqual([undefined, undefined]);
  expect(error).toHaveBeenCalledTimes(1);
  expect(error).toHaveBeenLastCalledWith(
    '[useDateTime] Failed to parse "2020-05-24" string with "JodaISO" format.',
  );

  error.mockClear();
});
