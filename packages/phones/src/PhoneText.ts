import { ReactElement, ReactNode, useMemo } from 'react';

import { PhoneNumber } from './data/PhoneNumber';

export function usePhoneNumber(phone: string): undefined | PhoneNumber {
  return useMemo(() => PhoneNumber.fromInternational(phone), [phone]);
}

export interface PhoneTextProps {
  phone: string;
  fallback?: ReactNode;
}

export function PhoneText({
  phone,
  fallback = null,
}: PhoneTextProps): null | ReactElement {
  const phoneNumber = usePhoneNumber(phone);
  const children = useMemo(() => PhoneNumber.toInternational(phoneNumber), [
    phoneNumber,
  ]);

  return (children || fallback) as ReactElement;
}
