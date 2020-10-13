import { useMemo } from 'react';

import {
  formatPhoneNumber,
  PhoneNumberFormat,
  validatePhoneNumber,
} from '../data/PhoneUtils';

export function useFormattedPhoneNumber(
  phone: string,
  format?: PhoneNumberFormat,
): string {
  return useMemo(() => {
    if (validatePhoneNumber(phone) === 'unknown') {
      return '';
    }

    return formatPhoneNumber(phone, format);
  }, [phone, format]);
}
