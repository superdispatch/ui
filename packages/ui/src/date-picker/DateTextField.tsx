import {
  IconButton,
  InputAdornment,
  SvgIcon,
  TextField,
} from '@material-ui/core';
import { OutlinedTextFieldProps } from '@material-ui/core/TextField';
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
  onOpen?: (element: HTMLElement) => void;
}

export const DateTextField: ForwardRefExoticComponent<DateTextFieldProps> = forwardRef<
  HTMLDivElement,
  DateTextFieldProps
>((props, ref) => {
  const { onOpen, onFocus, ...fieldProps } = props;
  const anchorRef = useRef<HTMLDivElement | null>(null);

  function handleOpen() {
    if (anchorRef.current) {
      onOpen?.(anchorRef.current);
    }
  }

  return (
    <TextField
      {...fieldProps}
      ref={mergeRefs(ref, anchorRef)}
      onFocus={event => {
        onFocus?.(event);
        if (!event.isDefaultPrevented()) {
          handleOpen();
        }
      }}
      inputProps={{ ...fieldProps.inputProps, readOnly: true }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton size="medium" onClick={handleOpen}>
              <SvgIcon>
                <path d={mdiCalendarMonth} />
              </SvgIcon>
            </IconButton>
          </InputAdornment>
        ),
        ...fieldProps.InputProps,
      }}
    />
  );
});

if (process.env.NODE_ENV !== 'production') {
  DateTextField.displayName = 'DateTextField';
}
