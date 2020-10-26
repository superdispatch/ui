import { DateTime } from 'luxon';
import { useMemo } from 'react';

import { DateConfig, useDateConfig } from '../date-config/DateConfig';
import {
  NullableDateInput,
  parseDate,
  toPrimitiveDateInput,
} from '../date-time-utils/DateTimeUtils';

export function useDateTime(
  input: NullableDateInput,
  options?: Partial<DateConfig>,
): DateTime {
  const config = useDateConfig(options);
  const primitiveInput = toPrimitiveDateInput(input);

  return useMemo(() => {
    const date = parseDate(primitiveInput, config);

    if (process.env.NODE_ENV !== 'production') {
      if (!date.isValid && typeof primitiveInput === 'string') {
        // eslint-disable-next-line no-console
        console.error(
          `[useDateTime] Failed to parse "${primitiveInput}" string with "${config.format}" format.`,
        );
      }
    }

    return date;
  }, [config, primitiveInput]);
}
