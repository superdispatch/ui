import { Popover } from '@material-ui/core';
import { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import React, { useMemo } from 'react';

import { Calendar, CalendarProps } from '../calendar/Calendar';
import { useDatePickerPopoverState } from './DatePickerBase';
import { DateTextField } from './DateTextField';
import { formatDate } from './DateUtils';

export interface DateFieldProps
  extends Omit<OutlinedTextFieldProps, 'variant' | 'value' | 'onBlur' | 'onFocus' | 'onChange'> {
  value: undefined | Date;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (value: undefined | Date) => void;
  CalendarProps?: Omit<CalendarProps, 'selectedDays'>;
}

export function DateField({
  value,
  onBlur,
  onFocus,
  onChange,
  CalendarProps: { onDayClick, ...calendarProps } = {},
  ...textFieldProps
}: DateFieldProps) {
  const { anchorEl, onOpen, onClose } = useDatePickerPopoverState();
  const textValue = useMemo(() => formatDate(value), [value]);

  const handleClose = () => {
    onClose();

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
          {...calendarProps}
          selectedDays={[value]}
          onDayClick={(day, modifiers) => {
            if (onDayClick) {
              onDayClick(day, modifiers);
            }

            if (!modifiers.disabled) {
              if (onChange) {
                onChange(day);
              }

              handleClose();
            }
          }}
        />
      </Popover>
    </>
  );
}
