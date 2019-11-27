import React from 'react';

import {
  CommonDatePickerProps,
  DatePickerBase,
  DatePickerBaseInputComponentProps,
  useDatePickerPopoverState,
} from './DatePickerBase';

export type DatePickerValue = Date | undefined;
export type DatePickerProps = CommonDatePickerProps<DatePickerValue>;
export type DatePickerInputComponentProps = DatePickerBaseInputComponentProps<
  DatePickerValue
>;

export function DatePicker({
  value,
  onChange,
  onDayClick,
  ...props
}: DatePickerProps) {
  const { onClose, ...stateProps } = useDatePickerPopoverState();

  return (
    <DatePickerBase
      {...stateProps}
      onClose={onClose}
      value={value}
      selectedDays={[value]}
      onChange={onChange}
      onDayClick={(day, modifiers) => {
        onDayClick?.(day, modifiers);

        if (!modifiers.disabled) {
          onChange(day);
          onClose();
        }
      }}
      {...props}
    />
  );
}
