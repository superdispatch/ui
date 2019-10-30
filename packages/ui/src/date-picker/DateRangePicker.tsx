import React, { useMemo, useState } from 'react';

import {
  CommonDatePickerProps,
  DatePickerBase,
  DatePickerBaseInputComponentProps,
  DatePickerBaseQuickSelectionItem,
  useDatePickerBaseState,
} from './DatePickerBase';
import { useDateRangePickerStyles } from './DateRangePickerStyles';

export type DateRangePickerValue = [Date?, Date?] | undefined;
export type DateRangePickerProps = CommonDatePickerProps<DateRangePickerValue>;
export type DateRangePickerInputComponentProps = DatePickerBaseInputComponentProps<
  DateRangePickerValue
>;
export type DateRangePickerQuickSelectionItem = DatePickerBaseQuickSelectionItem<
  DateRangePickerValue
>;

function normalizeRange(dates: DateRangePickerValue): NonNullable<DateRangePickerValue> {
  if (!dates) {
    return [];
  }

  const [from, to] = dates;

  return !from || !to ? dates : from.getTime() <= to.getTime() ? dates : [to, from];
}

function isSameDate(dateA?: Date, dateB?: Date): boolean {
  return !!dateA && !!dateB && dateA.getTime() === dateB.getTime();
}

function isSameRange(a: DateRangePickerValue, b: DateRangePickerValue): boolean {
  const [fromA, toA] = normalizeRange(a);
  const [fromB, toB] = normalizeRange(b);

  return isSameDate(fromA, toA) && isSameDate(fromB, toB);
}

function isMonthStart(date: Date): boolean {
  return date.getDate() === 1;
}

function isMonthEnd(date: Date): boolean {
  return (
    date.getMonth() < new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getMonth()
  );
}

export function DateRangePicker({
  value,
  onChange,
  modifiers,
  quickSelectionItems,
  ...props
}: DateRangePickerProps) {
  const { onClose, ...stateProps } = useDatePickerBaseState();
  const { rangeStart, rangeEnd, monthStart, monthEnd, ...styles } = useDateRangePickerStyles();
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>(undefined);
  const [pickingDateType, setPickingDateType] = useState<'start' | 'end'>('start');

  const [fromDate, actualToDate] = normalizeRange(value);
  const toDate = pickingDateType === 'end' ? hoveredDate : actualToDate;
  const selectedDays = useMemo(() => fromDate && toDate && { from: fromDate, to: toDate }, [
    fromDate,
    toDate,
  ]);
  const quickSelectionSelectedItem = useMemo(
    () => quickSelectionItems && quickSelectionItems.find(item => isSameRange(item.value, value)),
    [value, quickSelectionItems],
  );

  function handleClose() {
    onClose();
    setPickingDateType('start');
  }

  return (
    <DatePickerBase
      {...stateProps}
      classes={styles}
      onClose={handleClose}
      selectedDays={selectedDays}
      value={value}
      month={fromDate || actualToDate}
      onChange={onChange}
      modifiers={{
        ...modifiers,
        [rangeStart]: fromDate,
        [rangeEnd]: toDate,
        [monthStart]: isMonthStart,
        [monthEnd]: isMonthEnd,
      }}
      quickSelectionItems={quickSelectionItems}
      quickSelectionSelectedItem={quickSelectionSelectedItem}
      onDayMouseEnter={date => setHoveredDate(date)}
      onDayClick={date => {
        if (pickingDateType === 'start') {
          onChange([date]);
          setPickingDateType('end');
        }

        if (pickingDateType === 'end') {
          onChange(normalizeRange([fromDate, date]));
          handleClose();
        }
      }}
      {...props}
    />
  );
}
