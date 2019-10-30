import React from 'react';

import {
  CommonDatePickerProps,
  DatePickerBase,
  DatePickerBaseInputComponentProps,
  useDatePickerBaseState,
} from './DatePickerBase';

export type DatePickerValue = Date | undefined;
export type DatePickerProps = CommonDatePickerProps<DatePickerValue>;
export type DatePickerInputComponentProps = DatePickerBaseInputComponentProps<DatePickerValue>;

export function DatePicker({ value, onChange, ...props }: DatePickerProps) {
  const { onClose, ...stateProps } = useDatePickerBaseState();

  return (
    <DatePickerBase
      {...stateProps}
      onClose={onClose}
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
