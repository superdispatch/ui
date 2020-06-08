import { renderChildren } from '@superdispatch/ui';

import { useDateUtils } from './DateContext';
import { DateFormatVariant, DateLike } from './DateUtils';

export function useFormattedDate(
  date: DateLike,
  variant: DateFormatVariant,
): string {
  const utils = useDateUtils();

  return utils.format(date, variant);
}

export interface FormattedDateProps {
  date: DateLike;
  variant: DateFormatVariant;
}

export function FormattedDate({ date, variant }: FormattedDateProps) {
  const formatted = useFormattedDate(date, variant);

  return renderChildren(formatted);
}
