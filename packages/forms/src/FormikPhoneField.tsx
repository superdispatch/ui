import {
  PhoneField,
  PhoneFieldProps,
  PhoneNumber,
  PhoneNumberLike,
} from '@superdispatch/phones';
import { useField, useFormikContext } from 'formik';
import { FieldValidator } from 'formik/dist/types';
import React from 'react';

import { useUID } from './internal/useUID';

// TODO: Add `PhoneNumber.isPhoneNumberLike` helper.
function isPhoneNumberLike(value: unknown): value is PhoneNumberLike {
  return (
    typeof value === 'string' ||
    (typeof value === 'object' && value != null && 'region' in value)
  );
}

export interface ValidatePhoneRules {
  typeMessage?: string;
  required?: boolean;
  requiredMessage?: string;
  tooShortMessage?: string;
  tooLongMessage?: string;
  invalidMessage?: string;
}

export function validatePhone(
  value: unknown,
  {
    typeMessage = 'Invalid Type',
    required,
    requiredMessage = 'This field is required',
    invalidMessage = 'Invalid phone number',
    tooLongMessage = 'Phone number is too long',
    tooShortMessage = 'Phone number is too short',
  }: ValidatePhoneRules = {},
): string | undefined {
  if (value != null && !isPhoneNumberLike(value)) {
    return typeMessage;
  }

  const phone = !isPhoneNumberLike(value)
    ? undefined
    : typeof value === 'string'
    ? PhoneNumber.fromInternational(value)
    : value;

  if (!phone || !phone.nationalNumber) {
    if (required) {
      return requiredMessage;
    }

    return undefined;
  }

  switch (PhoneNumber.validate(phone)) {
    case 'is-possible':
      return undefined;
    case 'too-long':
      return tooLongMessage;
    case 'too-short':
      return tooShortMessage;
    default:
      return invalidMessage;
  }
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
  const uid = useUID();
  const { isSubmitting } = useFormikContext();
  const [field, { error, touched }, { setValue, setTouched }] = useField({
    name,
    validate,
  });
  const errorText = touched && error;

  return (
    <PhoneField
      {...props}
      name={name}
      id={id || uid}
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
