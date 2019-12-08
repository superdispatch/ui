import { Link, LinkProps } from '@material-ui/core';
import React, { forwardRef, ReactElement, RefAttributes, useMemo } from 'react';

import { PhoneNumber } from './PhoneNumber';
import { usePhoneNumber } from './PhoneNumberText';

export interface PhoneNumberLinkProps
  extends RefAttributes<HTMLAnchorElement>,
    Omit<LinkProps, 'ref' | 'href' | 'children'> {
  phone: string;
  fallback: null | ReactElement;
}

export const PhoneNumberLink = forwardRef<
  HTMLAnchorElement,
  PhoneNumberLinkProps
>(({ phone, fallback, ...props }, ref) => {
  const phoneNumber = usePhoneNumber(phone);
  const linkProps = useMemo<Pick<LinkProps, 'href' | 'children'>>(
    () => ({
      href: PhoneNumber.toRFC3966(phoneNumber),
      children: PhoneNumber.toInternational(phoneNumber),
    }),
    [phoneNumber],
  );

  return !phoneNumber ? fallback : <Link {...props} {...linkProps} ref={ref} />;
});

if (process.env.NODE_ENV !== 'production') {
  PhoneNumberLink.displayName = 'PhoneNumberLink';
}
