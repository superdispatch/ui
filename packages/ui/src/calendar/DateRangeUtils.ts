import { formatDate, isSameDate, isValidDate } from './DateUtils';

export type DateRangeUtils = [Date?, Date?];

export function normalizeDateRange(
  range: undefined | DateRangeUtils = [],
): DateRangeUtils {
  return range
    .filter(isValidDate)
    .sort((a, b) => a.valueOf() - b.valueOf()) as DateRangeUtils;
}

export function isSameDateRange(
  a: undefined | DateRangeUtils,
  b: undefined | DateRangeUtils,
): boolean {
  const [fromA, toA] = normalizeDateRange(a);
  const [fromB, toB] = normalizeDateRange(b);

  return isSameDate(fromA, fromB) && isSameDate(toA, toB);
}

export function formatDateRange(range?: DateRangeUtils): string {
  const [from, to] = normalizeDateRange(range);
  const fromText = formatDate(
    from,
    from?.getFullYear() !== to?.getFullYear() ? undefined : { year: undefined },
  );

  const toText = formatDate(to);

  return !fromText ? '' : `${fromText} - ${toText || '…'}`;
}
