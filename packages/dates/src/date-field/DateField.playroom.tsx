import React, { forwardRef, useState } from 'react';

import { DateField as SDDateField, DateFieldProps } from './DateField';

export const DateField = forwardRef<HTMLDivElement, DateFieldProps>(
  ({ value, onChange, ...props }, ref) => {
    const [state, setState] = useState<Date>();

    return (
      <SDDateField
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
