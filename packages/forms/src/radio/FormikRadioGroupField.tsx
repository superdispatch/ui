import { RadioGroupField, RadioGroupFieldProps } from '@superdispatch/ui';
import { FieldValidator, useField, useFormikContext } from 'formik';
import React, { ReactElement } from 'react';

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
}: FormikRadioGroupFieldProps): ReactElement {
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
      onBlur={(event) => {
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
