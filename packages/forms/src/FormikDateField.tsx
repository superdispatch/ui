import {DateField, DateFieldProps} from '@superdispatch/dates';
import {FieldValidator, useField, useFormikContext} from 'formik';
import React from 'react';

import {useUID} from './internal/useUID';

export interface FormikDateFieldProps extends Omit<DateFieldProps, 'error'> {
  name: string;
  validate?: FieldValidator;
}

export function FormikDateField({
  id,
  name,
  validate,

  onBlur,
  onChange,
  disabled,
  helperText,
  ...rest
}: FormikDateFieldProps) {
  const uid = useUID();
  const { isSubmitting } = useFormikContext();
  const [field, { error, touched }, { setValue, setTouched }] = useField<
    undefined | Date
  >({ name, validate });
  const errorText = touched && error;

  return (
    <DateField
      {...rest}
      {...field}
      id={id || uid}
      error={!!errorText}
      disabled={disabled || isSubmitting}
      helperText={errorText || helperText}
      onBlur={() => {
        onBlur?.();
        setTouched(true);
      }}
      onChange={value => {
        onChange?.(value);
        setValue(value);
      }}
    />
  );
}
