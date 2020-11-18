import { BaseTextFieldProps, InputBaseProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Color, SuperDispatchTheme } from '@superdispatch/ui';
import React, { forwardRef, ReactNode, useMemo, useRef, useState } from 'react';

import {
  BaseDatePicker,
  InternalBaseDateFieldAPI,
} from '../base-date-picker/BaseDatePicker';
import {
  Calendar,
  CalendarClassNames,
  CalendarProps,
} from '../calendar/Calendar';
import { DateFormat, useDateConfig } from '../date-config/DateConfig';
import {
  DateRangePayload,
  formatDateRange,
  NullableDateRangeInput,
  parseDateRange,
  stringifyDateRange,
  toDateRangePayload,
} from '../date-time-utils/DateTimeUtils';
import { useDateTimeRange } from '../use-date-time-range/useDateTimeRange';

const useStyles = makeStyles<
  SuperDispatchTheme,
  CalendarProps,
  | 'rangeStart'
  | 'rangeFinish'
  | Extract<CalendarClassNames, 'outside' | 'disabled' | 'selected' | 'day'>
>(
  (theme) => ({
    rangeStart: {},
    rangeFinish: {},

    outside: {},
    disabled: {},
    selected: {},

    day: {
      '&$selected:not($outside)': {
        '&$rangeStart:before': {
          left: theme.spacing(0.5),
        },

        '&$rangeFinish:before': {
          right: theme.spacing(0.5),
        },

        '&:not($rangeStart):not($rangeFinish)': {
          '&:after': {
            backgroundColor: Color.Transparent,
          },

          '&$disabled': {
            '&:before': {
              backgroundColor: Color.Silver100,
            },
          },

          '&:not($disabled)': {
            color: Color.Blue500,

            '&:before': {
              backgroundColor: Color.Blue50,
            },
          },
        },
      },
    },
  }),
  { name: 'SD-DateRangeField' },
);

interface DateRangeFieldAPI extends DateRangePayload {
  close: () => void;
  change: (value: NullableDateRangeInput) => void;
}

export interface DateRangeFieldProps
  extends Pick<
    BaseTextFieldProps,
    | 'disabled'
    | 'error'
    | 'fullWidth'
    | 'helperText'
    | 'id'
    | 'label'
    | 'name'
    | 'required'
    | 'placeholder'
  > {
  fallback?: string;
  enableClearable?: boolean;
  disableCloseOnSelect?: boolean;

  format?: DateFormat;
  value?: NullableDateRangeInput;

  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (value: DateRangePayload) => void;

  renderFooter?: (api: DateRangeFieldAPI) => ReactNode;
  renderQuickSelection?: (api: DateRangeFieldAPI) => ReactNode;

  InputProps?: Pick<
    InputBaseProps,
    'aria-label' | 'aria-labelledby' | 'startAdornment'
  >;
  CalendarProps?: Omit<
    CalendarProps,
    'footer' | 'classes' | 'selectedDays' | 'quickSelection' | 'numberOfMonths'
  >;
}

export const DateRangeField = forwardRef<HTMLDivElement, DateRangeFieldProps>(
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

      enableClearable,
      disableCloseOnSelect,

      CalendarProps: {
        modifiers,
        onDayClick,
        onDayMouseEnter,
        ...calendarProps
      } = {} as const,

      ...textFieldProps
    },
    ref,
  ) => {
    const apiRef = useRef<InternalBaseDateFieldAPI>(null);
    const { rangeStart, rangeFinish, ...styles } = useStyles({});

    const config = useDateConfig({ format: formatProp });
    const [startDate, finishDate] = useDateTimeRange(valueProp, config);
    const [startDateString, finishDateString] = useMemo(
      () => stringifyDateRange([startDate, finishDate], config),
      [config, startDate, finishDate],
    );
    const displayValue = useMemo(
      () => formatDateRange([startDate, finishDate], { fallback }, config),
      [config, fallback, startDate, finishDate],
    );

    const [hoveredDate, setHoveredDate] = useState<number>();
    const [calendarStartDate, calendarFinishDate] = useMemo(() => {
      const [nextCalendarStartDate, nextCalendarFinishDate] = parseDateRange(
        [startDate, finishDate || hoveredDate],
        config,
      );

      return [
        nextCalendarStartDate?.startOf('day'),
        nextCalendarFinishDate?.endOf('day'),
      ];
    }, [config, startDate, finishDate, hoveredDate]);

    function handleClose(): void {
      apiRef.current?.close();
    }

    function handleChange(nextValue: NullableDateRangeInput): void {
      let [nextStartDate, nextFinishDate] = parseDateRange(nextValue, config);

      if (onChange) {
        if (nextStartDate) {
          if (startDate) {
            nextStartDate = nextStartDate.set({
              hour: startDate.hour,
              minute: startDate.minute,
              second: startDate.second,
              millisecond: startDate.millisecond,
            });
          } else {
            nextStartDate = nextStartDate.startOf('day');
          }
        }

        if (nextFinishDate) {
          nextFinishDate = nextFinishDate.endOf('day');
        }

        onChange(toDateRangePayload([nextStartDate, nextFinishDate], config));
      }

      if (!disableCloseOnSelect && nextFinishDate?.isValid) {
        handleClose();
      }
    }

    const api: DateRangeFieldAPI = {
      config,
      close: handleClose,
      change: handleChange,
      dateValue: [startDate, finishDate],
      stringValue: [startDateString, finishDateString],
    };

    return (
      <BaseDatePicker
        {...textFieldProps}
        ref={ref}
        api={apiRef}
        value={displayValue || fallback}
        enableClearable={enableClearable && !!startDate && !!finishDate}
        onClear={() => {
          handleChange([undefined, undefined]);
        }}
        onClose={() => {
          onBlur?.();
          setHoveredDate(undefined);
        }}
      >
        <Calendar
          numberOfMonths={2}
          {...calendarProps}
          classes={styles}
          initialMonth={startDateString}
          modifiers={{
            ...modifiers,
            [rangeStart]: ({ dateValue }) =>
              !!calendarStartDate?.hasSame(dateValue, 'day'),
            [rangeFinish]: ({ dateValue }) =>
              !!calendarFinishDate?.hasSame(dateValue, 'day'),
          }}
          selectedDays={({ dateValue }) => {
            if (calendarStartDate) {
              if (!calendarFinishDate) {
                return calendarStartDate.hasSame(dateValue, 'day');
              }

              return (
                calendarStartDate <= dateValue &&
                dateValue <= calendarFinishDate
              );
            }

            return false;
          }}
          footer={renderFooter?.(api)}
          quickSelection={renderQuickSelection?.(api)}
          onDayMouseEnter={(event) => {
            onDayMouseEnter?.(event);
            setHoveredDate(
              !event.disabled ? event.dateValue.valueOf() : undefined,
            );
          }}
          onDayClick={(event) => {
            onDayClick?.(event);

            if (!event.disabled) {
              if (startDate && !finishDate) {
                handleChange([startDateString, event.stringValue]);
              } else {
                handleChange([event.stringValue, undefined]);
              }
            }
          }}
        />
      </BaseDatePicker>
    );
  },
);
