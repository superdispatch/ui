import { Popover, TextField } from '@material-ui/core';
import { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import React, { useMemo } from 'react';

import { Calendar, CalendarProps } from '../calendar/Calendar';
import { useDatePickerPopoverState } from './DatePickerBase';
import { formatDate } from './DateUtils';

export interface DatePickerFieldProps
  extends Omit<OutlinedTextFieldProps, 'variant' | 'value' | 'onBlur' | 'onFocus' | 'onChange'> {
  value: undefined | Date;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (value: undefined | Date) => void;
  CalendarProps?: CalendarProps;
}

export function DateField({
  value,
  onBlur,
  onFocus,
  onChange,
  inputProps,
  CalendarProps: { onDayClick, ...calendarProps } = {},
  ...textFieldProps
}: DatePickerFieldProps) {
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
      <TextField
        {...textFieldProps}
        value={textValue}
        inputProps={{ ...inputProps, readOnly: true }}
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
