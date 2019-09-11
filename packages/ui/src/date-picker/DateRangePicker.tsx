import React, { useState } from 'react';

import {
  DatePickerBase,
  DatePickerBaseInputComponent,
  DatePickerBaseInputComponentProps,
  DatePickerBaseProps,
  DatePickerBaseQuickSelectionItem,
  useDatePickerBaseState,
} from './DatePickerBase';
import { useDateRangePickerStyles } from './DateRangePickerStyles';

export type DateRangePickerValue = [Date?, Date?];
export type DateRangePickerInputComponentProps = DatePickerBaseInputComponentProps<
  DateRangePickerValue
>;

export interface DateRangePickerQuickSelectionItem extends DatePickerBaseQuickSelectionItem {
  value: DateRangePickerValue;
}

export interface DateRangePickerProps extends DatePickerBaseProps {
  value: DateRangePickerValue;
  quickSelectionItems?: DateRangePickerQuickSelectionItem[];
  InputComponent: DatePickerBaseInputComponent<DateRangePickerInputComponentProps>;
  onChange: (value: DateRangePickerValue) => void;
}

const compareDates = (dateA?: Date, dateB?: Date) =>
  dateA && dateB ? dateA.getTime() - dateB.getTime() : 0;

const sortDates = (dates: DateRangePickerValue) => dates.sort(compareDates);

const isSameDate = (dateA?: Date, dateB?: Date) =>
  dateA && dateB && dateA.getTime() === dateB.getTime();

const isSameValue = (valueA: DateRangePickerValue, valueB: DateRangePickerValue) => {
  const sortedValueA = sortDates(valueA);
  const sortedValueB = sortDates(valueB);
  return (
    isSameDate(sortedValueA[0], sortedValueB[0]) && isSameDate(sortedValueA[1], sortedValueB[1])
  );
};

export function DateRangePicker({
  value,
  onChange,
  quickSelectionItems,
  ...props
}: DateRangePickerProps) {
  const stateProps = useDatePickerBaseState();
  const { onClose } = stateProps;
  const { firstDayOfRange, lastDayOfRange, ...classNames } = useDateRangePickerStyles();
  const [pickingDateType, setPickingDateType] = useState<'start' | 'end'>('start');
  const [hoveredDate, setHoveredDate] = useState();
  const [startDate, endDate] = value;
  const selectedDaysFrom = startDate;
  const selectedDaysTo = pickingDateType === 'end' ? hoveredDate : endDate;
  const selectedDays = selectedDaysFrom &&
    selectedDaysTo && { from: selectedDaysFrom, to: selectedDaysTo };
  const modifiers = { [firstDayOfRange]: selectedDaysFrom, [lastDayOfRange]: selectedDaysTo };

  const handleClose = () => {
    setPickingDateType('start');
    onClose();
  };

  const handleDayClick = (date: Date) => {
    if (pickingDateType === 'start') {
      const newValue: DateRangePickerValue = [date];
      onChange(newValue);
      setPickingDateType('end');
    }

    if (pickingDateType === 'end') {
      const newValue: DateRangePickerValue = [startDate, date];
      onChange(sortDates(newValue));
      handleClose();
    }
  };

  const handleDayMouseEnter = (date: Date) => {
    setHoveredDate(date);
  };

  const quickSelectionSelectedItem =
    quickSelectionItems && quickSelectionItems.find(item => isSameValue(item.value, value));

  return (
    <DatePickerBase
      {...stateProps}
      onClose={handleClose}
      classNames={classNames}
      selectedDays={selectedDays}
      onDayClick={handleDayClick}
      onDayMouseEnter={handleDayMouseEnter}
      modifiers={modifiers}
      value={value}
      onChange={onChange}
      quickSelectionItems={quickSelectionItems}
      quickSelectionSelectedItem={quickSelectionSelectedItem}
      {...props}
    />
  );
}
