import { DateTime } from 'luxon';
import { useMemo } from 'react';

/** @deprecated */
export type DateUnit =
  | 'year'
  | 'month'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond';
/** @deprecated */
export type DateDurationUnit = DateUnit | 'quarter' | 'week';

/** @deprecated */
export type DateObject = Record<DateUnit, number>;

/** @deprecated */
export type NullableDate = null | undefined | Date;
/** @deprecated */
export type DateLike = number | Date;
/** @deprecated */
export type NullableDateLike = null | undefined | DateLike;
/** @deprecated */
export type DateRange = [Date?, Date?];
/** @deprecated */
export type DateRangeLike = [DateLike?, DateLike?];
/** @deprecated */
export type NullableDateRange =
  | null
  | undefined
  | [NullableDate?, NullableDate?];

/** @deprecated */
export type NullableDateRangeLike =
  | null
  | undefined
  | [NullableDateLike?, NullableDateLike?];

/** @deprecated */
function toDateTime(value: DateLike): DateTime {
  return typeof value === 'number'
    ? DateTime.fromMillis(value)
    : DateTime.fromJSDate(value);
}

/** @deprecated */
export function isDate(value: unknown): value is Date {
  return value != null && value instanceof Date;
}

/** @deprecated */
export function isDateLike(value: unknown): value is DateLike {
  return (
    isDate(value) || (typeof value === 'number' && Number.isInteger(value))
  );
}

/** @deprecated */
export function isValidDate(value: unknown): value is Date {
  return isDate(value) && Number.isFinite(value.getTime());
}

/** @deprecated */
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

/** @deprecated */
export function isDateRange(range: unknown): range is DateRange {
  return checkRange(range, isDate);
}

/** @deprecated */
export function isDateRangeLike(range: unknown): range is DateRangeLike {
  return checkRange(range, isDateLike);
}

/** @deprecated */
export function isValidDateRange(range: unknown): range is DateRange {
  return checkRange(range, isValidDate);
}

/** @deprecated */
export function toDate(value: NullableDateLike): Date {
  return !isDateLike(value) ? new Date(NaN) : new Date(value);
}

/** @deprecated */
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

/** @deprecated */
export type DateFormatVariant = 'date' | 'shortDate' | 'time' | 'dateTime';
/** @deprecated */
export type DateFormatOptions = Omit<
  Intl.DateTimeFormatOptions,
  'timeZone' | 'timeZoneName'
>;

/** @deprecated */
export type RelativeTimeFormatStyle = 'narrow' | 'short' | 'long';
/** @deprecated */
export interface RelativeTimeFormatOptions {
  style?: RelativeTimeFormatStyle;
  compare?: DateLike;
}

/** @deprecated */
export class DateUtils {
  /** @deprecated */
  toObject(value: DateLike): DateObject {
    const {
      year = NaN,
      month = NaN,
      day = NaN,
      hour = NaN,
      minute = NaN,
      second = NaN,
      millisecond = NaN,
    } = toDateTime(value).toObject({
      includeConfig: false,
    });

    return { year, month, day, hour, minute, second, millisecond };
  }

  /** @deprecated */
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
    }).toJSDate();
  }

  /** @deprecated */
  update(value: DateLike, values: Partial<DateObject>): Date {
    return toDateTime(value).set(values).toJSDate();
  }

  /** @deprecated */
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

  /** @deprecated */
  startOf(value: DateLike, unit: DateDurationUnit): Date {
    return toDateTime(value).startOf(unit).toJSDate();
  }

  /** @deprecated */
  endOf(value: DateLike, unit: DateDurationUnit): Date {
    return toDateTime(value).endOf(unit).toJSDate();
  }

  /** @deprecated */
  plus(value: DateLike, values: Partial<DateObject>): Date {
    return toDateTime(value).plus(values).toJSDate();
  }

  /** @deprecated */
  minus(value: DateLike, values: Partial<DateObject>): Date {
    return toDateTime(value).minus(values).toJSDate();
  }

  /** @deprecated */
  isSameDate(
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

    const dateTimeValue = toDateTime(value);
    const dateTimeCompare = toDateTime(compare);

    return (
      dateTimeValue.isValid &&
      dateTimeCompare.isValid &&
      dateTimeValue.startOf(unit).equals(dateTimeCompare.startOf(unit))
    );
  }

  /** @deprecated */
  isSameDateRange(
    value: NullableDateRangeLike,
    compare: NullableDateRangeLike,
    unit?: DateUnit,
  ): boolean {
    const range1 = toDateRange(value);
    const range2 = toDateRange(compare);

    return !range1.some(
      (date, idx) => !this.isSameDate(date, range2[idx], unit),
    );
  }

  /** @deprecated */
  diff(value: DateLike, compare: DateLike, unit: DateUnit): number {
    const valueDateTime = toDateTime(value);
    const compareDateTime = toDateTime(compare);

    return valueDateTime.diff(compareDateTime, unit).as(unit);
  }

  /** @deprecated */
  toLocaleString(value: DateLike, options?: DateFormatOptions): string {
    return toDateTime(value).toLocaleString(options);
  }

  /** @deprecated */
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

  /** @deprecated */
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

  /** @deprecated */
  formatRelativeTime(
    value: DateLike,
    { style = 'long', compare = Date.now() }: RelativeTimeFormatOptions = {},
  ): string {
    const valueDateTime = toDateTime(value);
    const compareDateTime = toDateTime(compare);

    return valueDateTime.toRelative({ style, base: compareDateTime }) as string;
  }
}

export function useDateUtils(): DateUtils {
  return useMemo(() => new DateUtils(), []);
}
