import { forwardRef, useState } from 'react';
import { DateString } from '../date-time-utils/DateTimeUtils';
import { TimeField as SDTimeField, TimeFieldProps } from './TimeField';

export const TimeField = forwardRef<HTMLDivElement, TimeFieldProps>(
  ({ value, onChange, ...props }, ref) => {
    const [state, setState] = useState<DateString>();

    return (
      <SDTimeField
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
