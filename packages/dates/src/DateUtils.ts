import { DateTime, FixedOffsetZone } from 'luxon';

export type DateFormat = 'DateISO' | 'DateTimeISO' | 'JodaISO';
export type DateUnit =
  | 'year'
  | 'month'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond';
export type DateObject = Record<DateUnit, number>;

export type NullableDate = null | undefined | Date;
export type DateLike = number | Date;
export type NullableDateLike = null | undefined | DateLike;
export type DateRange = [Date?, Date?];
export type DateRangeLike = [DateLike?, DateLike?];
export type NullableDateRangeLike = null | undefined | DateRangeLike;

export interface DateUtilsOptions {
  locale?: string;
  timeZoneOffset?: number;
}

const defaultDateUtilsOptions: Required<DateUtilsOptions> = {
  locale: 'en-US',
  timeZoneOffset: 0,
} as const;

const formats: Record<DateFormat, string> = {
  DateISO: '_',
  DateTimeISO: '_',
  JodaISO: "yyyy-MM-dd'T'HH:mm:ss.SSSZZZ",
} as const;

function toDateTime(
  value: DateLike,
  { timeZoneOffset }: Required<DateUtilsOptions> = defaultDateUtilsOptions,
): DateTime {
  const dateTime =
    typeof value === 'number'
      ? DateTime.fromMillis(value)
      : DateTime.fromJSDate(value);

  return dateTime.toUTC(timeZoneOffset);
}

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

export function toDate(value: NullableDateLike): Date {
  return !isDateLike(value) ? new Date(NaN) : new Date(value);
}

export function toDateRange(range: NullableDateRangeLike): DateRange {
  if (range == null || !Array.isArray(range)) {
    return [];
  }

  const [start, end] = range
    .filter(isDateLike)
    .slice(0, 2)
    .map(toDate)
    .sort((a, b) =>
      Number.isNaN(a.getTime())
        ? -1
        : Number.isNaN(b.getTime())
        ? 1
        : a.getTime() - b.getTime(),
    );

  return [start, end];
}

export function isSameDate(
  value: NullableDateLike,
  compare: NullableDateLike,
  unit: DateUnit = 'millisecond',
) {
  if (value == null && compare == null) {
    return true;
  }

  if (value == null || compare == null) {
    return false;
  }

  const startOfValue = toDateTime(value).startOf(unit);
  const startOfCompare = toDateTime(compare).startOf(unit);

  return startOfValue.equals(startOfCompare);
}

export function isSameDateRange(
  value: NullableDateRangeLike,
  compare: NullableDateRangeLike,
  unit?: DateUnit,
) {
  const range1 = toDateRange(value);
  const range2 = toDateRange(compare);

  return !range1.some((date, idx) => !isSameDate(date, range2[idx], unit));
}

export function parseDate(value: unknown, format: DateFormat): Date {
  if (Object.prototype.hasOwnProperty.call(formats, format)) {
    if (isDateLike(value)) {
      return toDate(value);
    }

    if (typeof value === 'string') {
      if (format === 'DateISO' || format === 'DateTimeISO') {
        return DateTime.fromISO(value, { zone: 'UTC' }).toJSDate();
      }

      return DateTime.fromFormat(value, formats[format]).toJSDate();
    }
  }

  return new Date(NaN);
}

export function stringifyDate(value: DateLike, format: DateFormat): string {
  const dateTime = toDateTime(value);

  if (!dateTime.isValid) {
    return 'Invalid Date';
  }

  if (format === 'DateISO') {
    return dateTime.toISODate();
  }

  if (format === 'DateTimeISO') {
    return dateTime.toISO();
  }

  return dateTime.toFormat(formats[format]);
}

export type FormatDateOptions = Omit<
  Intl.DateTimeFormatOptions,
  'timeZone' | 'timeZoneName'
>;

export class DateUtils {
  protected options: Required<DateUtilsOptions>;

  constructor({
    locale = defaultDateUtilsOptions.locale,
    timeZoneOffset = defaultDateUtilsOptions.timeZoneOffset,
  }: DateUtilsOptions = {}) {
    this.options = { locale, timeZoneOffset };
  }

  get locale() {
    return this.options.locale;
  }

  get timeZoneOffset() {
    return this.options.timeZoneOffset;
  }

  protected toDateTime(value: DateLike): DateTime {
    return toDateTime(value, this.options);
  }

  toObject(value: DateLike): DateObject {
    const {
      year = NaN,
      month = NaN,
      day = NaN,
      hour = NaN,
      minute = NaN,
      second = NaN,
      millisecond = NaN,
    } = this.toDateTime(value).toObject({
      includeConfig: false,
    });

    return { year, month, day, hour, minute, second, millisecond };
  }

  fromObject({
    year,
    month,
    day,
    hour,
    minute,
    second,
    millisecond,
  }: DateObject): Date {
    if (
      Number.isNaN(year) ||
      Number.isNaN(month) ||
      Number.isNaN(day) ||
      Number.isNaN(hour) ||
      Number.isNaN(minute) ||
      Number.isNaN(second) ||
      Number.isNaN(millisecond)
    ) {
      return new Date(NaN);
    }

    return DateTime.fromObject({
      year,
      month,
      day,
      hour,
      minute,
      second,
      millisecond,
      zone: FixedOffsetZone.instance(this.timeZoneOffset),
    }).toJSDate();
  }

  update(value: DateLike, values: Partial<DateObject>): Date {
    return this.toDateTime(value)
      .set(values)
      .toJSDate();
  }

  startOf(value: DateLike, unit: DateUnit): Date {
    return this.toDateTime(value)
      .startOf(unit)
      .toJSDate();
  }

  endOf(value: DateLike, unit: DateUnit): Date {
    return this.toDateTime(value)
      .endOf(unit)
      .toJSDate();
  }

  plus(value: DateLike, values: Partial<DateObject>): Date {
    return this.toDateTime(value)
      .plus(values)
      .toJSDate();
  }

  minus(value: DateLike, values: Partial<DateObject>): Date {
    return this.toDateTime(value)
      .minus(values)
      .toJSDate();
  }

  mergeTime(dateValue: DateLike, timeValue: DateLike): Date {
    const time = this.toDateTime(timeValue);

    return this.update(dateValue, {
      hour: time.hour,
      minute: time.minute,
      second: time.second,
      millisecond: time.millisecond,
    });
  }

  toLocaleString(value: DateLike, options?: FormatDateOptions) {
    return this.toDateTime(value).toLocaleString({
      ...options,
      locale: this.options.locale,
    });
  }

  format(
    value: DateLike,
    variant: 'date' | 'shortDate' | 'time' | 'dateTime',
  ): string {
    return this.toLocaleString(
      value,
      variant === 'date'
        ? { day: '2-digit', month: 'short', year: 'numeric' }
        : variant === 'shortDate'
        ? { day: '2-digit', month: 'short' }
        : variant === 'time'
        ? { hour: 'numeric', minute: 'numeric' }
        : {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          },
    );
  }

  formatRange(range: DateRangeLike): string {
    const [from, to] = toDateRange(range);

    if (!from) {
      return '';
    }

    if (!isValidDate(from) || (isDate(to) && !isValidDate(to))) {
      return 'Invalid Date Range';
    }

    const fromText = this.format(
      from,
      !isSameDate(from, to, 'year') ? 'date' : 'shortDate',
    );

    const toText = !to ? '…' : this.format(to, 'date');

    return `${fromText} - ${toText}`;
  }

  formatRelativeTime(value: DateLike, compare: DateLike): string {
    const valueDateTime = this.toDateTime(value);
    const compareDateTime = this.toDateTime(compare);

    return valueDateTime.toRelative({
      locale: this.locale,
      base: compareDateTime,
    }) as string;
  }
}
