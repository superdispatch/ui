import { renderChildren } from '@superdispatch/ui';
import { ReactNode, useMemo } from 'react';

import { NullablePhoneNumberLike, PhoneNumber } from '../PhoneNumber';

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

export function PhoneText({ phone, fallback }: PhoneTextProps) {
  const phoneNumber = usePhoneNumber(phone);
  const children = useMemo(() => PhoneNumber.toInternational(phoneNumber), [
    phoneNumber,
  ]);

  return renderChildren(children || fallback || phone);
}
