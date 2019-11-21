import React, { useMemo, useState } from 'react';

import { isSameDateRange, normalizeDateRange } from '../calendar/DateUtils';
import {
  CommonDatePickerProps,
  DatePickerBase,
  DatePickerBaseInputComponentProps,
  DatePickerBaseQuickSelectionItem,
  useDatePickerPopoverState,
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

export function DateRangePicker({
  value,
  onChange,
  modifiers,
  onDayClick,
  onDayMouseEnter,
  quickSelectionItems,
  ...props
}: DateRangePickerProps) {
  const { onClose, ...stateProps } = useDatePickerPopoverState();
  const { rangeStart, rangeEnd, ...styles } = useDateRangePickerStyles();
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>(undefined);
  const [pickingDateType, setPickingDateType] = useState<'start' | 'end'>('start');

  const [fromDate, actualToDate] = normalizeDateRange(value);
  const toDate = hoveredDate && pickingDateType === 'end' ? hoveredDate : actualToDate;

  const quickSelectionSelectedItem = useMemo(
    () => quickSelectionItems?.find(item => isSameDateRange(item.value, value)),
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
      value={value}
      onChange={onChange}
      selectedDays={[fromDate, toDate]}
      modifiers={{ ...modifiers, [rangeStart]: fromDate, [rangeEnd]: toDate }}
      quickSelectionItems={quickSelectionItems}
      quickSelectionSelectedItem={quickSelectionSelectedItem}
      onDayMouseEnter={(date, dateModifiers) => {
        onDayMouseEnter?.(date, dateModifiers);
        setHoveredDate(!dateModifiers.disabled ? date : undefined);
      }}
      onDayClick={(date, dateModifiers) => {
        onDayClick?.(date, dateModifiers);

        if (!dateModifiers.disabled) {
          if (pickingDateType === 'start') {
            onChange([date]);
            setPickingDateType('end');
          }

          if (pickingDateType === 'end') {
            onChange(normalizeDateRange([fromDate, date]));
            handleClose();
          }
        }
      }}
      {...props}
    />
  );
}
