import { useMemo } from 'react';
import {
  PhoneFormatOptions,
  usePhoneService,
} from '../phone-service/PhoneService';

export function useFormattedPhoneNumber(
  input: unknown,
  { format, country, fallback = '' }: PhoneFormatOptions = {},
): string {
  const phoneService = usePhoneService();

  return useMemo(() => {
    if (phoneService.checkPossibility(input) !== 'is-possible') {
      return fallback;
    }

    return phoneService.format(input, { format, country, fallback });
  }, [phoneService, input, format, country, fallback]);
}
