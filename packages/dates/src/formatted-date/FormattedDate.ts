import { renderChildren } from '@superdispatch/ui';
import { ReactElement, ReactNode, useMemo } from 'react';

import { DateConfig, useDateConfig } from '../date-config/DateConfig';
import {
  formatDate,
  FormatDateConfig,
  NullableDateInput,
  toPrimitiveDateInput,
} from '../date-time-utils/DateTimeUtils';

export interface FormattedDateConfig
  extends Partial<DateConfig>,
    FormatDateConfig {}

export function useFormattedDate(
  input: NullableDateInput,
  { variant, fallback, ...dateConfig }: FormattedDateConfig,
): string {
  const config = useDateConfig(dateConfig);
  const primitiveInput = toPrimitiveDateInput(input);

  return useMemo(
    () => formatDate(primitiveInput, { variant, fallback }, config),
    [config, variant, fallback, primitiveInput],
  );
}

export interface FormattedDateProps
  extends Omit<FormattedDateConfig, 'fallback'> {
  fallback?: ReactNode;
  date: NullableDateInput;
}

export function FormattedDate({
  date,
  fallback = 'Invalid Date',
  ...options
}: FormattedDateProps): null | ReactElement {
  const formatted = useFormattedDate(date, { ...options, fallback: '' });

  return renderChildren(formatted || fallback);
}
