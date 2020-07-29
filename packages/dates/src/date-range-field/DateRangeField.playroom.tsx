import React, { forwardRef, useState } from 'react';

import { NullableDateRange } from '../DateUtils';
import {
  DateRangeField as SDDateRangeField,
  DateRangeFieldProps,
} from './DateRangeField';

export const DateRangeField = forwardRef<HTMLDivElement, DateRangeFieldProps>(
  ({ value, onChange, ...props }, ref) => {
    const [state, setState] = useState<NullableDateRange>();

    return (
      <SDDateRangeField
        {...props}
        ref={ref}
        value={value || state}
        onChange={(date) => {
          setState(date);
          onChange?.(date);
        }}
      />
    );
  },
);
