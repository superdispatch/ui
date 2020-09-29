import { Link, LinkProps } from '@material-ui/core';
import { renderChildren } from '@superdispatch/ui';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from 'react';

import { useFormattedPhoneNumber } from '..';

export interface PhoneLinkProps
  extends RefAttributes<HTMLAnchorElement>,
    Omit<LinkProps, 'ref' | 'href' | 'children'> {
  phone: string;
  fallback?: ReactNode;
}

export const PhoneLink: ForwardRefExoticComponent<PhoneLinkProps> = forwardRef<
  HTMLAnchorElement,
  PhoneLinkProps
>(({ phone, fallback, ...props }, ref) => {
  const href = useFormattedPhoneNumber(phone, 'rfc3966');
  const children = useFormattedPhoneNumber(phone, 'international');

  return !href ? (
    renderChildren(fallback || phone)
  ) : (
    <Link {...props} ref={ref} href={href}>
      {children}
    </Link>
  );
});
