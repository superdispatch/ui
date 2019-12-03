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
  MutableRefObject,
  RefAttributes,
  useRef,
} from 'react';

export interface DateTextFieldProps
  extends RefAttributes<HTMLDivElement>,
    Omit<OutlinedTextFieldProps, 'value' | 'variant'> {
  value: string;
  onOpen?: (element: HTMLElement) => void;
}

export const DateTextField: ForwardRefExoticComponent<DateTextFieldProps> = forwardRef<
  HTMLDivElement,
  DateTextFieldProps
>(({ onOpen, onFocus, ...props }, ref) => {
  const fieldRef = useRef<HTMLDivElement | null>(null);

  function handleOpen() {
    if (fieldRef.current) {
      onOpen?.(fieldRef.current);
    }
  }

  return (
    <TextField
      {...props}
      ref={node => {
        fieldRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      onFocus={event => {
        onFocus?.(event);
        if (!event.isDefaultPrevented()) {
          handleOpen();
        }
      }}
      inputProps={{ ...props.inputProps, readOnly: true }}
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
        ...props.InputProps,
      }}
    />
  );
});

if (process.env.NODE_ENV !== 'production') {
  DateTextField.displayName = 'DateTextField';
}
