import { renderChildren } from '@superdispatch/ui';
import { ReactNode, useMemo } from 'react';

import { formatPhoneNumber } from '../data/PhoneUtils';

export interface PhoneTextProps {
  phone: string;
  fallback?: ReactNode;
}

export function PhoneText({ phone, fallback }: PhoneTextProps) {
  const children = useMemo(() => formatPhoneNumber(phone, 'international'), [
    phone,
  ]);

  return renderChildren(children || fallback || phone);
}
