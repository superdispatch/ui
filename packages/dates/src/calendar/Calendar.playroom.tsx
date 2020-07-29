import React, { forwardRef, useState } from 'react';

import { Calendar as SDCalendar, CalendarProps } from './Calendar';

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  ({ onDayClick, selectedDays, ...props }, ref) => {
    const [value, setValue] = useState<undefined | Date>();

    return (
      <SDCalendar
        {...props}
        ref={ref}
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
    );
  },
);
