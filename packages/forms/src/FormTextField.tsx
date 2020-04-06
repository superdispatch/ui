import { TextField } from '@material-ui/core';
import { StandardTextFieldProps } from '@material-ui/core/TextField';
import { FieldValidator, useField, useFormikContext } from 'formik';
import React, { ChangeEvent, ReactNode } from 'react';

import { useUID } from './internal/useUID';

export interface FormTextFieldProps<T>
  extends Omit<StandardTextFieldProps, 'error'> {
  name: string;
  validate?: FieldValidator;
  formatError?: (error: string) => ReactNode;
  format?: (value: T) => string;
  parse?: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => T;
}

export function FormTextField<T>({
  name,
  parse,
  format,
  validate,
  formatError = error => error,

  id,
  onBlur,
  onChange,
  disabled,
  helperText,
  ...rest
}: FormTextFieldProps<T>) {
  const uid = useUID();
  const { isSubmitting } = useFormikContext();
  const [field, { error, touched }, { setValue }] = useField<T>({
    name,
    validate,
  });
  const errorMessage = touched && error && formatError(error);

  return (
    <TextField
      {...rest}
      {...field}
      id={id || uid}
      name={name}
      error={!!errorMessage}
      helperText={errorMessage || helperText}
      disabled={disabled ?? isSubmitting}
      value={format ? format(field.value) : field.value}
      onBlur={event => {
        onBlur?.(event);
        field.onBlur(event);
      }}
      onChange={event => {
        onChange?.(event);

        if (parse) {
          setValue(parse(event));
        } else {
          field.onChange(event);
        }
      }}
    />
  );
}
