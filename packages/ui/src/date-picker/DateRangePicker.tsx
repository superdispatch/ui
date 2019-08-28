import React, { useState, useEffect } from 'react';
import { useDateRangePickerStyles } from './DateRangePicker.styles';
import {
  DatePickerBase,
  DatePickerBaseProps,
  DatePickerBaseInputComponent,
  DatePickerBaseInputComponentProps,
} from './DatePickerBase';

export type DateRangePickerValue = Date[];
export type DateRangePickerInputComponentProps = DatePickerBaseInputComponentProps<
  DateRangePickerValue
>;

export interface DateRangePickerProps extends DatePickerBaseProps {
  value: DateRangePickerValue;
  InputComponent: DatePickerBaseInputComponent<DateRangePickerInputComponentProps>;
  onChange: (value: DateRangePickerValue) => void;
}

export function DateRangePicker({ value, onChange, ...props }: DateRangePickerProps) {
  const { firstDayOfRange, lastDayOfRange, ...classNames } = useDateRangePickerStyles();
  const [pickingDateType, setPickingDateType] = useState<'start' | 'end'>('start');
  const [startDate, setStartDate] = useState(value[0]);
  const [endDate, setEndDate] = useState(value[1]);
  const selectedDays = startDate && endDate && { from: startDate, to: endDate };

  const modifiers = { [firstDayOfRange]: startDate, [lastDayOfRange]: endDate };

  const handleDayClick = (date: Date) => {
    if (pickingDateType === 'start') {
      setStartDate(date);
      setPickingDateType('end');
    }

    if (pickingDateType === 'end') {
      setEndDate(date);
      setPickingDateType('start');
    }
  };

  useEffect(() => {
    onChange([startDate, endDate]);
  }, [endDate, onChange, startDate]);

  return (
    <DatePickerBase
      classNames={classNames}
      selectedDays={selectedDays}
      onDayClick={handleDayClick}
      modifiers={modifiers}
      value={value}
      {...props}
    />
  );
}
