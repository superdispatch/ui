import { formatDate, isSameDate, isValidDate } from './DateUtils';

export type DateRange = [Date?, Date?];

export function normalizeDateRange(
  range: undefined | DateRange = [],
): DateRange {
  return range
    .filter(isValidDate)
    .sort((a, b) => a.valueOf() - b.valueOf()) as DateRange;
}

export function isSameDateRange(
  a: undefined | DateRange,
  b: undefined | DateRange,
): boolean {
  const [fromA, toA] = normalizeDateRange(a);
  const [fromB, toB] = normalizeDateRange(b);

  return isSameDate(fromA, fromB) && isSameDate(toA, toB);
}

export function formatDateRange(range?: DateRange): string {
  const [from, to] = normalizeDateRange(range);
  const fromText = formatDate(
    from,
    from?.getFullYear() !== to?.getFullYear() ? undefined : { year: undefined },
  );

  const toText = formatDate(to);

  return !fromText ? '' : `${fromText} - ${toText || '…'}`;
}
