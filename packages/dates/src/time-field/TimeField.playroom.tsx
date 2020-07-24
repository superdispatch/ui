import React, { useState } from 'react';

import { TimeField as SDTimeField, TimeFieldProps } from './TimeField';

export function TimeField({ value, onChange, ...props }: TimeFieldProps) {
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
}
