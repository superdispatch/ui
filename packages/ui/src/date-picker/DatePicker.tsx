import React from 'react';

import {
  CommonDatePickerProps,
  DatePickerBase,
  DatePickerBaseInputComponentProps,
  useDatePickerBaseState,
} from './DatePickerBase';
import { useDatePickerStyles } from './DatePickerStyles';

export type DatePickerValue = Date | undefined;
export type DatePickerProps = CommonDatePickerProps<DatePickerValue>;
export type DatePickerInputComponentProps = DatePickerBaseInputComponentProps<DatePickerValue>;

export function DatePicker({ value, onChange, ...props }: DatePickerProps) {
  const styles = useDatePickerStyles();
  const { onClose, ...stateProps } = useDatePickerBaseState();

  return (
    <DatePickerBase
      {...stateProps}
      onClose={onClose}
      classes={styles}
      value={value}
      month={value}
      selectedDays={value}
      onChange={onChange}
      onDayClick={day => {
        onChange(day);
        onClose();
      }}
      {...props}
    />
  );
}
