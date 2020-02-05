import React, { ReactElement } from 'react';

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

export function FormattedDate({
  date,
  variant,
}: FormattedDateProps): ReactElement {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{useFormattedDate(date, variant)}</>;
}
