import React, { forwardRef, useState } from 'react';

import { TimeField as SDTimeField, TimeFieldProps } from './TimeField';

export const TimeField = forwardRef<HTMLDivElement, TimeFieldProps>(
  ({ value, onChange, ...props }) => {
    const [state, setState] = useState<Date>();

    return (
      <SDTimeField
        {...props}
        value={value || state}
        onChange={(date) => {
          setState(date);
          onChange?.(date);
        }}
      />
    );
  },
);
