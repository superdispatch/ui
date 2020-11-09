import { Link, LinkProps } from '@material-ui/core';
import { renderChildren } from '@superdispatch/ui';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  Suspense,
  useMemo,
} from 'react';

import { CountryISO } from '../country-code-metadata/CountryCodeMetadata';
import {
  PhoneNumberFormat,
  usePhoneService,
} from '../phone-service/PhoneService';

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
    const service = usePhoneService();
    const [text, href] = useMemo(() => {
      if (service.checkPossibility(phone) !== 'is-possible') {
        return [undefined, undefined];
      }

      return [
        service.format(phone, { country, format }),
        service.format(phone, { country, format: 'rfc3966' }),
      ];
    }, [phone, country, format, service]);

    return !href ? (
      renderChildren(fallback)
    ) : (
      <Link {...props} ref={ref} href={href}>
        {text}
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
