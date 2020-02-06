import { usePureMemo } from 'utility-hooks';

import { useDateUtils } from '../DateContext';
import { DateUnit, NullableDateLike, toDate } from '../DateUtils';

export function useDate(
  value: NullableDateLike,
  datePrecision?: DateUnit,
): Date {
  const utils = useDateUtils();

  return usePureMemo(
    () => toDate(value),
    [value],
    (a, b) => utils.isSameDate(a, b, datePrecision),
  );
}
