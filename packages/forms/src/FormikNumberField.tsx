import { FieldValidator, useField, useFormikContext } from 'formik';
import React, { ReactNode } from 'react';

import { useUID } from './internal/useUID';
import { NumberField, NumberFieldProps } from './NumberField';

interface FormikNumberFieldProps extends NumberFieldProps {
  name: string;
  validate?: FieldValidator;
  formatError?: (error: string) => ReactNode;
}

export function FormikNumberField({
  id,
  name,
  validate,
  formatError,
  disabled,
  helperText,
  onBlur,
  onChange,
  ...props
}: FormikNumberFieldProps) {
  const uid = useUID();
  const { isSubmitting } = useFormikContext();
  const [field, { error, touched }, { setValue, setTouched }] = useField({
    name,
    validate,
  });
  const errorText = touched && error && formatError?.(error);

  return (
    <NumberField
      {...field}
      {...props}
      id={id || uid}
      disabled={disabled || isSubmitting}
      error={!!errorText}
      helperText={errorText || helperText}
      onBlur={(event) => {
        onBlur?.(event);
        setTouched(true);
      }}
      onChange={(event) => {
        onChange?.(event);
        setValue(event.target.value);
      }}
    />
  );
}
