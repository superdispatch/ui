import {
  OutlinedTextFieldProps,
  Popover,
  PopoverProps,
} from '@material-ui/core';
import { mergeRefs } from '@superdispatch/ui';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  useCallback,
  useRef,
} from 'react';
import { useWhenValueChanges } from 'utility-hooks';

import { Calendar, CalendarModifier, CalendarProps } from './calendar/Calendar';
import { useDatePickerPopoverState } from './DatePickerBase';
import { DateTextField } from './DateTextField';
import { DateFormatVariant, DateLike, isValidDate } from './DateUtils';
import { useFormattedDate } from './FormattedDate';
import { useDate } from './internal/useDate';

interface DateFieldAPI {
  close: () => void;
  value: undefined | Date;
  change: (value: undefined | Date) => void;
}

export interface DateFieldProps
  extends RefAttributes<HTMLDivElement>,
    Omit<
      OutlinedTextFieldProps,
      'variant' | 'value' | 'onBlur' | 'onFocus' | 'onChange'
    > {
  hasClearButton?: boolean;
  disableCloseOnSelect?: boolean;
  value?: DateLike;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (value: undefined | Date) => void;
  format?: DateFormatVariant;
  renderFooter?: (api: DateFieldAPI) => ReactNode;
  renderQuickSelection?: (api: DateFieldAPI) => ReactNode;
  CalendarProps?: Omit<
    CalendarProps,
    'footer' | 'selectedDays' | 'quickSelection'
  >;
  PopoverProps?: Omit<PopoverProps, 'open' | 'anchorEl' | 'onClose'>;
}

export const DateField: ForwardRefExoticComponent<DateFieldProps> = forwardRef<
  HTMLDivElement,
  DateFieldProps
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
      format = 'date',
      hasClearButton = false,
      disableCloseOnSelect = false,
      CalendarProps: { onDayClick, ...calendarProps } = {},
      PopoverProps: {
        anchorOrigin = { vertical: 'bottom', horizontal: 'left' } as const,
        transformOrigin = { vertical: 'top', horizontal: 'left' } as const,
        ...popoverProps
      } = {},
      ...textFieldProps
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { anchorEl, onOpen, onClose } = useDatePickerPopoverState(inputRef);
    const value = useDate(valueProp, 'second');
    const formatted = useFormattedDate(value, format);
    const textValue = !isValidDate(value) ? '' : formatted;

    const isSelectedDay = useCallback<CalendarModifier>(
      (date, utils) => utils.isSameDate(date, value, 'day'),
      [value],
    );

    const handleChange = (nextValue: undefined | Date) => {
      onChange?.(nextValue);

      if (!disableCloseOnSelect) {
        onClose();
      }
    };

    const api: DateFieldAPI = {
      value,
      close: onClose,
      change: handleChange,
    };

    useWhenValueChanges(anchorEl, () => {
      if (onBlur && !anchorEl) {
        onBlur();
      }
    });

    return (
      <>
        <DateTextField
          {...textFieldProps}
          ref={ref}
          inputRef={mergeRefs(inputRef, inputRefProp)}
          value={textValue}
          onOpen={onOpen}
          onClear={
            !onChange || !textValue || !hasClearButton
              ? undefined
              : () => {
                  onChange(undefined);
                }
          }
        />

        <Popover
          {...popoverProps}
          open={!!anchorEl}
          onClose={onClose}
          anchorEl={anchorEl}
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
        >
          <Calendar
            {...calendarProps}
            initialMonth={value}
            selectedDays={isSelectedDay}
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
  },
);
