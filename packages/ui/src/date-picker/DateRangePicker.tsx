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

export function DateRangePicker({
  value,
  onChange,
  quickSelectionItems,
  ...props
}: DateRangePickerProps) {
  const { onClose, ...stateProps } = useDatePickerBaseState();
  const { firstDayOfRange, lastDayOfRange, ...styles } = useDateRangePickerStyles();
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>(undefined);
  const [pickingDateType, setPickingDateType] = useState<'start' | 'end'>('start');

  const fromDate = value && value[0];
  const toDate = pickingDateType === 'end' ? hoveredDate : value && value[1];
  const selectedDays = useMemo(() => fromDate && toDate && { from: fromDate, to: toDate }, [
    fromDate,
    toDate,
  ]);
  const modifiers = useMemo(() => ({ [firstDayOfRange]: fromDate, [lastDayOfRange]: toDate }), [
    firstDayOfRange,
    fromDate,
    lastDayOfRange,
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
      onChange={onChange}
      modifiers={modifiers}
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
