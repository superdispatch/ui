export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.valueOf());
}

export function normalizeDateRange(range: [Date?, Date?] = []): [Date?, Date?] {
  return range.filter(isValidDate).sort((a, b) => a.valueOf() - b.valueOf()) as [Date?, Date?];
}

export function formatDate(date: unknown): string {
  if (!isValidDate(date)) {
    return '';
  }

  try {
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch (e) {
    return date.toLocaleDateString();
  }
}
