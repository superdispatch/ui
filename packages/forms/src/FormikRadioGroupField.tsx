import { FieldValidator, useField, useFormikContext } from 'formik';
import React from 'react';

import { RadioGroupField, RadioGroupFieldProps } from './RadioGroupField';

export interface FormikRadioGroupFieldProps
  extends Omit<RadioGroupFieldProps, 'error' | 'value'> {
  name: string;
  validate?: FieldValidator;
}

export function FormikRadioGroupField({
  name,
  validate,

  onBlur,
  onChange,
  disabled,
  helperText,
  ...props
}: FormikRadioGroupFieldProps) {
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
