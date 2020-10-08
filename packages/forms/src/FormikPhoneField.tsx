import {
  PhoneField,
  PhoneFieldProps,
  validatePhoneNumber,
} from '@superdispatch/phones';
import { useUID } from '@superdispatch/ui';
import { FieldValidator, useField, useFormikContext } from 'formik';
import React from 'react';

export interface ValidatePhoneRules {
  required?: boolean;
  requiredMessage?: string;
  tooShortMessage?: string;
  tooLongMessage?: string;
  invalidMessage?: string;
}

export function validatePhone(
  value: unknown,
  {
    required,
    requiredMessage = 'This field is required',
    invalidMessage = 'Invalid phone number',
    tooLongMessage = 'Phone number is too long',
    tooShortMessage = 'Phone number is too short',
  }: ValidatePhoneRules = {},
): string | undefined {
  const phoneNumber = typeof value === 'string' ? value : '';

  if (!phoneNumber) {
    if (required) {
      return requiredMessage;
    }

    return undefined;
  }

  switch (validatePhoneNumber(phoneNumber)) {
    case 'is-possible':
      return undefined;
    case 'too-long':
      return tooLongMessage;
    case 'too-short':
      return tooShortMessage;
  }

  return invalidMessage;
}

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
