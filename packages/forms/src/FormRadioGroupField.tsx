import { FieldValidator, useField, useFormikContext } from 'formik';
import React from 'react';

import { RadioGroupField, RadioGroupFieldProps } from './RadioGroupField';

export interface FormRadioGroupFieldProps
  extends Omit<RadioGroupFieldProps, 'error' | 'value'> {
  name: string;
  validate?: FieldValidator;
}

export function FormRadioGroupField({
  name,
  validate,

  onBlur,
  onChange,
  disabled,
  helperText,
  ...props
}: FormRadioGroupFieldProps) {
  const { isSubmitting } = useFormikContext();
  const [field, { error, touched }] = useField({
    name,
    validate,
  });
  const errorText = touched && error;

  return (
    <RadioGroupField
      {...props}
      {...field}
      onBlur={event => {
        onBlur?.(event);
        field.onBlur(event);
      }}
      onChange={(event, value) => {
        onChange?.(event, value);
        field.onChange(event);
      }}
      error={!!errorText}
      helperText={errorText || helperText}
      disabled={disabled || isSubmitting}
    />
  );
}
