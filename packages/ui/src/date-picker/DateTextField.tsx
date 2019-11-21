import { InputAdornment, SvgIcon, TextField } from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import { mdiCalendarMonth } from '@mdi/js';
import React, { forwardRef } from 'react';

export interface DateTextFieldProps extends Omit<OutlinedTextFieldProps, 'value' | 'variant'> {
  value: string;
  IconProps?: SvgIconProps;
}

export const DateTextField = forwardRef<HTMLDivElement, DateTextFieldProps>(
  ({ IconProps = {}, ...props }, ref) => (
    <TextField
      {...props}
      ref={ref}
      inputProps={{ ...props.inputProps, readOnly: true }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SvgIcon color="action" {...IconProps}>
              <path d={mdiCalendarMonth} />
            </SvgIcon>
          </InputAdornment>
        ),
        ...props.InputProps,
      }}
    />
  ),
);

if (process.env.NODE_ENV !== 'production') {
  DateTextField.displayName = 'DateTextField';
}
