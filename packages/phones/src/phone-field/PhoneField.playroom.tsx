import React, { forwardRef, useMemo, useState } from 'react';

import { PhoneNumber } from '../PhoneNumber';
import { PhoneField as SdPhoneField, PhoneFieldProps } from './PhoneField';

export const PhoneField = forwardRef<HTMLDivElement, PhoneFieldProps>(
  ({ value, onChange, error, helperText, ...props }, ref) => {
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
        ref={ref}
        value={value ?? state}
        error={error ?? !!errorMessage}
        helperText={helperText ?? errorMessage}
        onChange={(nextValue) => {
          setState(nextValue);
          onChange?.(nextValue);
        }}
      />
    );
  },
);
