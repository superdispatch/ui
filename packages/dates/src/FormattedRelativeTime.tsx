import React, { ReactElement } from 'react';

import { useDateUtils } from './DateContext';
import { DateLike, RelativeTimeFormatOptions } from './DateUtils';

export function useFormattedRelativeTime(
  value: DateLike,
  compare: DateLike,
  { style }: RelativeTimeFormatOptions = {},
): string {
  const utils = useDateUtils();

  return utils.formatRelativeTime(value, compare, { style });
}

export interface FormattedRelativeTimeProps extends RelativeTimeFormatOptions {
  date: DateLike;
  compare: DateLike;
}

export function FormattedRelativeTime({
  date,
  compare,
  ...options
}: FormattedRelativeTimeProps): ReactElement {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{useFormattedRelativeTime(date, compare, options)}</>;
}
