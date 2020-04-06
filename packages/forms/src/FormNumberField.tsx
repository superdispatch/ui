import { FieldValidator, useField, useFormikContext } from 'formik';
import React, { ReactNode } from 'react';

import { useUID } from './internal/useUID';
import { NumberField, NumberFieldProps } from './NumberField';

interface FormNumberFieldProps extends NumberFieldProps {
  name: string;
  validate?: FieldValidator;
  formatError?: (error: string) => ReactNode;
}

export function FormNumberField({
  id,
  name,
  validate,
  formatError,
  disabled,
  helperText,
  onBlur,
  onChange,
  ...props
}: FormNumberFieldProps) {
  const uid = useUID();
  const { isSubmitting } = useFormikContext();
  const [field, { error, touched }, { setValue, setTouched }] = useField({
    name,
    validate,
  });
  const errorMessage = touched && error && formatError?.(error);

  return (
    <NumberField
      {...field}
      {...props}
      id={id || uid}
      disabled={disabled || isSubmitting}
      error={!!error}
      helperText={helperText || errorMessage}
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
