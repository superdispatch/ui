import { renderChildren } from '@superdispatch/ui';
import { ReactElement, ReactNode, useMemo } from 'react';
import { DateConfig, useDateConfig } from '../date-config/DateConfig';
import {
  formatRelativeTime,
  FormatRelativeTimeOptions,
  NullableDateInput,
} from '../date-time-utils/DateTimeUtils';
import { useDateTime } from '../use-date-time/useDateTime';

export interface FormattedRelativeTimeOptions
  extends Partial<DateConfig>,
    FormatRelativeTimeOptions {}

export function useFormattedRelativeTime(
  input: NullableDateInput,
  {
    unit,
    style,
    round,
    padding,
    fallback,

    base: baseOption,
    ...dateConfig
  }: FormattedRelativeTimeOptions = {},
): string {
  const config = useDateConfig(dateConfig);
  const date = useDateTime(input, config);
  const baseOptionDate = useDateTime(baseOption, config);
  const base = baseOption == null ? undefined : baseOptionDate;

  return useMemo(
    () =>
      formatRelativeTime(
        date,
        { base, unit, style, round, padding, fallback },
        config,
      ),
    [base, date, unit, style, round, config, padding, fallback],
  );
}

export interface FormattedRelativeTimeProps
  extends Omit<FormattedRelativeTimeOptions, 'fallback'> {
  date: NullableDateInput;
  fallback?: ReactNode;
}

export function FormattedRelativeTime({
  date,
  fallback = 'Invalid Date',
  ...options
}: FormattedRelativeTimeProps): null | ReactElement {
  const formatted = useFormattedRelativeTime(date, {
    ...options,
    fallback: '',
  });

  return renderChildren(formatted || fallback);
}
