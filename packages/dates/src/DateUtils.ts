import dayjs from 'dayjs';
import dayjsCustomParseFormatPlugin from 'dayjs/plugin/customParseFormat';
import dayjsIsBetweenPlugin from 'dayjs/plugin/isBetween';
import dayjsPluginRelativeTime from 'dayjs/plugin/relativeTime';
import dayjsUtcPlugin from 'dayjs/plugin/utc';

// This plugin is needed by formatRelativeTimeToNow and formatRelativeTime.
dayjs.extend(dayjsPluginRelativeTime);

dayjs.extend(dayjsIsBetweenPlugin);
dayjs.extend(dayjsCustomParseFormatPlugin);
dayjs.extend(dayjsUtcPlugin);

export type DateLike = number | Date;
export type DateFormat = 'DateISO' | 'DateTimeISO' | 'JodaISO';
export type DateUnit =
  | 'year'
  | 'month'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond';

const formats: Record<DateFormat, string> = {
  DateISO: 'YYYY-MM-DD',
  JodaISO: 'YYYY-MM-DDTHH:mm:ss.SSSZZ',
  DateTimeISO: 'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
};

export function isDate(value: unknown): value is Date {
  return value != null && value instanceof Date;
}

export function isDateLike(value: unknown): value is DateLike {
  return (
    isDate(value) || (typeof value === 'number' && Number.isInteger(value))
  );
}

export function isValidDate(value: unknown): value is Date {
  return isDateLike(value) && dayjs(value).isValid();
}

export function toDate(value: DateLike): Date {
  return !isDateLike(value)
    ? new Date(NaN)
    : dayjs(value, { utc: true }).toDate();
}

export function isSameDate(
  value: null | undefined | DateLike,
  compare: null | undefined | DateLike,
  unit?: DateUnit,
): boolean {
  return value == null && compare == null
    ? true
    : value == null || compare == null
    ? false
    : dayjs(value).isSame(compare, unit);
}

export function tryParseDate(
  value: unknown,
  format: DateFormat,
): undefined | Date {
  if (!(format in formats)) {
    return undefined;
  }

  const date = isDateLike(value)
    ? toDate(value)
    : typeof value === 'string'
    ? dayjs(value, { utc: true, format: formats[format] }).toDate()
    : undefined;

  return isValidDate(date) ? date : undefined;
}

export function stringifyDate(value: DateLike, format: DateFormat): string {
  return dayjs(value, { utc: true }).format(formats[format]);
}

export function toDateStart(value: DateLike, unit: DateUnit): Date {
  return dayjs(value)
    .startOf(unit)
    .toDate();
}

export function toDateEnd(value: DateLike, unit: DateUnit): Date {
  return dayjs(value)
    .endOf(unit)
    .toDate();
}

export interface DateUtilsOptions {
  timeZoneOffset?: number;
}

export interface FormatDateOptions
  extends DateUtilsOptions,
    Omit<Intl.DateTimeFormatOptions, 'timeZone' | 'timeZoneName'> {}

export function formatDate(
  value: DateLike,
  { timeZoneOffset = 0, ...options }: FormatDateOptions = {},
): string {
  return toDate(value).toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...options,
  });
}

export function formatDateTime(
  value: DateLike,
  options: FormatDateOptions,
): string {
  return formatDate(value, { hour: 'numeric', minute: 'numeric', ...options });
}

export function formatRelativeTime(value: DateLike, compare: DateLike): string {
  return dayjs(value).from(compare);
}

export function formatRelativeTimeToNow(value: DateLike): string {
  return dayjs(value).fromNow();
}

export class DateUtils {
  protected options: DateUtilsOptions;

  constructor(options: DateUtilsOptions = {}) {
    this.options = options;
  }
}
