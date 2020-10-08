import { DateField, DateFieldProps } from '@superdispatch/dates';
import { useUID } from '@superdispatch/ui';
import { FieldValidator, useField, useFormikContext } from 'formik';
import React from 'react';

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
  ...props
}: FormikDateFieldProps) {
  const uid = useUID(id);
  const { isSubmitting } = useFormikContext();
  const [field, { error, touched }, { setValue, setTouched }] = useField<
    undefined | Date
  >({ name, validate });
  const errorText = touched && error;

  return (
    <DateField
      {...props}
      {...field}
      id={uid}
      error={!!errorText}
      disabled={disabled || isSubmitting}
      helperText={errorText || helperText}
      onBlur={() => {
        onBlur?.();
        setTouched(true);
      }}
      onChange={(value) => {
        onChange?.(value);
        setValue(value);
      }}
    />
  );
}
