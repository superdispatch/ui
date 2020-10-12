import { BaseTextFieldProps, InputBaseProps } from '@material-ui/core';
import React, { forwardRef, ReactNode, useMemo, useRef } from 'react';

import {
  BaseDatePicker,
  InternalBaseDateFieldAPI,
} from '../base-date-picker/BaseDatePicker';
import { Calendar, CalendarProps } from '../calendar/Calendar';
import { useDateConfig } from '../date-config/DateConfig';
import {
  DateDisplayVariant,
  DateFormat,
  DatePayload,
  formatDate,
  NullableDateInput,
  toDatePayload,
  toPrimitiveDateInput,
} from '../date-time-utils/DateTimeUtils';

export interface DateFieldAPI extends DatePayload {
  close: () => void;
  change: (value: NullableDateInput) => void;
}

export interface DateFieldProps
  extends Pick<
    BaseTextFieldProps,
    | 'disabled'
    | 'error'
    | 'fullWidth'
    | 'helperText'
    | 'id'
    | 'label'
    | 'name'
    | 'onClick'
    | 'onKeyDown'
    | 'placeholder'
    | 'required'
  > {
  format?: DateFormat;
  value?: NullableDateInput;

  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (event: DatePayload) => void;

  fallback?: string;
  variant?: DateDisplayVariant;
  enableClearable?: boolean;
  disableCloseOnSelect?: boolean;
  renderFooter?: (api: DateFieldAPI) => ReactNode;
  renderQuickSelection?: (api: DateFieldAPI) => ReactNode;

  InputProps?: Pick<InputBaseProps, 'startAdornment'>;
  CalendarProps?: Omit<
    CalendarProps,
    | 'classes'
    | 'footer'
    | 'initialMonth'
    | 'initialTime'
    | 'numberOfMonths'
    | 'quickSelection'
    | 'selectedDays'
  >;
}

export const DateField = forwardRef<HTMLDivElement, DateFieldProps>(
  (
    {
      onBlur,
      onFocus,
      onChange,
      renderFooter,
      renderQuickSelection,

      value: valueProp,
      format: formatProp,

      fallback = '',
      variant = 'Date',

      enableClearable,
      disableCloseOnSelect,

      CalendarProps: { onDayClick, ...calendarProps } = {},
      ...textFieldProps
    },
    ref,
  ) => {
    const input = toPrimitiveDateInput(valueProp);
    const config = useDateConfig({ format: formatProp });
    const apiRef = useRef<InternalBaseDateFieldAPI>(null);

    const { dateValue: date, stringValue: dateString } = useMemo(
      () => toDatePayload(input, config),
      [input, config],
    );
    const displayValue = useMemo(
      () => formatDate(date, { variant, fallback }, config),
      [date, config, variant, fallback],
    );

    const handleClose = () => {
      apiRef.current?.close();
    };

    const handleChange = (nextInput: NullableDateInput) => {
      if (onChange) {
        onChange(toDatePayload(nextInput, config));
      }

      if (!disableCloseOnSelect) {
        handleClose();
      }
    };

    const api: DateFieldAPI = {
      config,
      dateValue: date,
      stringValue: dateString,
      close: handleClose,
      change: handleChange,
    };

    return (
      <BaseDatePicker
        {...textFieldProps}
        ref={ref}
        api={apiRef}
        onClose={onBlur}
        value={displayValue || fallback}
        enableClearable={enableClearable && date.isValid}
        onClear={() => {
          handleChange(undefined);
        }}
      >
        <Calendar
          {...calendarProps}
          initialMonth={date}
          footer={renderFooter?.(api)}
          quickSelection={renderQuickSelection?.(api)}
          selectedDays={({ dateValue }) => date.hasSame(dateValue, 'day')}
          onDayClick={(event) => {
            onDayClick?.(event);
            if (!event.disabled) {
              handleChange(event.dateValue);
            }
          }}
        />
      </BaseDatePicker>
    );
  },
);
