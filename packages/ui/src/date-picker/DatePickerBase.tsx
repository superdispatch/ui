import { Popover } from '@material-ui/core';
import { PopoverOrigin } from '@material-ui/core/Popover';
import React, { useState } from 'react';

import {
  Calendar,
  CalendarProps,
  CalendarQuickSelection,
  CalendarQuickSelectionItem,
} from '../calendar/Calendar';

export type DatePickerBaseValue = Date | [Date?, Date?] | undefined;

export type DatePickerBaseInputComponent<TProps> = React.ComponentType<TProps>;

export interface DatePickerBaseInputComponentProps<TValue>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value?: TValue;
}

export interface DatePickerBaseState {
  anchorEl: HTMLInputElement | null;
  onOpen: (event: React.MouseEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

export function useDatePickerBaseState(): DatePickerBaseState {
  const [anchorEl, setAnchorEl] = useState<DatePickerBaseState['anchorEl']>(null);

  return {
    anchorEl,
    onOpen: event => setAnchorEl(event.currentTarget),
    onClose: () => setAnchorEl(null),
  };
}

export interface DatePickerBaseQuickSelectionItem<TValue> {
  label: string;
  value: TValue;
}

export interface DatePickerBaseProps<TValue>
  extends Omit<CalendarProps, 'direction' | 'quickSelection'> {
  value?: TValue;
  quickSelectionItems?: Array<DatePickerBaseQuickSelectionItem<TValue>>;
  quickSelectionSelectedItem?: DatePickerBaseQuickSelectionItem<TValue>;
  InputComponent: DatePickerBaseInputComponent<DatePickerBaseInputComponentProps<TValue>>;
  onChange: (value: TValue) => void;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  disabled?: boolean;
}

export function DatePickerBase<TValue extends DatePickerBaseValue>({
  InputComponent,
  value,
  onChange,
  anchorEl,
  onOpen,
  onClose,
  quickSelectionItems,
  quickSelectionSelectedItem,
  disabled,
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = { vertical: 'top', horizontal: 'left' },
  ...props
}: DatePickerBaseProps<TValue> & DatePickerBaseState) {
  return (
    <>
      <InputComponent onClick={onOpen} value={value} readOnly={true} disabled={disabled} />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        onClose={onClose}
      >
        <Calendar
          {...props}
          direction={anchorOrigin.horizontal === 'right' ? 'row-reverse' : 'row'}
          quickSelection={
            !!quickSelectionItems && (
              <CalendarQuickSelection>
                {quickSelectionItems.map(quickSelectionItem => (
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
