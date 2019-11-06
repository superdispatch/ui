import { Popover } from '@material-ui/core';
import { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import React, { useMemo, useState } from 'react';

import { Calendar, CalendarProps } from '../calendar/Calendar';
import { useDatePickerPopoverState } from './DatePickerBase';
import { useDateRangePickerStyles } from './DateRangePickerStyles';
import { DateTextField } from './DateTextField';
import { formatDateRange, normalizeDateRange } from './DateUtils';

export interface DateRangeFieldProps
  extends Omit<OutlinedTextFieldProps, 'variant' | 'value' | 'onBlur' | 'onFocus' | 'onChange'> {
  value: undefined | [Date?, Date?];
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (value: undefined | [Date?, Date?]) => void;
  CalendarProps?: Omit<CalendarProps, 'selectedDays'>;
}

export function DateRangeField({
  value,
  onBlur,
  onFocus,
  onChange,
  CalendarProps: {
    modifiers,
    onDayClick,
    onDayMouseEnter,
    classes: calendarClasses,
    ...calendarProps
  } = {},
  ...textFieldProps
}: DateRangeFieldProps) {
  const { anchorEl, onOpen, onClose } = useDatePickerPopoverState();
  const { rangeStart, rangeEnd, ...styles } = useDateRangePickerStyles({
    classes: calendarClasses,
  });
  const textValue = useMemo(() => formatDateRange(value), [value]);
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>(undefined);
  const [fromDate, actualToDate] = normalizeDateRange(value);
  const toDate = actualToDate || hoveredDate;

  const handleClose = () => {
    onClose();
    setHoveredDate(undefined);

    if (onBlur) {
      onBlur();
    }
  };

  return (
    <>
      <DateTextField
        {...textFieldProps}
        value={textValue}
        onFocus={event => onOpen(event.currentTarget)}
      />

      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableRestoreFocus={true}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Calendar
          numberOfMonths={2}
          {...calendarProps}
          classes={styles}
          selectedDays={[fromDate, toDate]}
          modifiers={{ ...modifiers, [rangeStart]: fromDate, [rangeEnd]: toDate }}
          onDayMouseEnter={(date, dateModifiers) => {
            if (onDayMouseEnter) {
              onDayMouseEnter(date, dateModifiers);
            }

            setHoveredDate(!dateModifiers.disabled ? date : undefined);
          }}
          onDayClick={(date, dateModifiers) => {
            if (onDayClick) {
              onDayClick(date, dateModifiers);
            }

            if (onChange && !dateModifiers.disabled) {
              if (fromDate && !actualToDate) {
                onChange([fromDate, date]);
                handleClose();
              } else {
                onChange([date]);
              }
            }
          }}
        />
      </Popover>
    </>
  );
}
