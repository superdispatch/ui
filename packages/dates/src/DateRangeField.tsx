import { OutlinedTextFieldProps, Popover } from '@material-ui/core';
import { mergeRefs } from '@superdispatch/ui';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  useRef,
  useState,
} from 'react';

import { Calendar, CalendarProps } from './Calendar';
import { useDateUtils } from './DateContext';
import { useDatePickerPopoverState } from './DatePickerBase';
import { useDateRangePickerStyles } from './DateRangePickerStyles';
import { DateTextField } from './DateTextField';
import { DateRange, isValidDate, toDateRange } from './DateUtils';

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
      hasClearButton = false,
      value: valueProp,
      inputRef: inputRefProp,
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
    const { rangeStart, rangeEnd, ...styles } = useDateRangePickerStyles({
      classes: calendarClasses,
    });
    const value = toDateRange(valueProp);
    const textValue = utils.formatRange(value);
    const [hoveredDate, setHoveredDate] = useState<Date | undefined>(undefined);
    const [startDate, actualFinishDate] = toDateRange(value);
    const finishDate = actualFinishDate || hoveredDate;

    const handleClose = () => {
      onClose();
      setHoveredDate(undefined);
      onBlur?.();
    };

    const handleChange = (nextValue: undefined | DateRange) => {
      const [nextStart, nextFinish] = toDateRange(nextValue);

      onChange?.([nextStart, nextFinish]);

      if (isValidDate(nextFinish)) {
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
              [rangeStart]: startDate,
              [rangeEnd]: finishDate,
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
