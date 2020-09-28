import { Link, LinkProps } from '@material-ui/core';
import { renderChildren } from '@superdispatch/ui';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  useMemo,
} from 'react';

import { formatPhoneNumber } from '../data/PhoneUtils';

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
  const linkProps = useMemo(
    () =>
      !phone
        ? null
        : ({
            href: formatPhoneNumber(phone, 'rfc3966'),
            children: formatPhoneNumber(phone, 'international'),
          } as Pick<LinkProps, 'href' | 'children'>),
    [phone],
  );

  return !linkProps ? (
    renderChildren(fallback || phone)
  ) : (
    <Link {...props} {...linkProps} ref={ref} />
  );
});
