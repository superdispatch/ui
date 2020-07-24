import React, { useState } from 'react';

import { DateField as SDDateField, DateFieldProps } from './DateField';

export function DateField({ value, onChange, ...props }: DateFieldProps) {
  const [state, setState] = useState<Date>();

  return (
    <SDDateField
      {...props}
      value={value || state}
      onChange={(date) => {
        setState(date);
        onChange?.(date);
      }}
    />
  );
}
