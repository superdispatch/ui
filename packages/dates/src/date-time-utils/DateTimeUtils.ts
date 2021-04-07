import { DateTime, Settings, ToRelativeOptions } from 'luxon';
import {
  DateConfig,
  DateFormat,
  defaultDateConfig,
} from '../date-config/DateConfig';

//
// Config
//

export type DateDisplayVariant = 'Date' | 'ShortDate' | 'Time' | 'DateTime';

const DATE_FORMATS: Readonly<Record<DateFormat, string>> = {
  DateISO: '',
  DateTimeISO: '',
  JodaISO: "yyyy-MM-dd'T'HH:mm:ss.SSSZZZ",
};

const DATE_DISPLAY_VARIANTS: Readonly<
  Record<DateDisplayVariant, Intl.DateTimeFormatOptions>
> = {
  Date: {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  },
  ShortDate: {
    day: '2-digit',
    month: 'short',
  },
  Time: {
    hour: 'numeric',
    minute: 'numeric',
  },
  DateTime: {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  },
};

//
// Date Utils
//

export type DateString = string;
export type NullableDateString = null | undefined | DateString;
export type PrimitiveDateInput = number | DateString;
export type NullableDateInput =
  | null
  | undefined
  | Date
  | DateTime
  | PrimitiveDateInput;

export function toPrimitiveDateInput(
  input: NullableDateInput,
): PrimitiveDateInput {
  if (typeof input == 'number' || typeof input == 'string') {
    return input;
  }

  if (input instanceof Date || input instanceof DateTime) {
    return input.valueOf();
  }

  return NaN;
}

export function parseDate(
  input: NullableDateInput,
  { format }: DateConfig = defaultDateConfig,
): DateTime {
  if (input instanceof DateTime) {
    const { defaultZone } = Settings;

    if (!defaultZone.equals(input.zone)) {
      return input.setZone(defaultZone);
    }

    return input;
  }

  if (input instanceof Date) {
    return DateTime.fromJSDate(input);
  }

  if (typeof input === 'number') {
    return DateTime.fromMillis(input);
  }

  if (typeof input == 'string') {
    switch (format) {
      case 'DateISO':
      case 'DateTimeISO':
        return DateTime.fromISO(input);
      default:
        return DateTime.fromFormat(input, DATE_FORMATS[format]);
    }
  }

  return DateTime.invalid('invalid input');
}

export function stringifyDate(
  input: NullableDateInput,
  config: DateConfig = defaultDateConfig,
): string | null {
  const date = parseDate(input, config);

  if (date.isValid) {
    const { format } = config;

    switch (format) {
      case 'DateISO':
        return date.toISODate();
      case 'DateTimeISO':
        return date.toISO();
      default:
        return date.toFormat(DATE_FORMATS[format]);
    }
  }

  return null;
}

export interface FormatDateConfig {
  fallback?: string;
  variant: DateDisplayVariant;
}

export function formatDate(
  input: NullableDateInput,
  { variant, fallback = 'Invalid Date' }: FormatDateConfig,
  config: DateConfig = defaultDateConfig,
): string {
  const date = parseDate(input, config);

  if (!date.isValid) {
    return fallback;
  }

  return date.toLocaleString(DATE_DISPLAY_VARIANTS[variant]);
}

export interface FormatRelativeTimeOptions
  extends Pick<ToRelativeOptions, 'unit' | 'round' | 'padding' | 'style'> {
  fallback?: string;
  base?: NullableDateInput;
}

export function formatRelativeTime(
  input: NullableDateInput,
  {
    unit,
    round,
    style,
    padding,

    base: baseOption,
    fallback = 'Invalid Date',
  }: FormatRelativeTimeOptions = {},
  config: DateConfig = defaultDateConfig,
): string {
  const date = parseDate(input, config);
  const base = baseOption == null ? undefined : parseDate(baseOption, config);

  if (date.isValid && (!base || base.isValid)) {
    const formatted = date.toRelative({ base, unit, style, round, padding });

    if (formatted) {
      return formatted
        .replace(/\ssec\./g, 's')
        .replace(/\shr\./g, 'h')
        .replace(/\smin\./g, 'm');
    }
  }

  return fallback;
}

export interface DatePayload {
  readonly config: DateConfig;
  readonly dateValue: DateTime;
  readonly stringValue: null | DateString;
}

export function toDatePayload(
  input: NullableDateInput,
  config: DateConfig = defaultDateConfig,
): DatePayload {
  const dateValue = parseDate(input, config);

  return {
    config,
    dateValue,
    stringValue: stringifyDate(dateValue, config),
  };
}

//
// Date Range Utils
//

export type DateTimeRange = [null | DateTime, null | DateTime];
export type DateStringRange = [null | DateString, null | DateString];
export type NullableDateRangeInput =
  | null
  | undefined
  | [NullableDateInput?, NullableDateInput?];
export type PrimitiveDateRangeInput = [
  undefined | PrimitiveDateInput,
  undefined | PrimitiveDateInput,
];

export function toPrimitiveDateRangeInput(
  input: NullableDateRangeInput,
): PrimitiveDateRangeInput {
  if (!Array.isArray(input)) {
    return [undefined, undefined];
  }

  return [toPrimitiveDateInput(input[0]), toPrimitiveDateInput(input[1])];
}

export function parseDateRange(
  input: NullableDateRangeInput,
  config?: DateConfig,
): DateTimeRange {
  let start: null | DateTime = null;
  let finish: null | DateTime = null;

  if (Array.isArray(input)) {
    [start = null, finish = null] = input
      .map((value) => parseDate(value, config))
      .filter((date) => date.isValid)
      .sort((a, b) => a.valueOf() - b.valueOf());
  }

  return [start, finish];
}

export function stringifyDateRange(
  input: NullableDateRangeInput,
  config?: DateConfig,
): DateStringRange {
  const [start, finish] = parseDateRange(input, config);

  return [stringifyDate(start, config), stringifyDate(finish, config)];
}

export interface FormatDateRangeOptions {
  fallback?: string;
}

export function formatDateRange(
  input: NullableDateRangeInput,
  { fallback = 'Invalid Date Range' }: FormatDateRangeOptions,
  config: DateConfig = defaultDateConfig,
): string {
  const [start, finish] = parseDateRange(input, config);

  if (!start) {
    return fallback;
  }

  const startVariant: DateDisplayVariant = !finish?.hasSame(start, 'year')
    ? 'Date'
    : 'ShortDate';

  const startText = formatDate(start, { variant: startVariant }, config);
  const finishText = !finish ? '…' : formatDate(finish, { variant: 'Date' });

  return `${startText} - ${finishText}`;
}

export interface DateRangePayload {
  config: DateConfig;
  dateValue: DateTimeRange;
  stringValue: DateStringRange;
}

export function toDateRangePayload(
  input: NullableDateRangeInput,
  config: DateConfig = defaultDateConfig,
): DateRangePayload {
  const dateValue = parseDateRange(input, config);

  return {
    config,
    dateValue,
    stringValue: stringifyDateRange(dateValue, config),
  };
}
