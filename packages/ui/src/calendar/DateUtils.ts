export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.valueOf());
}

export function isSameDate(a?: Date, b?: Date): boolean {
  return (
    isValidDate(a) &&
    isValidDate(b) &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatDate(
  date: unknown,
  options?: Pick<Intl.DateTimeFormatOptions, 'year'>,
): string {
  if (!isValidDate(date)) {
    return '';
  }

  try {
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      ...options,
    }).format(date);
  } catch (e) {
    return date.toLocaleDateString();
  }
}

// TODO: Change to `[Date?, Date?]` after resolve of https://github.com/Swatinem/rollup-plugin-dts/issues/69
export type DateRange = [undefined | Date, undefined | Date];

export function normalizeDateRange(
  range: undefined | DateRange = [undefined, undefined],
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

export function isFirstDayOfMonth(date: Date): boolean {
  return date.getDate() === 1;
}

export function isLastDayOfMonth(date: Date): boolean {
  return (
    date.getMonth() <
    new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getMonth()
  );
}
