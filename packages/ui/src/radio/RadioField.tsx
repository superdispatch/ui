import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
  Radio,
  RadioProps,
} from '@material-ui/core';
import React, { forwardRef, ForwardRefExoticComponent, ReactNode } from 'react';

export interface RadioFieldProps
  extends Omit<RadioProps, 'onBlur' | 'onChange'>,
    Pick<FormControlLabelProps, 'label' | 'onBlur' | 'onChange'> {
  error?: boolean;
  helperText?: ReactNode;
  FormControlLabelProps?: Omit<
    FormControlLabelProps,
    | 'label'
    | 'error'
    | 'checked'
    | 'onBlur'
    | 'onChange'
    | 'helperText'
    | 'control'
  >;
}

export const RadioField: ForwardRefExoticComponent<RadioFieldProps> = forwardRef(
  (
    {
      label,
      error,
      checked,
      onBlur,
      onChange,
      helperText,
      FormControlLabelProps: formControlLabelProps,
      ...props
    },
    ref,
  ) => (
    <FormControl error={error}>
      <FormControlLabel
        {...formControlLabelProps}
        label={label}
        checked={checked}
        onBlur={onBlur}
        onChange={onChange}
        control={<Radio ref={ref} color="primary" {...props} />}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  ),
);
