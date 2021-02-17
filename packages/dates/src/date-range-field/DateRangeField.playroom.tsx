import { forwardRef, useState } from 'react';
import { DateStringRange } from '../date-time-utils/DateTimeUtils';
import {
  DateRangeField as SDDateRangeField,
  DateRangeFieldProps,
} from './DateRangeField';

export const DateRangeField = forwardRef<HTMLDivElement, DateRangeFieldProps>(
  ({ value, onChange, ...props }, ref) => {
    const [state, setState] = useState<DateStringRange>();

    return (
      <SDDateRangeField
        {...props}
        ref={ref}
        value={value || state}
        onChange={(date) => {
          onChange?.(date);
          setState(date.stringValue);
        }}
      />
    );
  },
);
