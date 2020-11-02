import { renderChildren } from '@superdispatch/ui';
import { ReactElement, ReactNode } from 'react';

import { CountryISO } from '../country-code-metadata/CountryCodeMetadata';
import { useFormattedPhoneNumber } from '../formatted-phone-number/FormattedPhoneNumber';
import { PhoneNumberFormat } from '../phone-service/PhoneService';

export interface PhoneTextProps {
  phone: string;
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
