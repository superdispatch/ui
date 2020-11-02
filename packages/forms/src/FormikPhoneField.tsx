import { PhoneField, PhoneFieldProps } from '@superdispatch/phones';
import { useUID } from '@superdispatch/ui';
import { FieldValidator, useField, useFormikContext } from 'formik';
import React from 'react';

interface FormikPhoneFieldProps
  extends Omit<PhoneFieldProps, 'error' | 'value'> {
  name: string;
  validate?: FieldValidator;
}

export function FormikPhoneField({
  name,

  id,
  onBlur,
  onChange,
  disabled,
  helperText,

  validate,

  ...props
}: FormikPhoneFieldProps) {
  const uid = useUID(id);
  const { isSubmitting } = useFormikContext();
  const [field, { error, touched }, { setValue, setTouched }] = useField<
    null | undefined | string
  >({ name, validate });
  const errorText = touched && error;

  return (
    <PhoneField
      {...props}
      name={name}
      id={uid}
      value={field.value}
      error={!!errorText}
      disabled={disabled || isSubmitting}
      helperText={errorText || helperText}
      onBlur={(value) => {
        onBlur?.(value);
        setTouched(true);
      }}
      onChange={(value) => {
        onChange?.(value);

        setValue(value);
      }}
    />
  );
}
