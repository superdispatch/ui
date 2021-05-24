import { useMemo } from 'react';
import { DateConfig, useDateConfig } from '../date-config/DateConfig';
import {
  DateTimeRange,
  NullableDateRangeInput,
  parseDateRange,
  toPrimitiveDateRangeInput,
} from '../date-time-utils/DateTimeUtils';
import { useDateTime } from '../use-date-time/useDateTime';

export function useDateTimeRange(
  input: NullableDateRangeInput,
  options?: Partial<DateConfig>,
): DateTimeRange {
  const config = useDateConfig(options);
  const [startInput, finishInput] = toPrimitiveDateRangeInput(input);
  const startDate = useDateTime(startInput, config);
  const finishDate = useDateTime(finishInput, config);

  return useMemo(
    () => parseDateRange([startDate, finishDate], config),
    [config, startDate, finishDate],
  );
}
