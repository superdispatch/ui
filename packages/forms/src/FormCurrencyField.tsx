import { InputAdornment } from '@material-ui/core';
import { FieldValidator, useField, useFormikContext } from 'formik';
import React from 'react';

import { NumberField, NumberFieldProps } from './NumberField';

export interface FormCurrencyFieldProps
  extends Omit<NumberFieldProps, 'error'> {
  name: string;
  validate?: FieldValidator;
}

export function FormCurrencyField({
  name,
  validate,

  onBlur,
  onChange,
  disabled,
  helperText,
  InputProps: {
    startAdornment = <InputAdornment position="start">$</InputAdornment>,
    ...InputProps
  } = {},
  ...rest
}: FormCurrencyFieldProps) {
  const { isSubmitting } = useFormikContext();
  const [field, { error, touched }] = useField({ name, validate });
  const errorText = touched && error;

  return (
    <NumberField
      {...rest}
      name={name}
      error={!!errorText}
      disabled={disabled || isSubmitting}
      helperText={errorText || helperText}
      InputProps={{ ...InputProps, startAdornment }}
      onBlur={(event) => {
        onBlur?.(event);
        field.onBlur(event);
      }}
      onChange={(event) => {
        onChange?.(event);
        field.onChange(event);
      }}
    />
  );
}
