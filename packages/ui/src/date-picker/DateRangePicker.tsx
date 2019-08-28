import React, { useState } from 'react';

import {
  DatePickerBase,
  DatePickerBaseInputComponent,
  DatePickerBaseInputComponentProps,
  DatePickerBaseProps,
  useDatePickerBaseState,
} from './DatePickerBase';
import { useDateRangePickerStyles } from './DateRangePicker.styles';

export type DateRangePickerValue = [Date?, Date?];
export type DateRangePickerInputComponentProps = DatePickerBaseInputComponentProps<
  DateRangePickerValue
>;

export interface DateRangePickerProps extends DatePickerBaseProps {
  value: DateRangePickerValue;
  InputComponent: DatePickerBaseInputComponent<DateRangePickerInputComponentProps>;
  onChange: (value: DateRangePickerValue) => void;
}

const compareDates = (dateA?: Date, dateB?: Date) =>
  dateA && dateB ? dateA.getTime() - dateB.getTime() : 0;

const sortDates = (dates: DateRangePickerValue) => dates.sort(compareDates);

export function DateRangePicker({ value, onChange, ...props }: DateRangePickerProps) {
  const { firstDayOfRange, lastDayOfRange, ...classNames } = useDateRangePickerStyles();
  const { handleClose, ...stateProps } = useDatePickerBaseState();
  const [pickingDateType, setPickingDateType] = useState<'start' | 'end'>('start');
  const [startDate, endDate] = value;
  const selectedDays = startDate && endDate && { from: startDate, to: endDate };
  const modifiers = { [firstDayOfRange]: startDate, [lastDayOfRange]: endDate };

  [].sort;

  const handleDayClick = (date: Date) => {
    if (pickingDateType === 'start') {
      const newValue: DateRangePickerValue = [date];
      onChange(newValue);
      setPickingDateType('end');
    }

    if (pickingDateType === 'end') {
      const newValue: DateRangePickerValue = [startDate, date];
      onChange(sortDates(newValue));
      setPickingDateType('start');
      handleClose();
    }
  };

  return (
    <DatePickerBase
      classNames={classNames}
      selectedDays={selectedDays}
      onDayClick={handleDayClick}
      modifiers={modifiers}
      value={value}
      {...props}
      handleClose={handleClose}
      {...stateProps}
    />
  );
}
