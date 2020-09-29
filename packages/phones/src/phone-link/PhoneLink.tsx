import { Link, LinkProps } from '@material-ui/core';
import { renderChildren } from '@superdispatch/ui';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  useMemo,
} from 'react';

import { formatPhoneNumber, validatePhoneNumber } from '../data/PhoneUtils';

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
  const [href, children] = useMemo(() => {
    const possibility = validatePhoneNumber(phone);

    if (possibility === 'unknown') {
      return [];
    }

    return [
      formatPhoneNumber(phone, 'rfc3966'),
      formatPhoneNumber(phone, 'international'),
    ];
  }, [phone]);

  return !href ? (
    renderChildren(fallback || phone)
  ) : (
    <Link {...props} ref={ref} href={href}>
      {children}
    </Link>
  );
});
