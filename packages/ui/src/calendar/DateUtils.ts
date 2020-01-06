export function isValidDate(value: unknown): value is Date {
  return value != null && value instanceof Date && !isNaN(value.valueOf());
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
  } catch {
    return date.toLocaleDateString();
  }
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
