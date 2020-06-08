import { renderChildren } from '@superdispatch/ui';

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
}: FormattedRelativeTimeProps) {
  const formatted = useFormattedRelativeTime(date, compare, options);

  return renderChildren(formatted);
}
