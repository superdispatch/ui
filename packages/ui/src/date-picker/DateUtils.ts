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

export function normalizeDateRange(range: undefined | [Date?, Date?] = []): [Date?, Date?] {
  return range.filter(isValidDate).sort((a, b) => a.valueOf() - b.valueOf()) as [Date?, Date?];
}

export function isSameDateRange(
  a: undefined | [Date?, Date?],
  b: undefined | [Date?, Date?],
): boolean {
  const [fromA, toA] = normalizeDateRange(a);
  const [fromB, toB] = normalizeDateRange(b);

  return isSameDate(fromA, fromB) && isSameDate(toA, toB);
}

export function formatDateRange(range?: [Date?, Date?]): string {
  const [from, to] = normalizeDateRange(range);
  const fromText = formatDate(
    from,
    from?.getFullYear() !== to?.getFullYear() ? undefined : { year: undefined },
  );

  const toText = formatDate(to);

  return !fromText ? '' : `${fromText} - ${toText || '…'}`;
}
