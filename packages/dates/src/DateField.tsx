import { OutlinedTextFieldProps, Popover } from '@material-ui/core';
import { mergeRefs } from '@superdispatch/ui';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  useRef,
} from 'react';

import { Calendar, CalendarProps } from './Calendar';
import { useDatePickerPopoverState } from './DatePickerBase';
import { DateTextField } from './DateTextField';
import { DateLike, isValidDate } from './DateUtils';
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
  renderFooter?: (api: DateFieldAPI) => ReactNode;
  renderQuickSelection?: (api: DateFieldAPI) => ReactNode;
  CalendarProps?: Omit<
    CalendarProps,
    'footer' | 'selectedDays' | 'quickSelection'
  >;
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
      hasClearButton = false,
      disableCloseOnSelect = false,
      value: valueProp,
      inputRef: inputRefProp,
      CalendarProps: { onDayClick, ...calendarProps } = {},
      ...textFieldProps
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { anchorEl, onOpen, onClose } = useDatePickerPopoverState(inputRef);
    const value = useDate(valueProp, 'second');
    const formatted = useFormattedDate(value, 'date');
    const textValue = !isValidDate(value) ? '' : formatted;

    const handleClose = () => {
      onClose();
      onBlur?.();
    };

    const handleChange = (nextValue: undefined | Date) => {
      onChange?.(nextValue);

      if (!disableCloseOnSelect) {
        handleClose();
      }
    };

    const api: DateFieldAPI = {
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
            {...calendarProps}
            selectedDays={[value]}
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
