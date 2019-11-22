import { IconButton, InputAdornment, SvgIcon, TextField } from '@material-ui/core';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import { mdiCalendarMonth } from '@mdi/js';
import React, { forwardRef } from 'react';

export interface DateTextFieldProps extends Omit<OutlinedTextFieldProps, 'value' | 'variant'> {
  value: string;
  IconProps?: IconButtonProps;
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
            <IconButton size="small" {...IconProps}>
              <SvgIcon color="action">
                <path d={mdiCalendarMonth} />
              </SvgIcon>
            </IconButton>
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
