import {
  PhoneField,
  PhoneFieldProps,
  PhoneService,
  usePhoneService,
} from '@superdispatch/phones';
import { useUID } from '@superdispatch/ui';
import { FieldValidator, useField, useFormikContext } from 'formik';
import React from 'react';

interface FormikPhoneFieldProps
  extends Omit<PhoneFieldProps, 'error' | 'value'> {
  name: string;
  validate?: (
    value: unknown,
    service: PhoneService,
  ) => string | void | Promise<string | void>;
}

export function FormikPhoneField({
  name,

  id,
  onBlur,
  onChange,
  disabled,
  helperText,

  validate: validateProp,

  ...props
}: FormikPhoneFieldProps) {
  const uid = useUID(id);
  const phoneService = usePhoneService();
  const { isSubmitting } = useFormikContext();
  const validate: FieldValidator = (value) => {
    if (!validateProp) {
      return undefined;
    }

    return validateProp(value, phoneService);
  };
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
