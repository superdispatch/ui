import React, { forwardRef, useState } from 'react';

import { TimeField as SDTimeField, TimeFieldProps } from './TimeField';

export const TimeField = forwardRef<HTMLDivElement, TimeFieldProps>(
  ({ value, onChange, ...props }, ref) => {
    const [state, setState] = useState<Date>();

    return (
      <SDTimeField
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
