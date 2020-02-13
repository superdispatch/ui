import { OutlinedTextFieldProps, Popover, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Color, mergeRefs } from '@superdispatch/ui';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  useCallback,
  useRef,
  useState,
} from 'react';

import { Calendar, CalendarModifier, CalendarProps } from './Calendar';
import { useDateUtils } from './DateContext';
import { useDatePickerPopoverState } from './DatePickerBase';
import { DateTextField } from './DateTextField';
import { DateRange, isValidDate, toDateRange } from './DateUtils';

const useStyles = makeStyles<Theme>(
  theme => ({
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
    Omit<
      OutlinedTextFieldProps,
      'variant' | 'value' | 'onBlur' | 'onFocus' | 'onChange'
    > {
  hasClearButton?: boolean;
  disableCloseOnSelect?: boolean;

  value?: DateRange;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (value: undefined | DateRange) => void;
  renderFooter?: (api: DateRangeFieldAPI) => ReactNode;
  renderQuickSelection?: (api: DateRangeFieldAPI) => ReactNode;
  CalendarProps?: Omit<
    CalendarProps,
    'footer' | 'selectedDays' | 'quickSelection'
  >;
}

export const DateRangeField: ForwardRefExoticComponent<DateRangeFieldProps> = forwardRef<
  HTMLDivElement,
  DateRangeFieldProps
>(
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
      } = {},
      ...textFieldProps
    },
    ref,
  ) => {
    const utils = useDateUtils();
    const inputRef = useRef<HTMLInputElement>(null);
    const { anchorEl, onOpen, onClose } = useDatePickerPopoverState(inputRef);
    const { rangeStart, rangeEnd, ...styles } = useStyles({
      classes: calendarClasses,
    });
    const value = toDateRange(valueProp);
    const textValue = utils.formatRange(value);
    const [hoveredDate, setHoveredDate] = useState<Date | undefined>(undefined);
    const [startDate, actualFinishDate] = toDateRange(value);
    const finishDate = actualFinishDate || hoveredDate;

    const isStartDate = useCallback<CalendarModifier>(
      date => utils.isSameDate(startDate, date, 'day'),
      [startDate, utils],
    );
    const isFinishDate = useCallback<CalendarModifier>(
      date => utils.isSameDate(finishDate, date, 'day'),
      [finishDate, utils],
    );

    const handleClose = () => {
      onClose();
      setHoveredDate(undefined);
      onBlur?.();
    };

    const handleChange = (nextValue: undefined | DateRange) => {
      const [nextStart, nextFinish] = toDateRange(nextValue);

      onChange?.([nextStart, nextFinish]);

      if (!disableCloseOnSelect && isValidDate(nextFinish)) {
        handleClose();
      }
    };

    const api: DateRangeFieldAPI = {
      value,
      close: handleClose,
      change: handleChange,
    };

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
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <Calendar
            numberOfMonths={2}
            {...calendarProps}
            classes={styles}
            selectedDays={[startDate, finishDate]}
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
                if (startDate && !actualFinishDate) {
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
