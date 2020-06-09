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
export type DateDurationUnit = DateUnit | 'quarter' | 'week';

export type DateObject = Record<DateUnit, number>;

export type NullableDate = null | undefined | Date;
export type DateLike = number | Date;
export type NullableDateLike = null | undefined | DateLike;
export type DateRange = [Date?, Date?];
export type DateRangeLike = [DateLike?, DateLike?];
export type NullableDateRange =
  | null
  | undefined
  | [NullableDate?, NullableDate?];

export type NullableDateRangeLike =
  | null
  | undefined
  | [NullableDateLike?, NullableDateLike?];

export interface DateUtilsOptions {
  locale?: string;
  timeZoneOffset?: number;
}

const defaultDateUtilsOptions: Required<DateUtilsOptions> = {
  locale: 'en-US',
  timeZoneOffset: 0,
};

const formats: Record<DateFormat, string> = {
  DateISO: '_',
  DateTimeISO: '_',
  JodaISO: "yyyy-MM-dd'T'HH:mm:ss.SSSZZZ",
};

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

function checkRange(
  range: unknown,
  validator: (value: unknown) => boolean,
): boolean {
  if (!Array.isArray(range) || range.length > 2) {
    return false;
  }

  const [start, finish] = range as unknown[];

  return (
    (start == null || validator(start)) && (finish == null || validator(finish))
  );
}

export function isDateRange(range: unknown): range is DateRange {
  return checkRange(range, isDate);
}

export function isDateRangeLike(range: unknown): range is DateRangeLike {
  return checkRange(range, isDateLike);
}

export function isValidDateRange(range: unknown): range is DateRange {
  return checkRange(range, isValidDate);
}

export function toDate(value: NullableDateLike): Date {
  return !isDateLike(value) ? new Date(NaN) : new Date(value);
}

export function toDateRange(range: NullableDateRangeLike): DateRange {
  if (range == null || !isDateRangeLike(range)) {
    return [];
  }

  return range
    .filter((x) => x != null)
    .map((x) => (x == null ? undefined : toDate(x)))
    .sort((a, b) =>
      !isValidDate(a) ? -1 : !isValidDate(b) ? 1 : a.valueOf() - b.valueOf(),
    ) as DateRange;
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

export type DateFormatVariant = 'date' | 'shortDate' | 'time' | 'dateTime';
export type DateFormatOptions = Omit<
  Intl.DateTimeFormatOptions,
  'timeZone' | 'timeZoneName'
>;

export type RelativeTimeFormatStyle = 'narrow' | 'short' | 'long';
export interface RelativeTimeFormatOptions {
  style?: RelativeTimeFormatStyle;
}

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
    year = 0,
    month = 1,
    day = 1,
    hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0,
  }: Partial<DateObject>): Date {
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
    return this.toDateTime(value).set(values).toJSDate();
  }

  mergeDateAndTime(date: DateLike, time: DateLike): Date {
    const { hour, minute, second, millisecond } = this.toObject(time);

    if (
      Number.isNaN(hour) ||
      Number.isNaN(minute) ||
      Number.isNaN(second) ||
      Number.isNaN(millisecond)
    ) {
      return new Date(NaN);
    }

    return this.update(date, { hour, minute, second, millisecond });
  }

  startOf(value: DateLike, unit: DateDurationUnit): Date {
    return this.toDateTime(value).startOf(unit).toJSDate();
  }

  endOf(value: DateLike, unit: DateDurationUnit): Date {
    return this.toDateTime(value).endOf(unit).toJSDate();
  }

  plus(value: DateLike, values: Partial<DateObject>): Date {
    return this.toDateTime(value).plus(values).toJSDate();
  }

  minus(value: DateLike, values: Partial<DateObject>): Date {
    return this.toDateTime(value).minus(values).toJSDate();
  }

  isSameDate(
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

    const dateTimeValue = this.toDateTime(value);
    const dateTimeCompare = this.toDateTime(compare);

    return (
      dateTimeValue.isValid &&
      dateTimeCompare.isValid &&
      dateTimeValue.startOf(unit).equals(dateTimeCompare.startOf(unit))
    );
  }

  isSameDateRange(
    value: NullableDateRangeLike,
    compare: NullableDateRangeLike,
    unit?: DateUnit,
  ) {
    const range1 = toDateRange(value);
    const range2 = toDateRange(compare);

    return !range1.some(
      (date, idx) => !this.isSameDate(date, range2[idx], unit),
    );
  }

  diff(value: DateLike, compare: DateLike, unit: DateUnit): number {
    const valueDateTime = this.toDateTime(value);
    const compareDateTime = this.toDateTime(compare);

    return valueDateTime.diff(compareDateTime, unit).as(unit);
  }

  toLocaleString(value: DateLike, options?: DateFormatOptions) {
    return this.toDateTime(value).toLocaleString({
      ...options,
      locale: this.options.locale,
    });
  }

  format(value: DateLike, variant: DateFormatVariant): string {
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

  formatRange(value: NullableDateRangeLike, emptyText = ''): string {
    const range = toDateRange(value);

    if (!isValidDateRange(range)) {
      return 'Invalid Date Range';
    }

    const [start, finish] = range;

    if (!start) {
      return emptyText;
    }

    const startText = this.format(
      start,
      !this.isSameDate(start, finish, 'year') ? 'date' : 'shortDate',
    );

    const finishText = !finish ? '…' : this.format(finish, 'date');

    return `${startText} - ${finishText}`;
  }

  formatRelativeTime(
    value: DateLike,
    compare: DateLike,
    { style = 'long' }: RelativeTimeFormatOptions = {},
  ): string {
    const valueDateTime = this.toDateTime(value);
    const compareDateTime = this.toDateTime(compare);

    return valueDateTime.toRelative({
      style,
      locale: this.locale,
      base: compareDateTime,
    }) as string;
  }
}
