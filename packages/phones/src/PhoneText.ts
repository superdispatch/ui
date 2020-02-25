import { ReactElement, ReactNode, useMemo } from 'react';

import { NullablePhoneNumberLike, PhoneNumber } from './data/PhoneNumber';

export function usePhoneNumber(
  phone: NullablePhoneNumberLike,
): undefined | PhoneNumber {
  return useMemo(() => {
    if (!PhoneNumber.isPhoneNumberLike(phone)) {
      return undefined;
    }

    if (typeof phone === 'string') {
      return PhoneNumber.fromInternational(phone);
    }

    return phone;
  }, [phone]);
}

export interface PhoneTextProps {
  phone: NullablePhoneNumberLike;
  fallback?: ReactNode;
}

export function PhoneText({
  phone,
  fallback,
}: PhoneTextProps): null | ReactElement {
  const phoneNumber = usePhoneNumber(phone);
  const children = useMemo(() => PhoneNumber.toInternational(phoneNumber), [
    phoneNumber,
  ]);

  return (children || fallback || phone || null) as ReactElement;
}
