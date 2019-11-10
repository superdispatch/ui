import { Popover } from '@material-ui/core';
import { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import React, { ReactNode, useMemo, useState } from 'react';

import { Calendar, CalendarProps } from '../calendar/Calendar';
import { useDatePickerPopoverState } from './DatePickerBase';
import { useDateRangePickerStyles } from './DateRangePickerStyles';
import { DateTextField } from './DateTextField';
import { formatDateRange, normalizeDateRange } from './DateUtils';

interface DateRangeFieldAPI {
  close: () => void;
  change: (value: undefined | [Date?, Date?]) => void;
}

export interface DateRangeFieldProps
  extends Omit<OutlinedTextFieldProps, 'variant' | 'value' | 'onBlur' | 'onFocus' | 'onChange'> {
  value: undefined | [Date?, Date?];
  onBlur?: () => void;
  onFocus?: () => void;
  onChange: (value: undefined | [Date?, Date?]) => void;
  renderFooter?: (api: DateRangeFieldAPI) => ReactNode;
  renderQuickSelection?: (api: DateRangeFieldAPI) => ReactNode;
  CalendarProps?: Omit<CalendarProps, 'footer' | 'selectedDays' | 'quickSelection'>;
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

    if (onBlur) {
      onBlur();
    }
  };

  const handleChange = (nextValue: undefined | [Date?, Date?]) => {
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
      <DateTextField
        {...textFieldProps}
        value={textValue}
        onFocus={event => onOpen(event.currentTarget)}
      />

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
          modifiers={{ ...modifiers, [rangeStart]: fromDate, [rangeEnd]: toDate }}
          footer={renderFooter?.(api)}
          quickSelection={renderQuickSelection?.(api)}
          onDayMouseEnter={(date, dateModifiers) => {
            // TODO: Enable after https://github.com/typescript-eslint/typescript-eslint/pull/1169 release
            // eslint-disable-next-line no-unused-expressions
            onDayMouseEnter?.(date, dateModifiers);
            setHoveredDate(!dateModifiers.disabled ? date : undefined);
          }}
          onDayClick={(date, dateModifiers) => {
            if (onDayClick) {
              onDayClick(date, dateModifiers);
            }

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
