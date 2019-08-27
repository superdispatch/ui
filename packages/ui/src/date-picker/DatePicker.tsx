import React from 'react';
import {
  DatePickerBase,
  DatePickerBaseProps,
  DatePickerBaseInputComponent,
  DatePickerBaseInputComponentProps,
} from './DatePickerBase';

export type DatePickerValue = Date;
export type DatePickerInputComponentProps = DatePickerBaseInputComponentProps<DatePickerValue>;
export interface DatePickerProps extends DatePickerBaseProps {
  value: DatePickerValue;
  InputComponent: DatePickerBaseInputComponent<DatePickerInputComponentProps>;
  onChange: (value: Date) => void;
}

export function DatePicker({ value, onChange, ...props }: DatePickerProps) {
  return <DatePickerBase onDayClick={onChange} selectedDays={value} value={value} {...props} />;
}
