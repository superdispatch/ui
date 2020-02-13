import {
  IconButton,
  InputAdornment,
  OutlinedTextFieldProps,
  SvgIcon,
  TextField,
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { mdiCalendarMonth } from '@mdi/js';
import { mergeRefs } from '@superdispatch/ui';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useRef,
} from 'react';

export interface DateTextFieldProps
  extends RefAttributes<HTMLDivElement>,
    Omit<OutlinedTextFieldProps, 'value' | 'variant'> {
  value: string;
  onClear?: () => void;
  onOpen?: (element: HTMLElement) => void;
}

export const DateTextField: ForwardRefExoticComponent<DateTextFieldProps> = forwardRef<
  HTMLDivElement,
  DateTextFieldProps
>(({ onOpen, onClear, onClick, disabled, ...props }, ref) => {
  const anchorRef = useRef<HTMLDivElement | null>(null);

  function handleOpen() {
    if (!disabled && anchorRef.current) {
      onOpen?.(anchorRef.current);
    }
  }

  return (
    <TextField
      {...props}
      disabled={disabled}
      ref={mergeRefs(ref, anchorRef)}
      onClick={event => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          handleOpen();
        }
      }}
      onKeyDown={event => {
        if (event.key === ' ' || event.key === 'Enter') {
          handleOpen();
        }
      }}
      inputProps={{ ...props.inputProps, readOnly: true }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {onClear != null ? (
              <IconButton
                disabled={disabled}
                onClick={event => {
                  // Do not bubble up clicks.
                  event.stopPropagation();

                  onClear();
                }}
              >
                <Clear />
              </IconButton>
            ) : (
              <IconButton disabled={disabled}>
                <SvgIcon>
                  <path d={mdiCalendarMonth} />
                </SvgIcon>
              </IconButton>
            )}
          </InputAdornment>
        ),
        ...props.InputProps,
      }}
    />
  );
});
