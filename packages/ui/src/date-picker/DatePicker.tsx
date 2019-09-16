import React from 'react';

import { DatePickerBase, DatePickerBaseProps, useDatePickerBaseState } from './DatePickerBase';
import { useDatePickerStyles } from './DatePickerStyles';

export type DatePickerValue = Date | undefined;

export type DatePickerProps = DatePickerBaseProps<DatePickerValue>;

export function DatePicker({ value, onChange, ...props }: DatePickerProps) {
  const classNames = useDatePickerStyles();
  const stateProps = useDatePickerBaseState();
  const { onClose } = stateProps;
  const handleDayClick = (day: DatePickerValue) => {
    onChange(day);
    onClose();
  };
  return (
    <DatePickerBase
      {...stateProps}
      classNames={classNames}
      onDayClick={handleDayClick}
      selectedDays={value}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}
