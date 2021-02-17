import { forwardRef, useState } from 'react';
import { DateString } from '../date-time-utils/DateTimeUtils';
import { Calendar as SDCalendar, CalendarProps } from './Calendar';

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  ({ onDayClick, selectedDays, ...props }, ref) => {
    const [value, setValue] = useState<DateString>();

    return (
      <SDCalendar
        {...props}
        ref={ref}
        selectedDays={selectedDays || ((event) => value === event.stringValue)}
        onDayClick={(event) => {
          onDayClick?.(event);

          if (!event.disabled) {
            if (!event.selected) {
              setValue(event.stringValue);
            } else {
              setValue(undefined);
            }
          }
        }}
      />
    );
  },
);
