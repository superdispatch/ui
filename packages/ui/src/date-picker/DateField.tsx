import { Popover } from '@material-ui/core';
import { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import React, { ReactNode, useMemo } from 'react';

import { Calendar, CalendarProps } from '../calendar/Calendar';
import { formatDate } from '../calendar/DateUtils';
import { useDatePickerPopoverState } from './DatePickerBase';
import { DateTextField } from './DateTextField';

interface DateFieldAPI {
  close: () => void;
  change: (value: undefined | Date) => void;
}

export interface DateFieldProps
  extends Omit<
    OutlinedTextFieldProps,
    'variant' | 'value' | 'onBlur' | 'onFocus' | 'onChange'
  > {
  value: undefined | Date;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange: (value: undefined | Date) => void;
  renderFooter?: (api: DateFieldAPI) => ReactNode;
  renderQuickSelection?: (api: DateFieldAPI) => ReactNode;
  CalendarProps?: Omit<
    CalendarProps,
    'footer' | 'selectedDays' | 'quickSelection'
  >;
}

export function DateField({
  value,
  onBlur,
  onFocus,
  onChange,
  renderFooter,
  renderQuickSelection,
  CalendarProps: { onDayClick, ...calendarProps } = {},
  ...textFieldProps
}: DateFieldProps) {
  const { anchorEl, onOpen, onClose } = useDatePickerPopoverState();
  const textValue = useMemo(() => formatDate(value), [value]);

  const handleClose = () => {
    onClose();
    onBlur?.();
  };

  const handleChange = (nextValue: undefined | Date) => {
    onChange(nextValue);
    handleClose();
  };

  const api: DateFieldAPI = {
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
          {...calendarProps}
          selectedDays={[value, undefined]}
          footer={renderFooter?.(api)}
          quickSelection={renderQuickSelection?.(api)}
          onDayClick={(day, modifiers) => {
            onDayClick?.(day, modifiers);
            if (!modifiers.disabled) {
              handleChange(day);
            }
          }}
        />
      </Popover>
    </>
  );
}
