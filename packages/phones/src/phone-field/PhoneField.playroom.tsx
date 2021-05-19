import { forwardRef, useMemo, useState } from 'react';
import { usePhoneService } from '../phone-service/PhoneService';
import { PhoneField as SdPhoneField, PhoneFieldProps } from './PhoneField';

export const PhoneField = forwardRef<HTMLDivElement, PhoneFieldProps>(
  ({ value, onChange, error, helperText, ...props }, ref) => {
    const [state, setState] = useState('');
    const phoneService = usePhoneService();
    const errorMessage = useMemo(
      () => phoneService.validate(value),
      [value, phoneService],
    );

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
