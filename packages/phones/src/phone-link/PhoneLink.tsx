import { Link, LinkProps } from '@material-ui/core';
import { renderChildren } from '@superdispatch/ui';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  Suspense,
} from 'react';

import { CountryISO } from '../country-code-metadata/CountryCodeMetadata';
import { useFormattedPhoneNumber } from '../formatted-phone-number/FormattedPhoneNumber';
import { PhoneNumberFormat } from '../phone-service/PhoneService';

export interface PhoneLinkProps
  extends RefAttributes<HTMLAnchorElement>,
    Omit<LinkProps, 'ref' | 'href' | 'children'> {
  phone: unknown;
  country?: CountryISO;
  format?: PhoneNumberFormat;
  fallback?: ReactNode;
}

export const PhoneLink: ForwardRefExoticComponent<PhoneLinkProps> = forwardRef(
  ({ phone, country, fallback, format = 'international', ...props }, ref) => {
    const href = useFormattedPhoneNumber(phone, { country, format: 'rfc3966' });
    const children = useFormattedPhoneNumber(phone, { country, format });

    return !href ? (
      renderChildren(fallback)
    ) : (
      <Link {...props} ref={ref} href={href}>
        {children}
      </Link>
    );
  },
);

export interface SuspendedPhoneLinkProps extends PhoneLinkProps {
  suspenseFallback?: ReactNode;
}

export const SuspendedPhoneLink: ForwardRefExoticComponent<SuspendedPhoneLinkProps> = forwardRef(
  ({ suspenseFallback = null, ...props }, ref) => (
    <Suspense fallback={suspenseFallback}>
      <PhoneLink {...props} ref={ref} />
    </Suspense>
  ),
);
