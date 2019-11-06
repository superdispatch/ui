import { InputAdornment, SvgIcon, TextField } from '@material-ui/core';
import { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import { mdiCalendarMonth } from '@mdi/js';
import React, { forwardRef } from 'react';

export interface DateTextFieldProps extends Omit<OutlinedTextFieldProps, 'value' | 'variant'> {
  value: string;
}

export const DateTextField = forwardRef<HTMLDivElement, DateTextFieldProps>((props, ref) => (
  <TextField
    {...props}
    ref={ref}
    inputProps={{ ...props.inputProps, readOnly: true }}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <SvgIcon color="action">
            <path d={mdiCalendarMonth} />
          </SvgIcon>
        </InputAdornment>
      ),
      ...props.InputProps,
    }}
  />
));

if (process.env.NODE_ENV !== 'production') {
  DateTextField.displayName = 'DateTextField';
}
