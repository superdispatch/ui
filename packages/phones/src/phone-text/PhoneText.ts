import { renderChildren } from '@superdispatch/ui';
import { ReactNode, useMemo } from 'react';

import {
  formatPhoneNumber,
  PhoneNumberFormat,
  validatePhoneNumber,
} from '../data/PhoneUtils';

export interface PhoneTextProps {
  phone: string;
  fallback?: ReactNode;
}

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

export function PhoneText({ phone, fallback }: PhoneTextProps) {
  const children = useFormattedPhoneNumber(phone, 'international');

  return renderChildren(children || fallback);
}
