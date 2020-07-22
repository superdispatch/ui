import { Paper } from '@material-ui/core';
import React, { useState } from 'react';

import { Calendar as SDCalendar, CalendarProps } from './Calendar';

export function Calendar({
  onDayClick,
  selectedDays,
  ...props
}: CalendarProps) {
  const [value, setValue] = useState<undefined | Date>();

  return (
    <Paper style={{ display: 'inline-block' }}>
      <SDCalendar
        {...props}
        selectedDays={(date, utils) =>
          selectedDays?.(date, utils) ?? utils.isSameDate(date, value, 'day')
        }
        onDayClick={(date, modifiers) => {
          onDayClick?.(date, modifiers);

          if (!modifiers.disabled) {
            if (!modifiers.selected) {
              setValue(date);
            } else {
              setValue(undefined);
            }
          }
        }}
      />
    </Paper>
  );
}
