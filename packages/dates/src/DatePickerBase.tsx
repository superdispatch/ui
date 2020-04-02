import { Popover, PopoverOrigin } from '@material-ui/core';
import React, {
  ComponentType,
  InputHTMLAttributes,
  RefObject,
  useState,
} from 'react';
import { useEventCallback } from 'utility-hooks';

import { Calendar, CalendarProps } from './calendar/Calendar';
import { CalendarQuickSelection } from './calendar/CalendarQuickSelection';
import { CalendarQuickSelectionItem } from './calendar/CalendarQuickSelectionItem';
import { DateRange } from './DateUtils';

export type DatePickerBaseValue = undefined | Date | DateRange;
export type DatePickerBaseInputComponent<TProps> = ComponentType<TProps>;

export interface DatePickerBaseInputComponentProps<TValue>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value?: TValue;
}

export interface DatePickerPopoverState {
  anchorEl: HTMLElement | null;
  onOpen: (anchorEl: HTMLElement) => void;
  onClose: () => void;
}

export function useDatePickerPopoverState(
  inputRef?: RefObject<null | HTMLInputElement>,
): DatePickerPopoverState {
  const [anchorEl, setAnchorEl] = useState<DatePickerPopoverState['anchorEl']>(
    null,
  );

  const onOpen = useEventCallback((next: HTMLElement) => {
    inputRef?.current?.focus();
    setAnchorEl(next);
  });

  const onClose = useEventCallback(() => {
    setAnchorEl(null);
  });

  return { onOpen, onClose, anchorEl };
}

export interface DatePickerBaseQuickSelectionItem<TValue> {
  label: string;
  value: TValue;
}

export interface CommonDatePickerProps<TValue>
  extends Omit<CalendarProps, 'direction' | 'quickSelection'> {
  value?: TValue;
  quickSelectionItems?: Array<DatePickerBaseQuickSelectionItem<TValue>>;
  quickSelectionSelectedItem?: DatePickerBaseQuickSelectionItem<TValue>;
  InputComponent: DatePickerBaseInputComponent<
    DatePickerBaseInputComponentProps<TValue>
  >;
  onChange: (value: TValue) => void;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  disabled?: boolean;
}

export type DatePickerBaseProps<TValue> = DatePickerPopoverState &
  CommonDatePickerProps<TValue>;

export function DatePickerBase<TValue extends DatePickerBaseValue>({
  // Input
  value,
  onOpen,
  onChange,
  disabled,
  InputComponent,

  // Popover
  anchorEl,
  onClose,
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = { vertical: 'top', horizontal: 'left' },

  // Calendar
  quickSelectionItems,
  quickSelectionSelectedItem,
  ...calendarProps
}: DatePickerBaseProps<TValue>) {
  return (
    <>
      <InputComponent
        value={value}
        readOnly={true}
        disabled={disabled}
        onClick={(event) => onOpen(event.currentTarget)}
      />

      <Popover
        open={!!anchorEl}
        onClose={onClose}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        <Calendar
          {...calendarProps}
          direction={
            anchorOrigin.horizontal === 'right' ? 'row-reverse' : 'row'
          }
          quickSelection={
            !!quickSelectionItems && (
              <CalendarQuickSelection>
                {quickSelectionItems.map((quickSelectionItem) => (
                  <CalendarQuickSelectionItem
                    key={quickSelectionItem.label}
                    selected={quickSelectionSelectedItem === quickSelectionItem}
                    onClick={() => {
                      onChange(quickSelectionItem.value);
                      onClose();
                    }}
                  >
                    {quickSelectionItem.label}
                  </CalendarQuickSelectionItem>
                ))}
              </CalendarQuickSelection>
            )
          }
        />
      </Popover>
    </>
  );
}
