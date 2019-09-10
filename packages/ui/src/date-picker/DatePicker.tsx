import React from 'react';

import {
  DatePickerBase,
  DatePickerBaseInputComponent,
  DatePickerBaseInputComponentProps,
  DatePickerBaseProps,
  useDatePickerBaseState,
} from './DatePickerBase';
import { useDatePickerStyles } from './DatePickerStyles';

export type DatePickerValue = Date;
export type DatePickerInputComponentProps = DatePickerBaseInputComponentProps<DatePickerValue>;
export interface DatePickerProps extends DatePickerBaseProps {
  value?: DatePickerValue;
  InputComponent: DatePickerBaseInputComponent<DatePickerInputComponentProps>;
  onChange: (value?: Date) => void;
}

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
