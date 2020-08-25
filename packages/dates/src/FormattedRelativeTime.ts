import { renderChildren } from '@superdispatch/ui';

import { useDateUtils } from './DateContext';
import { DateLike, RelativeTimeFormatOptions } from './DateUtils';

export function useFormattedRelativeTime(
  value: DateLike,
  options?: RelativeTimeFormatOptions,
): string {
  const utils = useDateUtils();

  return utils.formatRelativeTime(value, options);
}

export interface FormattedRelativeTimeProps extends RelativeTimeFormatOptions {
  date: DateLike;
}

export function FormattedRelativeTime({
  date,
  ...options
}: FormattedRelativeTimeProps) {
  const formatted = useFormattedRelativeTime(date, options);

  return renderChildren(formatted);
}
