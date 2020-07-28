import React, { useMemo, useState } from 'react';

import { PhoneNumber } from '../PhoneNumber';
import { PhoneField as SdPhoneField, PhoneFieldProps } from './PhoneField';

export function PhoneField({
  value,
  onChange,
  error,
  helperText,
  ...props
}: PhoneFieldProps) {
  const [state, setState] = useState<PhoneNumber>();
  const errorMessage = useMemo(() => {
    if (value == null) {
      return undefined;
    }

    switch (PhoneNumber.validate(value)) {
      case 'invalid-country-code':
        return 'Invalid country code';
      case 'too-long':
        return 'Phone number is too long';
      case 'too-short':
        return 'Phone number is too short';
      case 'unknown':
        return 'Unknown phone number format';

      case 'is-possible':
      default:
        return undefined;
    }
  }, [value]);

  return (
    <SdPhoneField
      {...props}
      value={value ?? state}
      error={error ?? !!errorMessage}
      helperText={helperText ?? errorMessage}
      onChange={(nextValue) => {
        setState(nextValue);
        onChange?.(nextValue);
      }}
    />
  );
}
