import React from 'react';
import {
  DatePickerBase,
  DatePickerBaseProps,
  DatePickerBaseInputComponent,
  DatePickerBaseInputComponentProps,
} from './DatePickerBase';
import { useStyles } from './DatePicker.styles';

export type DatePickerValue = Date;
export type DatePickerInputComponentProps = DatePickerBaseInputComponentProps<DatePickerValue>;
export interface DatePickerProps extends DatePickerBaseProps {
  value: DatePickerValue;
  InputComponent: DatePickerBaseInputComponent<DatePickerInputComponentProps>;
  onChange: (value: Date) => void;
}

export function DatePicker({ value, onChange, ...props }: DatePickerProps) {
  const { ...classNames } = useStyles();
  return (
    <DatePickerBase
      classNames={classNames}
      onDayClick={onChange}
      selectedDays={value}
      value={value}
      {...props}
    />
  );
}
