import { renderChildren } from '@superdispatch/ui';
import { ReactElement, ReactNode, Suspense } from 'react';

import { CountryISO } from '../country-code-metadata/CountryCodeMetadata';
import { useFormattedPhoneNumber } from '../formatted-phone-number/FormattedPhoneNumber';
import { PhoneNumberFormat } from '../phone-service/PhoneService';

export interface PhoneTextProps {
  phone: unknown;
  fallback?: ReactNode;
  country?: CountryISO;
  format?: PhoneNumberFormat;
}

export function PhoneText({
  phone,
  country,
  fallback,
  format = 'international',
}: PhoneTextProps): null | ReactElement {
  const children = useFormattedPhoneNumber(phone, { format, country });

  return renderChildren(children || fallback);
}

export interface SuspendedPhoneTextProps extends PhoneTextProps {
  suspenseFallback?: ReactNode;
}

export function SuspendedPhoneText({
  suspenseFallback = null,
  ...props
}: SuspendedPhoneTextProps): ReactElement {
  return (
    <Suspense fallback={suspenseFallback}>
      <PhoneText {...props} />
    </Suspense>
  );
}
