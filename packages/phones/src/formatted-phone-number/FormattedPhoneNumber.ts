import { useMemo } from 'react';

import {
  PhoneFormatOptions,
  usePhoneService,
} from '../phone-service/PhoneService';

export function useFormattedPhoneNumber(
  input: unknown,
  { format, country, fallback }: PhoneFormatOptions = {},
): string {
  const phoneService = usePhoneService();

  return useMemo(
    () => phoneService.format(input, { format, country, fallback }),
    [phoneService, input, format, country, fallback],
  );
}
