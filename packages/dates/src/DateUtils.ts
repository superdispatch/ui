import { DateTime } from 'luxon';

export type DateLike = number | Date;
export type NullableDateLike = null | undefined | DateLike;
export type DateUnit =
  | 'year'
  | 'month'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond';

export type DateRange = [Date?, Date?];
export type DateRangeLike = [DateLike?, DateLike?];
export type NullableDateRangeLike = null | undefined | DateRangeLike;

function toDateTime(
  value: string | DateLike,
  { timeZoneOffset }: { timeZoneOffset?: number } = {},
): DateTime {
  let dateTime =
    typeof value === 'string'
      ? DateTime.fromISO(value, { zone: 'UTC' })
      : typeof value === 'number'
      ? DateTime.fromMillis(value)
      : DateTime.fromJSDate(value);

  return dateTime.toUTC(timeZoneOffset);
}

//
// Validations
//

export function isDate(value: unknown): value is Date {
  return value != null && value instanceof Date;
}

export function isDateLike(value: unknown): value is DateLike {
  return (
    isDate(value) || (typeof value === 'number' && Number.isInteger(value))
  );
}

export function isValidDate(value: unknown): value is Date {
  return isDate(value) && Number.isFinite(value.getTime());
}

//
// Transformations
//

export function toDate(value: NullableDateLike): Date {
  return !isDateLike(value) ? new Date(NaN) : new Date(value);
}

//
// Manipulations
//

export function setStartOfDate(
  value: DateLike,
  unit: DateUnit,
  timeZoneOffset?: number,
): Date {
  return toDateTime(value, { timeZoneOffset })
    .startOf(unit)
    .toJSDate();
}

export function setEndOfDate(
  value: DateLike,
  unit: DateUnit,
  timeZoneOffset?: number,
): Date {
  return toDateTime(value, { timeZoneOffset })
    .endOf(unit)
    .toJSDate();
}

//
// Formatting
//

export type DateFormat = 'DateISO' | 'DateTimeISO' | 'JodaISO';

const formats: Record<DateFormat, string> = {
  DateISO: 'yyyy-MM-dd',
  JodaISO: "yyyy-MM-dd'T'HH:mm:ss.SSSZZZ",
  DateTimeISO: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
};

export function parseDate(value: unknown, format: DateFormat): Date {
  if (isDateLike(value)) {
    return toDate(value);
  }

  if (typeof value === 'string') {
    if (format === 'DateISO' || format === 'DateTimeISO') {
      return DateTime.fromISO(value, { zone: 'UTC' }).toJSDate();
    }

    if (format === 'JodaISO') {
      return DateTime.fromFormat(value, formats.JodaISO).toJSDate();
    }
  }

  return new Date(NaN);
}

export function stringifyDate(value: DateLike, format: DateFormat): string {
  const dateTime = toDateTime(value);

  if (!dateTime.isValid) {
    return 'Invalid Date';
  }

  if (format === 'DateTimeISO') {
    return dateTime.toISO();
  }

  return dateTime.toFormat(formats[format]);
}

export function formatDate(
  value: DateLike,
  { timeZoneOffset, ...options }: FormatDateOptions = {},
): string {
  return toDateTime(value, { timeZoneOffset }).toLocaleString({
    locale: 'en-US',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...options,
  });
}

export function formatDateTime(
  value: DateLike,
  options?: FormatDateOptions,
): string {
  return formatDate(value, { hour: 'numeric', minute: 'numeric', ...options });
}

export function formatRelativeTime(value: DateLike, compare: DateLike): string {
  return toDateTime(value).toRelative({
    locale: 'en-US',
    base: toDateTime(compare),
  }) as string;
}

export function isSameDate(
  value: NullableDateLike,
  compare: NullableDateLike,
  unit: DateUnit = 'millisecond',
): boolean {
  if (value == null && compare == null) {
    return true;
  }

  if (value == null || compare == null) {
    return false;
  }

  return toDateTime(value)
    .startOf(unit)
    .equals(toDateTime(compare).startOf(unit));
}

//
// Date Ranges
//

export function toDateRange(range: NullableDateRangeLike): DateRange {
  if (range == null || !Array.isArray(range)) {
    return [];
  }

  const [start, end] = range
    .filter(isDateLike)
    .map(toDate)
    .sort((a, b) => a.getTime() - b.getTime());

  return [start, end];
}

export function isSameDateRange(
  value: NullableDateRangeLike,
  compare: NullableDateRangeLike,
  unit?: DateUnit,
) {
  const range1 = toDateRange(value);
  const range2 = toDateRange(compare);

  return !range1.some((date, idx) => isSameDate(date, range2[idx], unit));
}

export function formatDateRange(range?: DateRange): string {
  const [from, to] = toDateRange(range);

  if (!from) {
    return '';
  }

  const fromText = !isSameDate(from, to, 'year')
    ? formatDate(from)
    : formatDate(from, { year: undefined });

  const toText = !to ? '…' : formatDate(to);

  return `${fromText} - ${toText}`;
}

export interface DateUtilsOptions {
  timeZoneOffset?: number;
}

export interface FormatDateOptions
  extends DateUtilsOptions,
    Omit<Intl.DateTimeFormatOptions, 'timeZone' | 'timeZoneName'> {}

export class DateUtils {
  protected options: DateUtilsOptions;

  constructor(options: DateUtilsOptions = {}) {
    this.options = options;
  }
}
