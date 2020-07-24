import React, { useState } from 'react';

import { NullableDateRange } from '../DateUtils';
import {
  DateRangeField as SDDateRangeField,
  DateRangeFieldProps,
} from './DateRangeField';

export function DateRangeField({
  value,
  onChange,
  ...props
}: DateRangeFieldProps) {
  const [state, setState] = useState<NullableDateRange>();

  return (
    <SDDateRangeField
      {...props}
      value={value || state}
      onChange={(date) => {
        setState(date);
        onChange?.(date);
      }}
    />
  );
}
