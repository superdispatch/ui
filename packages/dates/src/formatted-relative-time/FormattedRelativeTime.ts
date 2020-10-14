import { renderChildren } from '@superdispatch/ui';
import { ReactElement, ReactNode, useMemo } from 'react';

import { DateConfig, useDateConfig } from '../date-config/DateConfig';
import {
  formatRelativeTime,
  FormatRelativeTimeOptions,
  NullableDateInput,
  toPrimitiveDateInput,
} from '../date-time-utils/DateTimeUtils';

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
  const primitiveInput = toPrimitiveDateInput(input);
  const primitiveBase =
    baseOption == null ? undefined : toPrimitiveDateInput(baseOption);

  return useMemo(
    () =>
      formatRelativeTime(
        primitiveInput,
        { unit, style, round, padding, fallback, base: primitiveBase },
        config,
      ),
    [
      unit,
      style,
      round,
      config,
      padding,
      fallback,
      primitiveBase,
      primitiveInput,
    ],
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
