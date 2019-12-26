import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormControlLabelProps,
} from '@material-ui/core';
import React from 'react';

export interface CheckboxFieldProps
  extends Omit<FormControlLabelProps, 'value' | 'control'> {
  CheckboxProps?: CheckboxProps;
}

export function CheckboxField({
  CheckboxProps: checkboxProps,
  ...props
}: CheckboxFieldProps) {
  return (
    <FormControlLabel {...props} control={<Checkbox {...checkboxProps} />} />
  );
}
