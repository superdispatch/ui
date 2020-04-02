import {
  Popover,
  PopoverProps,
  StandardTextFieldProps,
  Theme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Color, mergeRefs } from '@superdispatch/ui';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Calendar, CalendarModifier, CalendarProps } from './calendar/Calendar';
import { useDateUtils } from './DateContext';
import { useDatePickerPopoverState } from './DatePickerBase';
import { DateTextField } from './DateTextField';
import {
  DateRange,
  isValidDate,
  NullableDateRangeLike,
  toDateRange,
} from './DateUtils';

const useStyles = makeStyles<Theme>(
  (theme) => ({
    outside: {},
    disabled: {},
    selected: {},
    rangeStart: {},
    rangeEnd: {},

    day: {
      '&$selected:not($outside)': {
        '&$rangeStart:before': { left: theme.spacing(0.5) },
        '&$rangeEnd:before': { right: theme.spacing(0.5) },
        '&:not($rangeStart):not($rangeEnd)': {
          '&:after': { backgroundColor: Color.Transparent },
          '&$disabled': { '&:before': { backgroundColor: Color.Silver100 } },
          '&:not($disabled)': {
            color: Color.Blue500,
            '&:before': { backgroundColor: Color.Blue50 },
          },
        },
      },
    },
  }),
  { name: 'SuperDispatchDateRangeField' },
);

interface DateRangeFieldAPI {
  value: DateRange;
  close: () => void;
  change: (value: undefined | DateRange) => void;
}

export interface DateRangeFieldProps
  extends RefAttributes<HTMLDivElement>,
    Omit<StandardTextFieldProps, 'value' | 'onBlur' | 'onFocus' | 'onChange'> {
  hasClearButton?: boolean;
  disableCloseOnSelect?: boolean;

  value?: NullableDateRangeLike;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (value: undefined | DateRange) => void;
  renderFooter?: (api: DateRangeFieldAPI) => ReactNode;
  renderQuickSelection?: (api: DateRangeFieldAPI) => ReactNode;
  CalendarProps?: Omit<
    CalendarProps,
    'footer' | 'selectedDays' | 'quickSelection'
  >;
  PopoverProps?: Omit<PopoverProps, 'open' | 'anchorEl' | 'onClose'>;
}

export const DateRangeField: ForwardRefExoticComponent<DateRangeFieldProps> = forwardRef(
  (
    {
      onBlur,
      onFocus,
      onChange,
      renderFooter,
      renderQuickSelection,
      value: valueProp,
      inputRef: inputRefProp,
      hasClearButton = false,
      disableCloseOnSelect = false,
      CalendarProps: {
        modifiers,
        onDayClick,
        onDayMouseEnter,
        classes: calendarClasses,
        ...calendarProps
      } = {} as const,
      PopoverProps: {
        anchorOrigin = { vertical: 'bottom', horizontal: 'left' } as const,
        transformOrigin = { vertical: 'top', horizontal: 'left' } as const,
        ...popoverProps
      } = {},
      ...textFieldProps
    },
    ref,
  ) => {
    const dateUtils = useDateUtils();
    const inputRef = useRef<HTMLInputElement>(null);
    const { anchorEl, onOpen, onClose } = useDatePickerPopoverState(inputRef);
    const { rangeStart, rangeEnd, ...styles } = useStyles({
      classes: calendarClasses,
    });
    const value = toDateRange(valueProp);
    const [startDate, finishDateProp] = value;

    const [hoveredDate, setHoveredDate] = useState<Date | undefined>(undefined);
    const finishDate = finishDateProp || hoveredDate;

    const absoluteStartDate = useMemo(
      () =>
        !isValidDate(startDate)
          ? undefined
          : dateUtils.startOf(startDate, 'day'),
      [dateUtils, startDate],
    );

    const absoluteFinishDate = useMemo(
      () =>
        !isValidDate(finishDate)
          ? undefined
          : dateUtils.endOf(finishDate, 'day'),
      [dateUtils, finishDate],
    );

    const isSelectedDate = useCallback<CalendarModifier>(
      (date, utils) => {
        if (absoluteStartDate && absoluteFinishDate) {
          return date >= absoluteStartDate && date <= absoluteFinishDate;
        }

        if (absoluteStartDate && !absoluteFinishDate) {
          return utils.isSameDate(date, absoluteStartDate, 'day');
        }

        return false;
      },
      [absoluteFinishDate, absoluteStartDate],
    );
    const isStartDate = useCallback<CalendarModifier>(
      (date, utils) => utils.isSameDate(startDate, date, 'day'),
      [startDate],
    );
    const isFinishDate = useCallback<CalendarModifier>(
      (date, utils) => utils.isSameDate(finishDate, date, 'day'),
      [finishDate],
    );

    const handleClose = () => {
      onClose();
      setHoveredDate(undefined);
      onBlur?.();
    };

    const handleChange = (nextValue: undefined | DateRange) => {
      const [nextStartValue, nextFinishValue] = toDateRange(nextValue);

      onChange?.([
        !isValidDate(nextStartValue)
          ? undefined
          : isValidDate(startDate)
          ? dateUtils.mergeDateAndTime(nextStartValue, startDate)
          : dateUtils.startOf(nextStartValue, 'day'),
        !isValidDate(nextFinishValue)
          ? undefined
          : dateUtils.endOf(nextFinishValue, 'day'),
      ]);

      if (!disableCloseOnSelect && isValidDate(nextFinishValue)) {
        handleClose();
      }
    };

    const api: DateRangeFieldAPI = {
      value,
      close: handleClose,
      change: handleChange,
    };

    const textValue = dateUtils.formatRange(value);

    return (
      <>
        <DateTextField
          {...textFieldProps}
          ref={ref}
          inputRef={mergeRefs(inputRef, inputRefProp)}
          value={textValue}
          onOpen={onOpen}
          onClear={
            !textValue || !hasClearButton
              ? undefined
              : () => onChange?.(undefined)
          }
        />

        <Popover
          {...popoverProps}
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
        >
          <Calendar
            numberOfMonths={2}
            {...calendarProps}
            classes={styles}
            initialMonth={startDate}
            selectedDays={isSelectedDate}
            modifiers={{
              ...modifiers,
              [rangeStart]: isStartDate,
              [rangeEnd]: isFinishDate,
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
                if (startDate && !finishDateProp) {
                  handleChange([startDate, date]);
                } else {
                  handleChange([date]);
                }
              }
            }}
          />
        </Popover>
      </>
    );
  },
);
