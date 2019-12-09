import { Link, LinkProps } from '@material-ui/core';
import React, { forwardRef, ReactNode, RefAttributes, useMemo } from 'react';

import { PhoneNumber } from './PhoneNumber';
import { usePhoneNumber } from './PhoneText';

export interface PhoneLinkProps
  extends RefAttributes<HTMLAnchorElement>,
    Omit<LinkProps, 'ref' | 'href' | 'children'> {
  phone: string;
  fallback: ReactNode;
}

export const PhoneLink = forwardRef<HTMLAnchorElement, PhoneLinkProps>(
  ({ phone, fallback, ...props }, ref) => {
    const phoneNumber = usePhoneNumber(phone);
    const linkProps = useMemo<Pick<LinkProps, 'href' | 'children'>>(
      () => ({
        href: PhoneNumber.toRFC3966(phoneNumber),
        children: PhoneNumber.toInternational(phoneNumber),
      }),
      [phoneNumber],
    );

    return !linkProps.children ? (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>{fallback}</>
    ) : (
      <Link {...props} {...linkProps} ref={ref} />
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  PhoneLink.displayName = 'PhoneLink';
}
