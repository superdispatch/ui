import { Link, LinkProps } from '@material-ui/core';
import React, { forwardRef, ReactElement, RefAttributes, useMemo } from 'react';

import { PhoneNumber } from './PhoneNumber';

export interface PhoneLinkProps
  extends RefAttributes<HTMLAnchorElement>,
    Omit<LinkProps, 'ref' | 'href' | 'children'> {
  phone: string;
  fallback: null | ReactElement;
}

export const PhoneLink = forwardRef<HTMLAnchorElement, PhoneLinkProps>(
  ({ phone, fallback, ...props }, ref) => {
    const phoneNumber = useMemo(() => PhoneNumber.fromInternational(phone), [
      phone,
    ]);
    const [href, children] = useMemo(
      () =>
        !phoneNumber
          ? [undefined, undefined]
          : [
              PhoneNumber.toRFC3966(phoneNumber),
              PhoneNumber.toInternational(phoneNumber),
            ],
      [phoneNumber],
    );

    return !phoneNumber ? (
      fallback
    ) : (
      <Link {...props} ref={ref} href={href}>
        {children}
      </Link>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  PhoneLink.displayName = 'PhoneLink';
}
