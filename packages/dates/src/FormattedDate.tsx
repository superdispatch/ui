import { ReactElement, useMemo } from 'react';

import { useDateUtils } from './DateContext';
import { DateFormatVariant, DateLike } from './DateUtils';

export function useFormattedDate(
  date: DateLike,
  variant: DateFormatVariant,
): string {
  const utils = useDateUtils();

  return useMemo(() => utils.format(date, variant), [date, utils, variant]);
}

export interface FormattedDateProps {
  date: DateLike;
  variant: DateFormatVariant;
}

export function FormattedDate({
  date,
  variant,
}: FormattedDateProps): ReactElement {
  return (useFormattedDate(date, variant) as unknown) as ReactElement;
}
