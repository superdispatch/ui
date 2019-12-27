import {
  IconButton,
  InputAdornment,
  SvgIcon,
  TextField,
} from '@material-ui/core';
import { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import { Clear } from '@material-ui/icons';
import { mdiCalendarMonth } from '@mdi/js';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useRef,
} from 'react';

import { mergeRefs } from '../utils/mergeRefs';

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
>((props, ref) => {
  const { onOpen, onClear, onClick, ...other } = props;
  const anchorRef = useRef<HTMLDivElement | null>(null);

  function handleOpen() {
    if (anchorRef.current) {
      onOpen?.(anchorRef.current);
    }
  }

  return (
    <TextField
      {...other}
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
      inputProps={{ ...other.inputProps, readOnly: true }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {onClear != null ? (
              <IconButton
                onClick={event => {
                  // Do not bubble up clicks.
                  event.stopPropagation();

                  onClear();
                }}
              >
                <Clear />
              </IconButton>
            ) : (
              <IconButton>
                <SvgIcon>
                  <path d={mdiCalendarMonth} />
                </SvgIcon>
              </IconButton>
            )}
          </InputAdornment>
        ),
        ...other.InputProps,
      }}
    />
  );
});
