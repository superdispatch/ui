import { Link, LinkProps } from '@material-ui/core';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ReactElement,
  ReactNode,
  RefAttributes,
  useMemo,
} from 'react';

import { PhoneNumber } from './data/PhoneNumber';
import { usePhoneNumber } from './PhoneText';

export interface PhoneLinkProps
  extends RefAttributes<HTMLAnchorElement>,
    Omit<LinkProps, 'ref' | 'href' | 'children'> {
  phone: string;
  fallback?: ReactNode;
}

export const PhoneLink: ForwardRefExoticComponent<PhoneLinkProps> = forwardRef<
  HTMLAnchorElement,
  PhoneLinkProps
>(({ phone, fallback = null, ...props }, ref) => {
  const phoneNumber = usePhoneNumber(phone);
  const linkProps = useMemo<Pick<LinkProps, 'href' | 'children'>>(
    () => ({
      href: PhoneNumber.toRFC3966(phoneNumber),
      children: PhoneNumber.toInternational(phoneNumber),
    }),
    [phoneNumber],
  );

  return !linkProps.children ? (
    (fallback as ReactElement)
  ) : (
    <Link {...props} {...linkProps} ref={ref} />
  );
});
