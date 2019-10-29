import React, { useState } from 'react';

import {
  DatePickerBase,
  DatePickerBaseInputComponentProps,
  DatePickerBaseProps,
  DatePickerBaseQuickSelectionItem,
  useDatePickerBaseState,
} from './DatePickerBase';
import { useDateRangePickerStyles } from './DateRangePickerStyles';

export type DateRangePickerValue = [Date?, Date?] | undefined;
export type DateRangePickerProps = DatePickerBaseProps<DateRangePickerValue>;
export type DateRangePickerInputComponentProps = DatePickerBaseInputComponentProps<
  DateRangePickerValue
>;
export type DateRangePickerQuickSelectionItem = DatePickerBaseQuickSelectionItem<
  DateRangePickerValue
>;

function sortDates(dates: DateRangePickerValue) {
  return dates && dates.sort((a, b) => (a && b ? a.getTime() - b.getTime() : 0));
}

function isSameDate(dateA?: Date, dateB?: Date) {
  return dateA && dateB && dateA.getTime() === dateB.getTime();
}

function isSameRange(a: DateRangePickerValue, b: DateRangePickerValue) {
  const rangeA = sortDates(a);
  const rangeB = sortDates(b);
  return (
    !!rangeA && !!rangeB && (isSameDate(rangeA[0], rangeB[0]) && isSameDate(rangeA[1], rangeB[1]))
  );
}

export function DateRangePicker({
  value,
  onChange,
  quickSelectionItems,
  ...props
}: DateRangePickerProps) {
  const stateProps = useDatePickerBaseState();
  const { onClose } = stateProps;
  const { firstDayOfRange, lastDayOfRange, ...styles } = useDateRangePickerStyles();
  const [pickingDateType, setPickingDateType] = useState<'start' | 'end'>('start');
  const [hoveredDate, setHoveredDate] = useState();
  const [startDate, endDate] = value ? value : [undefined, undefined];
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
    quickSelectionItems && quickSelectionItems.find(item => isSameRange(item.value, value));

  return (
    <DatePickerBase
      {...stateProps}
      onClose={handleClose}
      classes={styles}
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
