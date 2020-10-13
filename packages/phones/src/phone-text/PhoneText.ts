import { renderChildren } from '@superdispatch/ui';
import { ReactNode } from 'react';

import { useFormattedPhoneNumber } from '../formatted-phone-number/FormattedPhoneNumber';

export interface PhoneTextProps {
  phone: string;
  fallback?: ReactNode;
}

export function PhoneText({ phone, fallback }: PhoneTextProps) {
  const children = useFormattedPhoneNumber(phone, 'international');

  return renderChildren(children || fallback);
}
