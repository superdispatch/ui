import { Popover } from '@material-ui/core';
import { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import React, { ReactNode, useMemo, useState } from 'react';

import { Calendar, CalendarProps } from '../calendar/Calendar';
import {
  DateRange,
  formatDateRange,
  normalizeDateRange,
} from '../calendar/DateUtils';
import { useDatePickerPopoverState } from './DatePickerBase';
import { useDateRangePickerStyles } from './DateRangePickerStyles';
import { DateTextField } from './DateTextField';

interface DateRangeFieldAPI {
  close: () => void;
  change: (value: undefined | DateRange) => void;
}

export interface DateRangeFieldProps
  extends Omit<
    OutlinedTextFieldProps,
    'variant' | 'value' | 'onBlur' | 'onFocus' | 'onChange'
  > {
  value: undefined | DateRange;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange: (value: undefined | DateRange) => void;
  renderFooter?: (api: DateRangeFieldAPI) => ReactNode;
  renderQuickSelection?: (api: DateRangeFieldAPI) => ReactNode;
  CalendarProps?: Omit<
    CalendarProps,
    'footer' | 'selectedDays' | 'quickSelection'
  >;
}

export function DateRangeField({
  value,
  onBlur,
  onFocus,
  onChange,
  renderFooter,
  renderQuickSelection,
  CalendarProps: {
    modifiers,
    onDayClick,
    onDayMouseEnter,
    classes: calendarClasses,
    ...calendarProps
  } = {},
  ...textFieldProps
}: DateRangeFieldProps) {
  const { anchorEl, onOpen, onClose } = useDatePickerPopoverState();
  const { rangeStart, rangeEnd, ...styles } = useDateRangePickerStyles({
    classes: calendarClasses,
  });
  const textValue = useMemo(() => formatDateRange(value), [value]);
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>(undefined);
  const [fromDate, actualToDate] = normalizeDateRange(value);
  const toDate = actualToDate || hoveredDate;

  const handleClose = () => {
    onClose();
    setHoveredDate(undefined);
    onBlur?.();
  };

  const handleChange = (nextValue: undefined | DateRange) => {
    const nextRange = normalizeDateRange(nextValue);

    onChange(nextRange);

    if (nextRange.length === 2) {
      handleClose();
    }
  };

  const api: DateRangeFieldAPI = {
    close: handleClose,
    change: handleChange,
  };

  return (
    <>
      <DateTextField {...textFieldProps} value={textValue} onOpen={onOpen} />

      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableRestoreFocus={true}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Calendar
          numberOfMonths={2}
          {...calendarProps}
          classes={styles}
          selectedDays={[fromDate, toDate]}
          modifiers={{
            ...modifiers,
            [rangeStart]: fromDate,
            [rangeEnd]: toDate,
          }}
          footer={renderFooter?.(api)}
          quickSelection={renderQuickSelection?.(api)}
          onDayMouseEnter={(date, dateModifiers) => {
            onDayMouseEnter?.(date, dateModifiers);
            setHoveredDate(!dateModifiers.disabled ? date : undefined);
          }}
          onDayClick={(date, dateModifiers) => {
            onDayClick?.(date, dateModifiers);

            if (!dateModifiers.disabled) {
              if (fromDate && !actualToDate) {
                handleChange([fromDate, date]);
              } else {
                handleChange([date]);
              }
            }
          }}
        />
      </Popover>
    </>
  );
}
