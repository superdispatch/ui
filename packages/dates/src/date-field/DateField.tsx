import { BaseTextFieldProps, InputBaseProps } from '@material-ui/core';
import { forwardRef, ReactNode, useMemo, useRef } from 'react';
import {
  BaseDatePicker,
  InternalBaseDateFieldAPI,
} from '../base-date-picker/BaseDatePicker';
import { Calendar, CalendarProps } from '../calendar/Calendar';
import { DateFormat, useDateConfig } from '../date-config/DateConfig';
import {
  DateDisplayVariant,
  DatePayload,
  NullableDateInput,
  stringifyDate,
  toDatePayload,
} from '../date-time-utils/DateTimeUtils';
import { useFormattedDate } from '../formatted-date/FormattedDate';
import { useDateTime } from '../use-date-time/useDateTime';

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

  InputProps?: Pick<
    InputBaseProps,
    'aria-label' | 'aria-labelledby' | 'startAdornment'
  >;
  CalendarProps?: Omit<
    CalendarProps,
    | 'classes'
    | 'footer'
    | 'initialMonth'
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
    const config = useDateConfig({ format: formatProp });
    const apiRef = useRef<InternalBaseDateFieldAPI>(null);

    const date = useDateTime(valueProp, config);
    const displayValue = useFormattedDate(date, {
      variant,
      fallback,
      ...config,
    });
    const dateString = useMemo(() => stringifyDate(date, config), [
      date,
      config,
    ]);

    function handleClose(): void {
      apiRef.current?.close();
    }

    function handleChange(nextInput: NullableDateInput): void {
      if (onChange) {
        onChange(toDatePayload(nextInput, config));
      }

      if (!disableCloseOnSelect) {
        handleClose();
      }
    }

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
